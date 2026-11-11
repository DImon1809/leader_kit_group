import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import contactBanner from "../../assets/contact-banner.webp";
import { useReveal } from "../../hooks/useReveal";
import styles from "./style.module.scss";

const BENEFITS = [
  "Быстрый ответ",
  "Консультация специалиста",
  "Подбор под ваши задачи",
];

const EMPTY_FORM = { name: "", email: "", phone: "", comment: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_LENGTH = 11;

type FieldErrors = Partial<Record<"name" | "email" | "phone", string>>;
type Status = "idle" | "sending" | "success" | "error";

const normalizePhoneDigits = (rawValue: string) => {
  let digits = rawValue.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  return digits.slice(0, PHONE_DIGITS_LENGTH);
};

const formatPhoneDigits = (digits: string) => {
  if (!digits) return "";

  const area = digits.slice(1, 4);
  const first = digits.slice(4, 7);
  const second = digits.slice(7, 9);
  const third = digits.slice(9, 11);

  let result = "+7";
  if (area) result += ` (${area}`;
  if (digits.length >= 4) result += ")";
  if (first) result += ` ${first}`;
  if (second) result += `-${second}`;
  if (third) result += `-${third}`;

  return result;
};

const countDigits = (value: string) => value.replace(/\D/g, "").length;

const cursorPositionAfterDigits = (formatted: string, digitCount: number) => {
  if (digitCount <= 0) return 0;

  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    if (/\d/.test(formatted[i])) {
      seen += 1;
      if (seen === digitCount) return i + 1;
    }
  }
  return formatted.length;
};

const validate = (form: typeof EMPTY_FORM): FieldErrors => {
  const errors: FieldErrors = {};

  if (!form.name.trim()) {
    errors.name = "Введите имя";
  }

  if (!form.email.trim()) {
    errors.email = "Введите email";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Некорректный email";
  }

  if (!form.phone.trim()) {
    errors.phone = "Введите телефон";
  } else if (form.phone.replace(/\D/g, "").length !== PHONE_DIGITS_LENGTH) {
    errors.phone = "Введите номер полностью";
  }

  return errors;
};

export const ContactForm = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const pendingPhoneCursor = useRef<number | null>(null);

  useEffect(() => {
    if (pendingPhoneCursor.current !== null && phoneInputRef.current) {
      phoneInputRef.current.setSelectionRange(
        pendingPhoneCursor.current,
        pendingPhoneCursor.current
      );
      pendingPhoneCursor.current = null;
    }
  }, [form.phone]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = event.target;
    const cursor = selectionStart ?? value.length;
    const rawDigitsBeforeCursor = countDigits(value.slice(0, cursor));

    const normalized = normalizePhoneDigits(value);
    // Нормализация может подставить недостающий код страны "7" в начало —
    // сдвигаем позицию курсора на столько же цифр, чтобы не указывать на неё.
    const prependedDigits = Math.max(0, normalized.length - countDigits(value));
    const digitsBeforeCursor = rawDigitsBeforeCursor + prependedDigits;

    const formatted = formatPhoneDigits(normalized);
    pendingPhoneCursor.current = cursorPositionAfterDigits(
      formatted,
      digitsBeforeCursor
    );

    setForm((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handlePhoneKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") return;
    event.preventDefault();

    const input = event.currentTarget;
    const selectionStart = input.selectionStart ?? form.phone.length;
    const selectionEnd = input.selectionEnd ?? selectionStart;

    const digits = form.phone.replace(/\D/g, "");
    const digitsBeforeStart = Math.max(
      countDigits(form.phone.slice(0, selectionStart)),
      1
    );

    let newDigits: string;
    let newCursorDigitCount: number;

    if (selectionStart !== selectionEnd) {
      const digitsBeforeEnd = countDigits(form.phone.slice(0, selectionEnd));
      newDigits = digits.slice(0, digitsBeforeStart) + digits.slice(digitsBeforeEnd);
      newCursorDigitCount = digitsBeforeStart;
    } else if (digitsBeforeStart <= 1) {
      return;
    } else {
      newDigits =
        digits.slice(0, digitsBeforeStart - 1) + digits.slice(digitsBeforeStart);
      newCursorDigitCount = digitsBeforeStart - 1;
    }

    const formatted = formatPhoneDigits(newDigits);
    pendingPhoneCursor.current = cursorPositionAfterDigits(
      formatted,
      newCursorDigitCount
    );

    setForm((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacts"
      className={styles.contactForm}
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(15, 26, 51, 0.92) 0%, rgba(15, 26, 51, 0.75) 50%, rgba(15, 26, 51, 0.92) 100%), url(${contactBanner})`,
      }}
    >
      <div
        ref={ref}
        className={`container ${styles.contactForm__inner} ${
          visible ? styles["contactForm__inner--visible"] : ""
        }`}
      >
        <div className={styles.contactForm__info}>
          <h2 className={styles.contactForm__title}>
            Нужна помощь
            <br />в подборе оборудования?
          </h2>
          <p className={styles.contactForm__text}>
            Оставьте заявку, и наш специалист свяжется с вами, чтобы подобрать
            оптимальное решение для вашего объекта или производства.
          </p>

          <ul className={styles.contactForm__benefits}>
            {BENEFITS.map((benefit) => (
              <li key={benefit} className={styles.contactForm__benefit}>
                <Check size={14} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <form
          className={styles.contactForm__form}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.contactForm__row}>
            <div className={styles.contactForm__field}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                className={`${styles.contactForm__input} ${
                  errors.name ? styles["contactForm__input--error"] : ""
                }`}
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className={styles.contactForm__error}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.contactForm__field}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className={`${styles.contactForm__input} ${
                  errors.email ? styles["contactForm__input--error"] : ""
                }`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={styles.contactForm__error}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className={styles.contactForm__field}>
            <input
              ref={phoneInputRef}
              type="tel"
              name="phone"
              placeholder="+7 (999) 999-99-99"
              className={`${styles.contactForm__input} ${
                errors.phone ? styles["contactForm__input--error"] : ""
              }`}
              value={form.phone}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
            />
            {errors.phone && (
              <span className={styles.contactForm__error}>
                {errors.phone}
              </span>
            )}
          </div>

          <input
            type="text"
            name="comment"
            placeholder="Комментарий"
            className={styles.contactForm__input}
            value={form.comment}
            onChange={handleChange}
          />

          <button
            type="submit"
            className={styles.contactForm__submit}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Отправка…" : "Отправить заявку"}
          </button>

          {status === "success" && (
            <p className={styles.contactForm__status}>
              Заявка отправлена. Мы свяжемся с вами в ближайшее время.
            </p>
          )}
          {status === "error" && (
            <p
              className={`${styles.contactForm__status} ${styles["contactForm__status--error"]}`}
            >
              Не удалось отправить заявку. Попробуйте ещё раз или позвоните
              нам.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
