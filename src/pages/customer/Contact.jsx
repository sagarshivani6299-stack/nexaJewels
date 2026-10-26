
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  FiMail,
  FiMessageCircle,
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiShield,
  FiStar,
} from "react-icons/fi";
import { toast } from "sonner";
import { validateEmail } from "../../utils/validators";

const heroImage =
  "https://robinsonsjewelers.com/cdn/shop/articles/the-queen-of-gems-the-history-and-lore-of-the-emerald_20250928010601_20250928.jpg?v=1759095007&width=1024";

const initialForm = {
  name: "",
  email: "",
  subject: "Product enquiry",
  orderNumber: "",
  message: "",
};

const contactOptions = [
  {
    icon: FiMail,
    number: "01",
    title: "Email Assistance",
    detail: "For product and order enquiries",
    note: "Personalised customer support",
  },
  {
    icon: FiMessageCircle,
    number: "02",
    title: "Personal Styling",
    detail: "Find a piece that feels like you",
    note: "Thoughtful help for your selection",
  },
  {
    icon: FiClock,
    number: "03",
    title: "Customer Care",
    detail: "We're here to help with your questions",
    note: "Response schedule to be confirmed",
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut",
    },
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < 10) {
      toast.error("Please provide a little more detail in your message.");
      return;
    }

    setLoading(true);

    try {
      // UI demo only: connect an email service or backend to deliver messages.
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.info(
        "Your form is ready, but message delivery requires a backend or email service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#071712] text-[#F8F4EA]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 35, -15, 0],
                  y: [0, -25, 15, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-700/15 blur-[120px]"
        />
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 35, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-amber-500/10 blur-[130px]"
        />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:px-14 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <motion.div {...reveal(0)}>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#D8BD82]/30 bg-white/[0.035] px-4 py-2">
              <FiStar className="text-[#DCC28A]" size={15} />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#E5D1A4] sm:text-xs">
                The NexaJewels Experience
              </span>
            </div>

            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#BBA16A]">
              A little conversation goes a long way
            </p>

            <h1 className="max-w-2xl font-serif text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-[88px]">
              Every detail
              <br />
              deserves a
              <br />
              <span className="italic text-[#DCC28A]">
                personal touch.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-white/60 sm:text-base">
              A special gift, a piece you have been dreaming of, or a question
              about your order. Tell us what you have in mind. We would love
              to hear from you.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-3 bg-[#DCC28A] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#10251D] transition duration-300 hover:bg-[#F0DCA9]"
              >
                Start a Conversation
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-3 text-xs text-white/45">
                <FiShield className="text-[#DCC28A]" size={17} />
                Thoughtful, personal assistance
              </div>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-white/10 pt-6">
              {[
                ["01", "Your questions"],
                ["02", "Your preferences"],
                ["03", "Our assistance"],
              ].map(([number, label]) => (
                <div key={number}>
                  <p className="font-serif text-2xl text-[#DCC28A]">
                    {number}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-white/45 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Jewellery image */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.96, x: 18 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="absolute -inset-3 rounded-t-full border border-[#DCC28A]/25" />
            <div className="absolute -inset-6 rounded-t-full border border-white/[0.06]" />

            <div className="relative h-[410px] overflow-hidden rounded-t-full border border-[#DCC28A]/30 sm:h-[540px] lg:h-[620px]">
             <img
  src="https://images.unsplash.com/photo-1721206624552-d945fc1a3b8a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  alt="Elegant luxury jewellery for NexaJewels"
  className="h-full w-full object-cover object-center"
  fetchPriority="high"
  onError={(event) => {
    event.currentTarget.style.display = "none";
  }}
/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071712]/90 via-[#071712]/5 to-[#071712]/10" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <div className="mb-4 h-px w-14 bg-[#DCC28A]" />
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#E4CB92]">
                  Beyond the ordinary
                </p>
                <h2 className="mt-3 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">
                  Jewellery is personal.
                  <br />
                  <span className="italic text-[#DCC28A]">
                    So is our care.
                  </span>
                </h2>
              </div>
            </div>

            <motion.div
              animate={reduceMotion ? {} : { y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-3 max-w-[230px] border border-[#DCC28A]/25 bg-[#10251D]/95 p-4 shadow-2xl backdrop-blur-xl sm:-left-8 sm:p-5"
            >
              <FiStar className="mb-3 text-[#DCC28A]" size={18} />
              <p className="font-serif text-lg">Made for your moments</p>
              <p className="mt-1 text-xs leading-5 text-white/50">
                Every question matters. Every detail counts.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact options */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.025] px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-[1350px]">
          <motion.div {...reveal()} className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#DCC28A] sm:text-xs">
              We are listening
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl">
              How can we help you?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
              From choosing the right piece to questions about an existing
              order, let us know what you need.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactOptions.map(({ icon: Icon, number, title, detail, note }, index) => (
              <motion.div
                key={title}
                {...reveal(index * 0.12)}
                whileHover={reduceMotion ? {} : { y: -5 }}
                className="group border border-white/10 bg-[#0C2119]/80 p-6 transition-colors duration-300 hover:border-[#DCC28A]/40 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#DCC28A]/25 bg-[#DCC28A]/[0.07] text-[#DCC28A] transition-colors group-hover:bg-[#DCC28A]/15">
                    <Icon size={21} />
                  </div>
                  <span className="font-serif text-2xl text-white/15">
                    {number}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {detail}
                </p>
                <div className="mt-6 h-px w-full bg-white/10" />
                <p className="mt-4 text-xs leading-5 text-[#CBB783]/75">
                  {note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form and image */}
      <section
        id="contact-form"
        className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1350px] items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <motion.div {...reveal()} className="lg:sticky lg:top-28">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#DCC28A] sm:text-xs">
              Contact our team
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Let's make
              <br />
              something
              <br />
              <span className="italic text-[#DCC28A]">meaningful.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-8 text-white/55">
              Share your question or tell us about the piece you are looking
              for. Include a little detail so we can better understand your
              enquiry.
            </p>

            <div className="mt-8 border-l border-[#DCC28A]/50 pl-5">
              <p className="font-serif text-xl italic text-white/80">
                "The little details make all the difference."
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#DCC28A]/70">
                The NexaJewels philosophy
              </p>
            </div>

            <div className="mt-10 flex items-start gap-4 border-t border-white/10 pt-6">
              <FiMapPin className="mt-1 shrink-0 text-[#DCC28A]" size={19} />
              <div>
                <p className="text-sm font-medium">A note before you write</p>
                <p className="mt-2 text-xs leading-6 text-white/45">
                  Please do not include passwords, payment card details, or
                  other sensitive information in your message.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            {...reveal(0.12)}
            onSubmit={handleSubmit}
            className="relative border border-[#DCC28A]/20 bg-[#0D2119]/90 p-5 shadow-[0_25px_100px_rgba(0,0,0,0.2)] sm:p-9 lg:p-11"
          >
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DCC28A]/70 to-transparent" />

            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#DCC28A]">
                  Your message
                </p>
                <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Send us a note.
                </h3>
                <p className="mt-3 text-xs leading-6 text-white/45">
                  Fields marked with * are required.
                </p>
              </div>
              <div className="hidden h-14 w-14 items-center justify-center border border-[#DCC28A]/25 text-[#DCC28A] sm:flex">
                <FiMail size={23} />
              </div>
            </div>

            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs tracking-wide text-white/75"
                >
                  Full Name <span className="text-[#DCC28A]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter your name"
                  className="w-full border border-white/10 bg-[#071712]/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#DCC28A]/70 focus:ring-1 focus:ring-[#DCC28A]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs tracking-wide text-white/75"
                >
                  Email Address <span className="text-[#DCC28A]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  className="w-full border border-white/10 bg-[#071712]/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#DCC28A]/70 focus:ring-1 focus:ring-[#DCC28A]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs tracking-wide text-white/75"
                >
                  Enquiry Type <span className="text-[#DCC28A]">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  className="w-full border border-white/10 bg-[#071712] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#DCC28A]/70"
                >
                  <option>Product enquiry</option>
                  <option>Order assistance</option>
                  <option>Shipping and returns</option>
                  <option>Gift recommendation</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="orderNumber"
                  className="mb-2 block text-xs tracking-wide text-white/75"
                >
                  Order Number{" "}
                  <span className="text-white/35">(Optional)</span>
                </label>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={updateField}
                  placeholder="e.g. NJ-10001"
                  className="w-full border border-white/10 bg-[#071712]/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#DCC28A]/70 focus:ring-1 focus:ring-[#DCC28A]/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs tracking-wide text-white/75"
                >
                  How Can We Help?{" "}
                  <span className="text-[#DCC28A]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={updateField}
                  placeholder="Tell us what you have in mind..."
                  className="w-full resize-y border border-white/10 bg-[#071712]/70 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#DCC28A]/70 focus:ring-1 focus:ring-[#DCC28A]/20"
                />
                <p className="mt-2 text-right text-[10px] text-white/35">
                  {form.message.length} characters
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-7 flex w-full items-center justify-center gap-3 bg-[#DCC28A] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#10251D] transition duration-300 hover:bg-[#F0DCA9] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
            >
              {loading ? "Preparing Message..." : "Send Your Message"}
              {!loading && (
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>

            <p className="mt-5 text-[10px] leading-5 text-white/35">
              Your message is not delivered yet. Connect a backend or email
              service to receive real enquiries.
            </p>
          </motion.form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-[#DCC28A]/20 px-5 py-16 text-center sm:py-20">
        <motion.div {...reveal()} className="mx-auto max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#DCC28A]">
            Explore the collection
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl">
            Your next favourite piece awaits.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/50">
            Discover thoughtful designs and find something that feels
            uniquely yours.
          </p>
          <Link
            to="/shop"
            className="group mt-8 inline-flex items-center gap-3 border border-[#DCC28A]/50 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#E6D3A4] transition hover:bg-[#DCC28A] hover:text-[#10251D]"
          >
            Explore Jewellery
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
