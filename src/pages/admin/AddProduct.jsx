
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiImage, FiSave } from "react-icons/fi";
import { toast } from "sonner";
import productsData from "../../data/products";

const initialForm = {
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  stock: "",
  material: "",
  description: "",
  image: "",
};

const fieldClass =
  "form-field w-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#A17C3C]";

export default function AddProduct() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const existingProduct = editId
    ? productsData.find((product) => String(product.id) === editId)
    : null;

  const [form, setForm] = useState(() => ({
    ...initialForm,
    ...(existingProduct
      ? {
          name: existingProduct.name || "",
          category: existingProduct.category || "",
          price: String(existingProduct.price ?? ""),
          originalPrice: String(existingProduct.originalPrice ?? ""),
          stock: String(existingProduct.stock ?? ""),
          material: existingProduct.material || "",
          description: existingProduct.description || "",
          image: existingProduct.image || "",
        }
      : {}),
  }));

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Product name is required.";
    if (!form.category) nextErrors.category = "Select a category.";

    if (form.price === "" || !Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
      nextErrors.price = "Enter a valid price greater than zero.";
    }

    if (form.stock === "" || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      nextErrors.stock = "Enter a valid stock quantity.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Add a product description.";
    }

    if (!form.image.trim()) {
      nextErrors.image = "Add an image URL.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    toast.info(
      existingProduct
        ? "Form validated. Connect the update product API to save changes."
        : "Form validated. Connect the create product API to save this product."
    );
  }

  const categories = [
    ...new Set(productsData.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#173F35]"
      >
        <FiArrowLeft /> Back to Products
      </Link>

      <div>
        <p className="eyebrow">Inventory Management</p>
        <h1 className="mt-2 font-serif text-4xl text-[#173F35]">
          {existingProduct ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          Add the jewellery details carefully before publishing it to your store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 border border-stone-200 bg-white p-5 sm:p-8"
      >
        <section>
          <h2 className="font-serif text-2xl text-[#173F35]">
            Basic Information
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Product Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. Gold Heritage Necklace"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Material
              </label>
              <input
                name="material"
                value={form.material}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. Gold plated, Sterling silver"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className={fieldClass}
                placeholder="Describe the design, material and product details..."
              />
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 pt-7">
          <h2 className="font-serif text-2xl text-[#173F35]">
            Pricing & Inventory
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Selling Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className={fieldClass}
                placeholder="2499"
              />
              {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Original Price (₹)
              </label>
              <input
                name="originalPrice"
                type="number"
                min="0"
                step="0.01"
                value={form.originalPrice}
                onChange={handleChange}
                className={fieldClass}
                placeholder="2999"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Stock Quantity *
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                className={fieldClass}
                placeholder="25"
              />
              {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 pt-7">
          <h2 className="font-serif text-2xl text-[#173F35]">
            Product Image
          </h2>
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Image URL *
            </label>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              className={fieldClass}
              placeholder="https://example.com/jewellery.jpg"
            />
            {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
          </div>

          {form.image && (
            <div className="mt-5 flex items-start gap-4 bg-[#FAF9F6] p-4">
              <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden bg-[#F3EDE2]">
                <img
                  src={form.image}
                  alt="Product preview"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <FiImage className="text-stone-400" />
              </div>
              <p className="break-all text-xs leading-6 text-stone-500">
                Preview of the provided image URL. Make sure the image is publicly accessible.
              </p>
            </div>
          )}
        </section>

        <div className="flex flex-wrap justify-end gap-3 border-t border-stone-200 pt-6">
          <Link
            to="/admin/products"
            className="border border-stone-300 px-5 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#173F35] px-6 py-3 text-sm font-semibold text-white hover:bg-[#245B4D]"
          >
            <FiSave /> Validate Product
          </button>
        </div>
      </form>
    </div>
  );
}
