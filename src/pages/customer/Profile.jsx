
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiPackage,
  FiHeart,
  FiSave,
  FiPhone,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import { toast } from "sonner";
import { selectCustomer, updateCustomer } from "../../features/auth/authSlice";

const CUSTOMER_STORAGE_KEY = "nj_customer";

function getSavedCustomer(customer) {
  try {
    const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : customer;
  } catch {
    return customer;
  }
}

export default function Profile() {
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);

  const [form, setForm] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const savedCustomer = getSavedCustomer(customer);

    setForm({
      name: savedCustomer?.name || "",
      email: savedCustomer?.email || "",
      phone: savedCustomer?.phone || "",
    });
  }, [customer?.name, customer?.email, customer?.phone]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name || !email) {
      toast.error("Please enter your name and email address.");
      return;
    }

    setSaving(true);

    try {
      const updatedCustomer = {
        ...customer,
        ...getSavedCustomer(customer),
        name,
        email,
        phone,
      };

      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify(updatedCustomer)
      );

      dispatch(updateCustomer(updatedCustomer));
      setForm({ name, email, phone });

      toast.success("Your profile has been saved.");

      // Keep the button feedback visible briefly without blocking the UI.
      requestAnimationFrame(() => setSaving(false));
    } catch {
      toast.error("Unable to save your profile. Please try again.");
      setSaving(false);
    }
  };

  return (
    <main className="nj-profile min-h-screen overflow-hidden bg-[#FFFEFA] text-[#173F35]">
      <style>{`
        @keyframes profileReveal {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes profileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes profileGlow {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .65; transform: scale(1.08); }
        }

        .profile-reveal {
          animation: profileReveal .7s ease-out both;
        }

        .profile-delay-1 { animation-delay: .12s; }
        .profile-delay-2 { animation-delay: .22s; }

        .profile-orb {
          animation: profileFloat 7s ease-in-out infinite;
        }

        .profile-glow {
          animation: profileGlow 6s ease-in-out infinite;
        }

        .profile-link {
          transition: background .25s ease, color .25s ease,
            transform .25s ease, border-color .25s ease;
        }

        .profile-link:hover {
          transform: translateX(4px);
        }

        .profile-input {
          transition: border-color .25s ease, box-shadow .25s ease,
            background .25s ease;
        }

        .profile-input:focus-within {
          border-color: #A17C3C;
          background: #fffefa;
          box-shadow: 0 0 0 3px rgba(161, 124, 60, .11);
        }

        .profile-save {
          transition: transform .25s ease, background .25s ease,
            box-shadow .25s ease;
        }

        .profile-save:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 9px 22px rgba(23, 63, 53, .18);
        }

        @media (prefers-reduced-motion: reduce) {
          .profile-reveal, .profile-orb, .profile-glow {
            animation: none !important;
          }

          .profile-link, .profile-input, .profile-save {
            transition: none !important;
          }
        }
      `}</style>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[390px] overflow-hidden">
        <div className="profile-glow absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#E8EFE7] blur-3xl" />
        <div className="profile-orb absolute -left-24 top-40 h-52 w-52 rounded-full bg-[#F2E8D5]/70 blur-3xl" />
      </div>

      <section className="container-wide relative mx-auto px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
        {/* Page heading */}
        <header className="profile-reveal mb-9 sm:mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-9 bg-[#A17C3C]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A17C3C] sm:text-xs">
              Your Personal Space
            </p>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#173F35] sm:text-5xl lg:text-6xl">
                My Account
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
                Everything personal, all in one place. Manage your details
                and make every shopping experience yours.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start border border-[#E5DCCB] bg-white/80 px-4 py-3 sm:self-auto">
              <FiShield className="text-[#A17C3C]" size={17} />
              <span className="text-xs tracking-wide text-stone-600">
                Your personal details
              </span>
            </div>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-8">
          {/* Sidebar */}
          <aside className="profile-reveal profile-delay-1 overflow-hidden border border-[#E8E1D5] bg-white shadow-[0_12px_40px_rgba(23,63,53,0.04)]">
            <div className="relative overflow-hidden bg-[#173F35] p-6 text-white sm:p-7">
              <div className="profile-glow absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#B18B4B]/70 bg-white/10 text-[#E7D5B1]">
                <FiUser size={28} />
              </div>

              <p className="relative mt-5 truncate font-serif text-2xl">
                {customer?.name || form.name || "Valued Customer"}
              </p>

              <p className="relative mt-2 truncate text-xs text-white/65">
                {customer?.email || form.email || "Your account"}
              </p>

              <div className="relative mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#E7D5B1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B18B4B]" />
                Customer Account
              </div>
            </div>

            <nav className="space-y-1 p-3 sm:p-4">
              <Link
                to="/profile"
                className="profile-link flex items-center gap-3 border border-[#E8E1D5] bg-[#F5F0E7] px-4 py-4 text-sm font-medium text-[#173F35]"
              >
                <FiUser size={18} />
                <span className="flex-1">Profile Details</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#A17C3C]" />
              </Link>

              <Link
                to="/orders"
                className="profile-link flex items-center gap-3 border border-transparent px-4 py-4 text-sm text-stone-600 hover:border-[#E8E1D5] hover:bg-[#FFFEFA] hover:text-[#173F35]"
              >
                <FiPackage size={18} />
                <span className="flex-1">My Orders</span>
                <FiArrowRight size={15} className="text-stone-400" />
              </Link>

              <Link
                to="/wishlist"
                className="profile-link flex items-center gap-3 border border-transparent px-4 py-4 text-sm text-stone-600 hover:border-[#E8E1D5] hover:bg-[#FFFEFA] hover:text-[#173F35]"
              >
                <FiHeart size={18} />
                <span className="flex-1">My Wishlist</span>
                <FiArrowRight size={15} className="text-stone-400" />
              </Link>
            </nav>

            <div className="mx-5 mb-5 border-t border-[#EEE8DE] pt-5 sm:mx-6">
              <p className="font-serif text-lg text-[#173F35]">
                Made personal.
              </p>
              <p className="mt-1 text-xs leading-6 text-stone-500">
                Your style, your preferences, your NexaCart experience.
              </p>
            </div>
          </aside>

          {/* Profile form */}
          <section className="profile-reveal profile-delay-2 min-w-0 border border-[#E8E1D5] bg-white p-5 shadow-[0_12px_40px_rgba(23,63,53,0.04)] sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-4 border-b border-[#EEE8DE] pb-6 sm:flex-row sm:items-start">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A17C3C]">
                  Account Settings
                </p>
                <h2 className="mt-3 font-serif text-2xl text-[#173F35] sm:text-3xl">
                  Personal Information
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Keep your contact details accurate and up to date.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E8E1D5] bg-[#FFFEFA] text-[#A17C3C]">
                <FiUser size={21} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 max-w-2xl space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2.5 block text-xs font-semibold tracking-wide text-[#173F35]"
                >
                  Full Name <span className="text-[#A17C3C]">*</span>
                </label>

                <div className="profile-input flex items-center gap-3 border border-[#E5DED2] bg-[#FFFEFA] px-4">
                  <FiUser className="shrink-0 text-[#A17C3C]" size={18} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent py-4 text-sm text-[#173F35] outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-xs font-semibold tracking-wide text-[#173F35]"
                >
                  Email Address <span className="text-[#A17C3C]">*</span>
                </label>

                <div className="profile-input flex items-center gap-3 border border-[#E5DED2] bg-[#FFFEFA] px-4">
                  <FiMail className="shrink-0 text-[#A17C3C]" size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-4 text-sm text-[#173F35] outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2.5 block text-xs font-semibold tracking-wide text-[#173F35]"
                >
                  Phone Number
                </label>

                <div className="profile-input flex items-center gap-3 border border-[#E5DED2] bg-[#FFFEFA] px-4">
                  <FiPhone className="shrink-0 text-[#A17C3C]" size={18} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full bg-transparent py-4 text-sm text-[#173F35] outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="border-t border-[#EEE8DE] pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="profile-save inline-flex w-full items-center justify-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <FiSave size={17} />
                  {saving ? "Saving Changes..." : "Save Changes"}
                  {!saving && <FiArrowRight size={16} />}
                </button>

                <p className="mt-4 text-xs leading-5 text-stone-400">
                  Your changes are saved in this browser on this device.
                </p>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}