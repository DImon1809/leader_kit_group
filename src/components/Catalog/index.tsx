import { ArrowRight } from "lucide-react";

import automationImg from "../../assets/catalog/automation.png";
import cabinetsImg from "../../assets/catalog/cabinets.png";
import consumablesImg from "../../assets/catalog/consumables.png";
import drivesImg from "../../assets/catalog/drives.png";
import fansImg from "../../assets/catalog/fans.png";
import filtersImg from "../../assets/catalog/filters.png";
import fittingsImg from "../../assets/catalog/fittings.png";
import motorsImg from "../../assets/catalog/motors.png";
import styles from "./style.module.scss";

type CatalogItem = {
  image: string;
  title: string;
  text: string;
};

const CATALOG_ITEMS: CatalogItem[] = [
  {
    image: filtersImg,
    title: "Воздушные фильтры",
    text: "ФЯР, ФЯах, ФКП, ФЯа, ФЯав, ФЯхФ, ГТУ и др.",
  },
  {
    image: fansImg,
    title: "Вентиляторы",
    text: "Осевые, радиальные, центробежные, крышные",
  },
  {
    image: motorsImg,
    title: "Электродвигатели",
    text: "Общепромышленные и специализированные",
  },
  {
    image: automationImg,
    title: "Автоматика",
    text: "Датчики, контроллеры, преобразователи частоты",
  },
  {
    image: drivesImg,
    title: "Приводы и приводы",
    text: "Электроприводы, заслонки, клапаны, регуляторы",
  },
  {
    image: cabinetsImg,
    title: "Шкафы управления",
    text: "Сборка, проектирование, поставка",
  },
  {
    image: fittingsImg,
    title: "Комплектующие",
    text: "Воздушные клапаны, гибкие вставки, шумоглушители",
  },
  {
    image: consumablesImg,
    title: "Расходные материалы",
    text: "Фильтрующие материалы, ремни, уплотнители и др.",
  },
];

export const Catalog = () => {
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

        <div className={styles.catalog__grid}>
          {CATALOG_ITEMS.map(({ image, title, text }) => (
            <a href="#contacts" key={title} className={styles.catalog__card}>
              <span className={styles.catalog__cardImage}>
                <img src={image} alt={title} />
              </span>
              <h3 className={styles.catalog__cardTitle}>{title}</h3>
              <p className={styles.catalog__cardText}>{text}</p>
              <span className={styles.catalog__cardArrow}>
                <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
