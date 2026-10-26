
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (
      email === "admin@nexacart.com" &&
      password === "admin123"
    ) {
      // Demo token only. This is NOT a real signed JWT.
      const demoToken = btoa(
        JSON.stringify({
          role: "admin",
          email,
          exp: Date.now() + 60 * 60 * 1000,
        })
      );

      localStorage.setItem(
        "nexajewels_admin_token",
        demoToken
      );

      localStorage.setItem(
        "nexajewels_admin",
        JSON.stringify({
          email,
          role: "admin",
        })
      );

      toast.success("Admin login successful!");
      navigate("/admin/dashboard", { replace: true });
    } else {
      toast.error("Invalid admin email or password.");
    }

    setLoading(false);
  }

  return (
    <main className="grid min-h-screen bg-[#FFFEFA] lg:grid-cols-2">
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#173F35] p-12 text-white lg:flex">
        <div>
          <Link to="/" className="font-serif text-3xl tracking-wide">
            NexaJewels
          </Link>

          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#D6B778]">
            Admin Studio
          </p>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D6B778]">
            Behind the Collection
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-tight">
            Every detail.
            <br />
            Beautifully managed.
          </h1>

          <p className="mt-6 max-w-md text-sm leading-8 text-white/70">
            Manage products, monitor orders and oversee your
            jewellery store from one workspace.
          </p>
        </div>

        <p className="text-xs text-white/45">
          NexaJewels Admin Studio
        </p>

        <div className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-5 top-1/3 h-56 w-56 rounded-full border border-[#D6B778]/30" />
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#173F35] lg:hidden"
          >
            <FiArrowLeft />
            Back to store
          </Link>

          <div className="mb-10 mt-8 lg:mt-0">
            <p className="eyebrow">Restricted Access</p>

            <h2 className="mt-3 font-serif text-4xl text-[#173F35]">
              Admin Sign In
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-500">
              Sign in with your demo administrator account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-stone-700">
              Email Address

              <div className="mt-2 flex items-center gap-3 border border-stone-200 px-4 focus-within:border-[#A17C3C]">
                <FiMail className="text-stone-400" />

                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@nexacart.com"
                  className="min-h-12 w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="block text-sm font-medium text-stone-700">
              Password

              <div className="mt-2 flex items-center gap-3 border border-stone-200 px-4 focus-within:border-[#A17C3C]">
                <FiLock className="text-stone-400" />

                <input
                  required
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="min-h-12 w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <button
              disabled={loading}
              type="submit"
              className="mt-3 w-full bg-[#173F35] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#245B4D] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In to Admin"}
            </button>
          </form>

          <div className="mt-6 border border-[#E7DFC9] bg-[#F8F4EA] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#173F35]">
              Demo Credentials
            </p>

            <p className="mt-2 text-sm text-stone-600">
              Email: admin@nexacart.com
            </p>

            <p className="mt-1 text-sm text-stone-600">
              Password: admin123
            </p>
          </div>

          <p className="mt-7 text-center text-xs leading-6 text-stone-400">
            Customer account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#173F35] underline"
            >
              Customer Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
