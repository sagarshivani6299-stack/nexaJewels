
import { useEffect, useState } from "react";
import {
  FiSave,
  FiShield,
  FiUser,
  FiShoppingBag,
  FiRefreshCw,
} from "react-icons/fi";
import { toast } from "sonner";

const ADMIN_KEY = "nexajewels_admin";
const SETTINGS_KEY = "nexajewels_settings";

const inputClass =
  "mt-2 w-full border border-stone-200 bg-[#FFFEFA] px-4 py-3 text-sm text-[#173F35] outline-none transition focus:border-[#A17C3C] focus:ring-2 focus:ring-[#A17C3C]/10";

const defaultSettings = {
  name: "",
  email: "",
  storeName: "NexaJewels",
};

export default function AdminSettings() {
  const [form, setForm] = useState(defaultSettings);
  const [savedForm, setSavedForm] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const admin = JSON.parse(
        localStorage.getItem(ADMIN_KEY) || "{}"
      );
      const settings = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );

      const initialForm = {
        name: admin.name || "",
        email: admin.email || "",
        storeName: settings.storeName || "NexaJewels",
      };

      setForm(initialForm);
      setSavedForm(initialForm);
    } catch {
      toast.error("Unable to load saved settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const storeName = form.storeName.trim();

    if (!name || !email || !storeName) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const admin = JSON.parse(
        localStorage.getItem(ADMIN_KEY) || "{}"
      );

      const updatedAdmin = {
        ...admin,
        name,
        email,
      };

      const updatedForm = {
        name,
        email,
        storeName,
      };

      localStorage.setItem(
        ADMIN_KEY,
        JSON.stringify(updatedAdmin)
      );

      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ storeName })
      );

      setForm(updatedForm);
      setSavedForm(updatedForm);

      toast.success("Settings saved successfully.");
    } catch {
      toast.error("Unable to save settings.");
    }
  }

  function handleReset() {
    setForm(savedForm);
    toast.info("Unsaved changes have been reset.");
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-stone-500">
        Loading settings...
      </div>
    );
  }

  const hasChanges =
    form.name !== savedForm.name ||
    form.email !== savedForm.email ||
    form.storeName !== savedForm.storeName;

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#173F35] p-6 text-white sm:p-8">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-[#D9BD82]/30" />
        <div className="absolute -right-4 -top-8 h-32 w-32 rounded-full border border-[#D9BD82]/20" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9BD82]">
            Preferences & Security
          </p>

          <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
            Admin Settings
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            Manage your administrator profile and store identity
            from one place.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Administrator Profile */}
        <section className="border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-stone-100 p-5 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#173F35]/5 text-[#A17C3C]">
              <FiUser size={22} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#173F35] sm:text-2xl">
                Administrator Profile
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Update your name and contact email.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <label className="block text-sm font-medium text-stone-700">
              Display Name
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Administrator"
                autoComplete="name"
              />
            </label>

            <label className="block text-sm font-medium text-stone-700">
              Email Address
              <input
                required
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </label>
          </div>
        </section>

        {/* Store Information */}
        <section className="border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-stone-100 p-5 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#173F35]/5 text-[#A17C3C]">
              <FiShoppingBag size={22} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#173F35] sm:text-2xl">
                Store Information
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Customize your store's display name.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <label className="block text-sm font-medium text-stone-700">
              Store Name
              <input
                required
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                className={inputClass}
                placeholder="NexaJewels"
              />
            </label>

            <div className="mt-5 flex gap-3 border border-[#D9BD82]/30 bg-[#D9BD82]/10 p-4">
              <FiShield
                className="mt-0.5 shrink-0 text-[#A17C3C]"
                size={18}
              />
              <p className="text-xs leading-6 text-stone-600">
                These settings are saved in this browser only.
                They do not update the store for other users.
                Secure authentication and shared settings require
                a backend.
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            disabled={!hasChanges}
            className="inline-flex items-center justify-center gap-2 border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-600 transition hover:border-[#A17C3C] hover:text-[#173F35] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiRefreshCw />
            Reset Changes
          </button>

          <button
            type="submit"
            disabled={!hasChanges}
            className="inline-flex items-center justify-center gap-2 bg-[#173F35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#245B4D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSave size={17} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
