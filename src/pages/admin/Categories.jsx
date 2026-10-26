import { useState } from "react";
import { FiLayers, FiArrowUpRight } from "react-icons/fi";
import { toast } from "sonner";
import { categories } from "../../data/products";

export default function Categories() {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((category) =>
    `${category.name} ${category.subtitle}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="admin-panel admin-data-page">
      <div className="admin-panel-heading">
        <div><h2>Collection categories</h2><p>Browse the current storefront categories.</p></div>
        <button className="admin-action-button" onClick={() => toast.info("Connect a category API to create new categories.")}>
          + Add category
        </button>
      </div>

      <div className="admin-table-filters">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories..." />
      </div>

      <div className="admin-category-grid">
        {filtered.map((category, index) => (
          <article className="admin-category-card" key={category.name}>
            <img src={category.image} alt={category.name} />
            <div>
              <span className="eyebrow">CATEGORY 0{index + 1}</span>
              <h3>{category.name}</h3>
              <p>{category.subtitle}</p>
              <button onClick={() => toast.info("Category editing requires the category API.")}>
                Review category <FiArrowUpRight />
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="admin-data-footnote">
        Categories are currently defined in src/data/products.js. Changes made
        here are not persisted until a backend category service is connected.
      </p>
    </section>
  );
}