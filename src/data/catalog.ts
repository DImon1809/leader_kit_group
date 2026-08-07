import automationImg from "../assets/catalog/automation.png";
import cabinetsImg from "../assets/catalog/cabinets.png";
import consumablesImg from "../assets/catalog/consumables.png";
import drivesImg from "../assets/catalog/drives.png";
import fansImg from "../assets/catalog/fans.png";
import filtersImg from "../assets/catalog/filters.png";
import fittingsImg from "../assets/catalog/fittings.png";
import motorsImg from "../assets/catalog/motors.png";

export type Product = {
  id: string;
  name: string;
  description: string;
};

export type CatalogCategory = {
  slug: string;
  image: string;
  title: string;
  text: string;
  description: string;
  products: Product[];
};

export const CATALOG_ITEMS: CatalogCategory[] = [
  {
    slug: "vozdushnye-filtry",
    image: filtersImg,
    title: "Воздушные фильтры",
    text: "ФЯР, ФЯах, ФКП, ФЯа, ФЯав, ФЯхФ, ГТУ и др.",
    description:
      "Ячейковые, карманные и компактные фильтры для систем вентиляции и кондиционирования, а также фильтры для газотурбинных установок. Подбираем по классу очистки и посадочным размерам.",
    products: [
      { id: "fyr", name: "ФЯР", description: "Фильтр ячейковый рамочный" },
      { id: "fyah", name: "ФЯах", description: "Фильтр ячейковый с активированным углём" },
      { id: "fkp", name: "ФКП", description: "Фильтр карманный панельный" },
      { id: "fya", name: "ФЯа", description: "Фильтр ячейковый ФЯа" },
      { id: "fyav", name: "ФЯав", description: "Фильтр ячейковый влагостойкий" },
      { id: "fyhf", name: "ФЯхФ", description: "Фильтр ячейковый хлопчатобумажный" },
      { id: "gtu", name: "ГТУ", description: "Фильтр для газотурбинных установок" },
      { id: "g4", name: "Карманный фильтр G4", description: "Класс очистки грубой фильтрации" },
      { id: "f7", name: "Карманный фильтр F7", description: "Класс тонкой очистки" },
      { id: "f9", name: "Компактный фильтр F9 (HEPA)", description: "Высокоэффективная очистка воздуха" },
    ],
  },
  {
    slug: "ventilyatory",
    image: fansImg,
    title: "Вентиляторы",
    text: "Осевые, радиальные, центробежные, крышные",
    description:
      "Вентиляционное оборудование для приточно-вытяжных систем промышленных объектов: осевые, радиальные, центробежные и крышные вентиляторы, а также вентиляторы дымоудаления.",
    products: [
      { id: "axial", name: "Осевой вентилятор", description: "Для общеобменной вентиляции" },
      { id: "radial", name: "Радиальный вентилятор", description: "Для систем с высоким давлением" },
      { id: "centrifugal", name: "Центробежный вентилятор", description: "Для протяжённых воздуховодов" },
      { id: "roof", name: "Крышный вентилятор", description: "Монтаж на кровлю здания" },
      { id: "smoke", name: "Вентилятор дымоудаления", description: "Для противопожарных систем" },
      { id: "duct", name: "Канальный вентилятор", description: "Встраивается в воздуховод" },
      { id: "vc-4-75", name: "Вентилятор ВЦ 4-75", description: "Радиальный, среднего давления" },
      { id: "vr-86-77", name: "Вентилятор ВР 86-77", description: "Радиальный, низкого давления" },
    ],
  },
  {
    slug: "elektrodvigateli",
    image: motorsImg,
    title: "Электродвигатели",
    text: "Общепромышленные и специализированные",
    description:
      "Асинхронные электродвигатели общепромышленного назначения и специализированные модификации: взрывозащищённые, крановые, для вентиляторов и конвейеров.",
    products: [
      { id: "air", name: "Электродвигатель АИР", description: "Общепромышленная серия" },
      { id: "4a", name: "Электродвигатель 4А", description: "Общепромышленный, унифицированный" },
      { id: "aim", name: "Электродвигатель АИМ", description: "Взрывозащищённое исполнение" },
      { id: "ais", name: "Электродвигатель АИС", description: "Для вентиляторных установок" },
      { id: "mtf", name: "Электродвигатель MTF", description: "Крановый, повышенной прочности" },
      { id: "conveyor", name: "Электродвигатель для конвейеров", description: "Специализированное исполнение" },
    ],
  },
  {
    slug: "avtomatika",
    image: automationImg,
    title: "Автоматика",
    text: "Датчики, контроллеры, преобразователи частоты",
    description:
      "Средства автоматизации инженерных систем: датчики температуры и давления, контроллеры управления вентиляцией, преобразователи частоты и щиты автоматики.",
    products: [
      { id: "temp-sensor", name: "Датчик температуры", description: "Для приточно-вытяжных установок" },
      { id: "pressure-sensor", name: "Датчик давления", description: "Контроль давления в системе" },
      { id: "diff-pressure-sensor", name: "Датчик перепада давления", description: "Контроль загрязнённости фильтров" },
      { id: "controller", name: "Контроллер вентиляции", description: "Управление приточно-вытяжной установкой" },
      { id: "frequency-converter", name: "Преобразователь частоты", description: "Плавное регулирование скорости" },
      { id: "automation-panel", name: "Щит автоматики приточной установки", description: "Готовое решение под объект" },
    ],
  },
  {
    slug: "privody-i-privody",
    image: drivesImg,
    title: "Приводы и приводы",
    text: "Электроприводы, заслонки, клапаны, регуляторы",
    description:
      "Электроприводы и запорно-регулирующая арматура для систем вентиляции: воздушные заслонки, клапаны и регуляторы расхода воздуха.",
    products: [
      { id: "electric-drive", name: "Электропривод заслонки", description: "Для воздушных клапанов" },
      { id: "damper", name: "Заслонка воздушная", description: "Регулировка воздушного потока" },
      { id: "check-valve", name: "Обратный клапан", description: "Предотвращает обратную тягу" },
      { id: "fire-damper", name: "Противопожарный клапан", description: "Для систем противодымной защиты" },
      { id: "flow-regulator", name: "Регулятор расхода воздуха", description: "Балансировка вентиляционной сети" },
    ],
  },
  {
    slug: "shkafy-upravleniya",
    image: cabinetsImg,
    title: "Шкафы управления",
    text: "Сборка, проектирование, поставка",
    description:
      "Проектирование и сборка шкафов управления и автоматики под конкретный объект: от щитов управления вентиляцией до систем диспетчеризации.",
    products: [
      { id: "ventilation-cabinet", name: "Шкаф управления вентиляцией", description: "Под приточно-вытяжную установку" },
      { id: "automation-cabinet", name: "Шкаф автоматики ПВУ", description: "Полный комплект автоматики" },
      { id: "power-panel", name: "Щит силовой", description: "Распределение и защита питания" },
      { id: "frequency-cabinet", name: "Шкаф частотного регулирования", description: "Со встроенным ПЧ" },
      { id: "dispatch-cabinet", name: "Шкаф диспетчеризации", description: "Удалённый мониторинг и управление" },
    ],
  },
  {
    slug: "komplektuyushchie",
    image: fittingsImg,
    title: "Комплектующие",
    text: "Воздушные клапаны, гибкие вставки, шумоглушители",
    description:
      "Комплектующие для монтажа систем вентиляции: воздушные клапаны, гибкие вставки, шумоглушители, дефлекторы и зонты.",
    products: [
      { id: "air-valve", name: "Воздушный клапан КВУ", description: "Утеплённый, с электроприводом" },
      { id: "flexible-insert", name: "Гибкая вставка", description: "Компенсация вибрации вентагрегата" },
      { id: "duct-silencer", name: "Шумоглушитель канальный", description: "Снижение уровня шума" },
      { id: "deflector", name: "Дефлектор", description: "Усиление тяги вытяжной шахты" },
      { id: "roof-cap", name: "Зонт вентиляционный", description: "Защита воздуховода от осадков" },
      { id: "check-valve-fitting", name: "Клапан обратный", description: "Для канальных систем" },
    ],
  },
  {
    slug: "rashodnye-materialy",
    image: consumablesImg,
    title: "Расходные материалы",
    text: "Фильтрующие материалы, ремни, уплотнители и др.",
    description:
      "Расходные материалы для обслуживания вентиляционного оборудования: фильтрующие материалы, приводные ремни, уплотнители и смазочные материалы.",
    products: [
      { id: "filter-media", name: "Фильтрующий материал рулонный", description: "Для самостоятельной замены фильтров" },
      { id: "belt", name: "Ремень приводной клиновой", description: "Для вентиляторных агрегатов" },
      { id: "seal", name: "Уплотнитель резиновый", description: "Герметизация воздуховодов" },
      { id: "bearing-grease", name: "Смазка для подшипников", description: "Для узлов вентиляторов" },
      { id: "flange-gasket", name: "Прокладка фланцевая", description: "Соединение секций воздуховода" },
    ],
  },
];

export const getCategoryBySlug = (slug: string | undefined) =>
  CATALOG_ITEMS.find((item) => item.slug === slug);
