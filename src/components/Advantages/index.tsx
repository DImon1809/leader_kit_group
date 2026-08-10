import { LayoutGrid, ShieldCheck, Truck, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useReveal } from "../../hooks/useReveal";
import styles from "./style.module.scss";

type Advantage = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const ADVANTAGES: Advantage[] = [
  {
    icon: LayoutGrid,
    title: "Широкий ассортимент",
    text: "Более 10 000 позиций и наименований в наличии и под заказ",
  },
  {
    icon: Zap,
    title: "Оперативность",
    text: "Быстрая обработка заявок в короткие сроки",
  },
  {
    icon: ShieldCheck,
    title: "Надёжность",
    text: "Работаем только с проверенными производителями",
  },
  {
    icon: Users,
    title: "Индивидуальный подход",
    text: "Подбор оборудования под задачи вашего предприятия",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    text: "Доставка в любой регион России и страны СНГ",
  },
];

export const Advantages = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="advantages" className={styles.advantages}>
      <div className="container">
        <h2 className={styles.advantages__title}>Наши преимущества</h2>

        <div
          ref={ref}
          className={`${styles.advantages__grid} ${
            visible ? styles["advantages__grid--visible"] : ""
          }`}
        >
          {ADVANTAGES.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className={styles.advantages__card}
              style={{ "--i": index } as React.CSSProperties}
            >
              <span className={styles.advantages__icon}>
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h3 className={styles.advantages__cardTitle}>{title}</h3>
              <p className={styles.advantages__cardText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
