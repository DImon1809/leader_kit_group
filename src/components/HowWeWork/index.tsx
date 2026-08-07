import styles from "./style.module.scss";

type Step = {
  number: string;
  title: string;
  text: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Получаем заявку",
    text: "Вы оставляете заявку на сайте или по телефону",
  },
  {
    number: "02",
    title: "Подбираем решение",
    text: "Подбираем оборудование под задачи вашего объекта",
  },
  {
    number: "03",
    title: "Согласование",
    text: "Согласовываем спецификацию, стоимость и сроки",
  },
  {
    number: "04",
    title: "Поставка",
    text: "Осуществляем поставку в согласованный срок",
  },
  {
    number: "05",
    title: "Поддержка",
    text: "Сопровождаем поставку на всех этапах",
  },
];

export const HowWeWork = () => {
  return (
    <section id="how-we-work" className={styles.howWeWork}>
      <div className="container">
        <h2 className={styles.howWeWork__title}>Как мы работаем</h2>

        <div className={styles.howWeWork__grid}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.howWeWork__step}>
              <span className={styles.howWeWork__number}>{step.number}</span>
              <h3 className={styles.howWeWork__stepTitle}>{step.title}</h3>
              <p className={styles.howWeWork__stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
