import { useEffect, useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import logoMark from "../../assets/logo-mark.png";
import styles from "./style.module.scss";

type NavItem = {
  text: string;
  id: string;
};

const NAV_ITEMS: NavItem[] = [
  { text: "О компании", id: "#top" },
  { text: "Каталог", id: "#catalog" },
  { text: "Наши преимущества", id: "#advantages" },
  { text: "Доставка", id: "#how-we-work" },
  { text: "Контакты", id: "#contacts" },
];

const LOGO_TITLE = "Лидер Комплект Групп";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let charCount = 0;
    const id = setInterval(() => {
      charCount += 1;
      setTypedTitle(LOGO_TITLE.slice(0, charCount));
      if (charCount >= LOGO_TITLE.length) {
        clearInterval(id);
        setIsTyping(false);
      }
    }, 45);

    return () => clearInterval(id);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate(id === "#top" ? "/" : `/${id}`);
      return;
    }

    if (id === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles["header--scrolled"] : ""
      }`}
    >
      <div className={`container ${styles.header__inner}`}>
        <a
          href="/"
          className={styles.header__logo}
          onClick={handleLogoClick}
        >
          <img
            src={logoMark}
            alt="Лидер Комплект Групп"
            className={styles.header__logoIcon}
          />
          <span className={styles.header__logoText}>
            <span className={styles.header__logoTitle}>
              {typedTitle}
              {isTyping && <span className={styles.header__logoCaret} />}
            </span>
            <span className={styles.header__logoSubtitle}>
              Промышленные решения
            </span>
          </span>
        </a>

        <nav
          className={`${styles.header__nav} ${
            isOpen ? styles["header__nav--open"] : ""
          }`}
        >
          <ul className={styles.header__navList}>
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.text}
                className={styles.header__navItem}
                style={{ "--i": index } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={styles.header__navLink}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.header__navFooter}>
            <a href="tel:+74951234567" className={styles.header__phone}>
              <Phone size={16} />
              +7 (495) 123-45-67
            </a>
            <a href="mailto:info@liderkg.ru" className={styles.header__email}>
              <Mail size={16} />
              info@liderkg.ru
            </a>
            <button
              type="button"
              className={styles.header__cta}
              onClick={() => handleNavClick("#contacts")}
            >
              Оставить заявку
            </button>
          </div>
        </nav>

        <div className={styles.header__contactsDesktop}>
          <a href="tel:+74951234567" className={styles.header__phoneDesktop}>
            <Phone size={16} />
            +7 (495) 123-45-67
          </a>
          <a href="mailto:info@liderkg.ru" className={styles.header__emailDesktop}>
            <Mail size={16} />
            info@liderkg.ru
          </a>
        </div>

        <button
          type="button"
          className={styles.header__ctaDesktop}
          onClick={() => handleNavClick("#contacts")}
        >
          Оставить заявку
        </button>

        <button
          type="button"
          className={styles.header__burger}
          aria-label="Меню"
          onClick={() => setIsOpen((state) => !state)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};
