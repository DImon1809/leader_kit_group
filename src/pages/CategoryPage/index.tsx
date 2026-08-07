import { useMemo, useState } from "react";
import { ArrowLeft, PackageSearch, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { CATALOG_ITEMS, getCategoryBySlug } from "../../data/catalog";
import styles from "./style.module.scss";

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className={styles.categoryPage__mark}>
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
};

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const matchCount = useMemo(() => {
    if (!category || !normalizedQuery) return 0;
    return category.products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
    ).length;
  }, [category, normalizedQuery]);

  if (!category) {
    return (
      <section className={styles.categoryPage}>
        <div className={`container ${styles.categoryPage__notFound}`}>
          <h1>Категория не найдена</h1>
          <Link to="/#catalog" className={styles.categoryPage__backLink}>
            <ArrowLeft size={16} />
            Вернуться в каталог
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.categoryPage}>
      <div className={styles.categoryPage__banner}>
        <div className={`container ${styles.categoryPage__bannerInner}`}>
          <Link to="/#catalog" className={styles.categoryPage__backLink}>
            <ArrowLeft size={16} />
            Все категории
          </Link>

          <div className={styles.categoryPage__bannerContent}>
            <div className={styles.categoryPage__bannerText}>
              <h1 className={styles.categoryPage__title}>{category.title}</h1>
              <p className={styles.categoryPage__tags}>{category.text}</p>
              <p className={styles.categoryPage__description}>
                {category.description}
              </p>
            </div>

            <div className={styles.categoryPage__bannerImage}>
              <img src={category.image} alt={category.title} />
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.categoryPage__body}`}>
        <div className={styles.categoryPage__toolbar}>
          <div className={styles.categoryPage__search}>
            <Search size={18} className={styles.categoryPage__searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Найти товар в категории…"
              className={styles.categoryPage__searchInput}
            />
          </div>
          {normalizedQuery && (
            <span className={styles.categoryPage__searchHint}>
              {matchCount > 0
                ? `Найдено: ${matchCount}`
                : "Ничего не найдено"}
            </span>
          )}
        </div>

        <ul className={styles.categoryPage__list}>
          {category.products.map((product) => {
            const isMatch =
              normalizedQuery.length > 0 &&
              (product.name.toLowerCase().includes(normalizedQuery) ||
                product.description.toLowerCase().includes(normalizedQuery));

            return (
              <li
                key={product.id}
                className={`${styles.categoryPage__item} ${
                  isMatch ? styles["categoryPage__item--match"] : ""
                } ${
                  normalizedQuery && !isMatch
                    ? styles["categoryPage__item--dimmed"]
                    : ""
                }`}
              >
                <span className={styles.categoryPage__itemIcon}>
                  <PackageSearch size={18} />
                </span>
                <div className={styles.categoryPage__itemText}>
                  <span className={styles.categoryPage__itemName}>
                    {highlightMatch(product.name, normalizedQuery)}
                  </span>
                  <span className={styles.categoryPage__itemDescription}>
                    {highlightMatch(product.description, normalizedQuery)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`container ${styles.categoryPage__otherCategories}`}>
        <h2 className={styles.categoryPage__otherTitle}>Другие категории</h2>
        <div className={styles.categoryPage__otherGrid}>
          {CATALOG_ITEMS.filter((item) => item.slug !== category.slug).map(
            (item) => (
              <Link
                to={`/catalog/${item.slug}`}
                key={item.slug}
                className={styles.categoryPage__otherCard}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};
