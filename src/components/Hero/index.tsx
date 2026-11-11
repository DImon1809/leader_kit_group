import { BadgeCheck, Package, SearchCheck, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import heroPhoto from "../../assets/hero-banner-photo-v2.webp";
import styles from "./style.module.scss";

type FeatureItem = {
  icon: LucideIcon;
  text: string;
};

const FEATURES: FeatureItem[] = [
  { icon: Package, text: "Более 10 000 позиций в наличии" },
  { icon: BadgeCheck, text: "Поставка по всей России и СНГ" },
  { icon: SearchCheck, text: "Подбор и поставка редких позиций" },
  { icon: Truck, text: "Оперативные сроки отгрузки" },
];

const scrollTo = (id: string) => {
  const element = document.querySelector(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__banner}>
        <img
          src={heroPhoto}
          alt="Вентиляционное оборудование на промышленном объекте"
          className={styles.hero__bannerImage}
        />

        <div className={`container ${styles.hero__overlay}`}>
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>
              Поставка оборудования и комплектующих для промышленных
              предприятий
            </h1>

            <p className={styles.hero__text}>
              Подберём, поставим и доставим оборудование для систем
              вентиляции, автоматизации и инженерных систем. Быстро. Надёжно.
              Под ваш объект.
            </p>

            <div className={styles.hero__actions}>
              <button
                type="button"
                className={styles.hero__buttonPrimary}
                onClick={() => scrollTo("#catalog")}
              >
                Подобрать оборудование
              </button>
              <a
                href="/catalog.pdf"
                download="Лидер-Комплект-Групп-Каталог.pdf"
                className={styles.hero__buttonSecondary}
              >
                Скачать каталог
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.hero__chips}`}>
        {FEATURES.map(({ icon: Icon, text }, index) => (
          <div
            key={text}
            className={styles.hero__chip}
            style={{ "--i": index } as React.CSSProperties}
          >
            <span className={styles.hero__chipIcon}>
              <Icon size={45} strokeWidth={1.6} />
            </span>
            <span className={styles.hero__chipText}>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
