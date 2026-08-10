import { Check } from "lucide-react";

import contactBanner from "../../assets/contact-banner.png";
import { useReveal } from "../../hooks/useReveal";
import styles from "./style.module.scss";

const BENEFITS = [
  "Быстрый ответ",
  "Консультация специалиста",
  "Подбор под ваши задачи",
];

export const ContactForm = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

        <form className={styles.contactForm__form} onSubmit={handleSubmit}>
          <div className={styles.contactForm__row}>
            <input
              type="text"
              placeholder="Ваше имя"
              className={styles.contactForm__input}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              className={styles.contactForm__input}
              required
            />
          </div>

          <input
            type="tel"
            placeholder="Телефон"
            className={styles.contactForm__input}
            required
          />

          <input
            type="text"
            placeholder="Комментарий"
            className={styles.contactForm__input}
          />

          <button type="submit" className={styles.contactForm__submit}>
            Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
};
