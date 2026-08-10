import { Mail, Phone } from "lucide-react";

import logoMark from "../../assets/logo-mark.png";
import { useReveal } from "../../hooks/useReveal";
import styles from "./style.module.scss";

export const Footer = () => {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <footer
      ref={ref}
      className={`${styles.footer} ${visible ? styles["footer--visible"] : ""}`}
    >
      <div className={`container ${styles.footer__inner}`}>
        <div className={styles.footer__logo}>
          <span className={styles.footer__logoIcon}>
            <img src={logoMark} alt="Лидер Комплект Групп" />
          </span>
          <div className={styles.footer__logoText}>
            <span className={styles.footer__logoTitle}>
              Лидер Комплект Групп
            </span>
            <span className={styles.footer__logoSubtitle}>
              Промышленные решения
            </span>
          </div>
        </div>

        <div className={styles.footer__divider} />

        <div className={styles.footer__legal}>
          <span className={styles.footer__copyright}>
            © 2026 Лидер Комплект Групп. Все права защищены.
          </span>
          <a href="#" className={styles.footer__policy}>
            Политика конфиденциальности
          </a>
        </div>

        <div className={styles.footer__contacts}>
          <a href="tel:+74951234567" className={styles.footer__contactLink}>
            <Phone size={14} />
            +7 (495) 123-45-67
          </a>
          <a
            href="mailto:info@liderkg.ru"
            className={styles.footer__contactLink}
          >
            <Mail size={14} />
            info@liderkg.ru
          </a>
        </div>
      </div>
    </footer>
  );
};
