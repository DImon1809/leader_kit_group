import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { CATALOG_ITEMS } from "../../data/catalog";
import { useReveal } from "../../hooks/useReveal";
import styles from "./style.module.scss";

export const Catalog = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="catalog" className={styles.catalog}>
      <div className="container">
        <div className={styles.catalog__header}>
          <h2 className={styles.catalog__title}>Каталог оборудования</h2>
          <a href="#contacts" className={styles.catalog__link}>
            Смотреть весь каталог
            <ArrowRight size={16} />
          </a>
        </div>

        <div
          ref={ref}
          className={`${styles.catalog__grid} ${
            visible ? styles["catalog__grid--visible"] : ""
          }`}
        >
          {CATALOG_ITEMS.map(({ slug, image, title, text }, index) => (
            <Link
              to={`/catalog/${slug}`}
              key={slug}
              className={styles.catalog__card}
              style={{ "--i": index } as React.CSSProperties}
            >
              <span className={styles.catalog__cardImage}>
                <img src={image} alt={title} />
              </span>
              <h3 className={styles.catalog__cardTitle}>{title}</h3>
              <p className={styles.catalog__cardText}>{text}</p>
              <span className={styles.catalog__cardArrow}>
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
