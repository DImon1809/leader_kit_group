import { ArrowRight } from "lucide-react";

import rarePartsBanner from "../../assets/rare-parts-banner.png";
import { useReveal } from "../../hooks/useReveal";
import styles from "./style.module.scss";

export const RareParts = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      className={styles.rareParts}
      style={{ backgroundImage: `url(${rarePartsBanner})` }}
    >
      <div className={`container ${styles.rareParts__inner}`}>
        <div
          ref={ref}
          className={`${styles.rareParts__content} ${
            visible ? styles["rareParts__content--visible"] : ""
          }`}
        >
          <h2 className={styles.rareParts__title}>
            Редкие и труднодоступные детали под заказ
          </h2>
          <p className={styles.rareParts__text}>
            Специализируемся на поиске и поставке дефицитных и нестандартных
            комплектующих. Найдём то, что нужно
            <br />
            именно вам.
          </p>
          <a href="#contacts" className={styles.rareParts__button}>
            Отправить запрос
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
