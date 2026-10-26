
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiArrowUpRight,
  FiArrowRight,
  FiHeart,
  FiShield,
  FiTruck,
  FiStar,
} from "react-icons/fi";

const exploreLinks = [
  { label: "Shop All", to: "/shop" },
  { label: "Bridal Collection", to: "/shop?category=bridal" },
  { label: "Necklaces", to: "/shop?category=necklaces" },
  { label: "Rings", to: "/shop?category=rings" },
];

const careLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "FAQs", to: "/faq" },
  { label: "Shipping & Returns", to: "/shipping-returns" },
  { label: "My Orders", to: "/orders" },
];

function FooterLink({ to, children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        className="group inline-flex items-center gap-2 text-[13px] text-white/65 transition-colors duration-300 hover:text-[#EAD39B]"
      >
        <span className="h-px w-0 bg-[#D9BD82] transition-all duration-300 group-hover:w-3" />
        {children}
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const rise = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#D9BD82]/30 bg-gradient-to-br from-[#09251E] via-[#123D31] to-[#071C17] text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-[#D9BD82]/10" />
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-[#D9BD82]/10" />
        <div className="absolute -bottom-40 -left-28 h-96 w-96 rounded-full bg-[#D9BD82]/[0.04] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9BD82]/70 to-transparent" />
      </div>

      {/* Trust highlights */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
        }}
        className="border-b border-white/10"
      >
        <div className="container-wide mx-auto grid gap-5 px-5 py-6 sm:grid-cols-3 sm:gap-4 lg:px-10">
          {[
            {
              icon: FiShield,
              title: "Thoughtfully Selected",
              text: "Pieces chosen with care",
            },
            {
              icon: FiTruck,
              title: "Careful Delivery",
              text: "A beautiful unboxing experience",
            },
            {
              icon: FiHeart,
              title: "Made to Treasure",
              text: "Jewellery for meaningful moments",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={rise}
                className="flex items-center gap-3 sm:justify-center"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D9BD82]/25 bg-[#D9BD82]/[0.08] text-[#EAD39B]">
                  <Icon size={19} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-wide text-[#FFF8E8]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/50">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Main footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.12,
            },
          },
        }}
        className="container-wide mx-auto grid gap-10 px-5 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.35fr_0.85fr_0.95fr_1.15fr] lg:gap-12 lg:px-10 lg:py-16"
      >
        {/* Brand */}
        <motion.div variants={rise}>
          <Link
            to="/"
            aria-label="NexaJewels home"
            className="group inline-flex items-center gap-3"
          >
            <motion.div
              whileHover={
                shouldReduceMotion ? undefined : { rotate: -6, scale: 1.04 }
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9BD82]/70 bg-gradient-to-br from-[#EAD8A7] to-[#B89552] text-[#12372F] shadow-lg shadow-black/10"
            >
              <span className="font-serif text-2xl font-bold">N</span>
            </motion.div>

            <span>
              <span className="block font-serif text-[27px] font-semibold leading-none tracking-[0.13em] text-[#FFFDF7] transition-colors group-hover:text-[#EAD39B]">
                NEXA
              </span>
              <span className="mt-1.5 block text-[9px] uppercase tracking-[0.36em] text-[#D9BD82]">
                Fine Jewellery
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-[13px] leading-7 text-white/60">
            Thoughtfully curated jewellery for meaningful moments,
            everyday elegance and celebrations worth remembering.
          </p>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-3">
            {[
              {
                label: "Instagram",
                href: "https://www.instagram.com/",
                icon: FiInstagram,
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/",
                icon: FiFacebook,
              },
              {
                label: "Email NexaJewels",
                href: "mailto:care@nexajewels.example",
                icon: FiMail,
              },
            ].map((social) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noreferrer"
                      : undefined
                  }
                  aria-label={social.label}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -4, scale: 1.05 }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.94 }
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors duration-300 hover:border-[#D9BD82]/50 hover:bg-[#D9BD82]/10 hover:text-[#EAD39B]"
                >
                  <Icon size={18} strokeWidth={1.7} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Explore */}
        <motion.div variants={rise}>
          <h3 className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#EAD39B]">
            <span className="h-px w-6 bg-[#D9BD82]" />
            Explore
          </h3>

          <div className="flex flex-col items-start gap-4">
            {exploreLinks.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </motion.div>

        {/* Customer care */}
        <motion.div variants={rise}>
          <h3 className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#EAD39B]">
            <span className="h-px w-6 bg-[#D9BD82]" />
            Customer Care
          </h3>

          <div className="flex flex-col items-start gap-4">
            {careLinks.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </motion.div>

        {/* Collection CTA */}
        <motion.div variants={rise}>
          <div className="rounded-2xl border border-[#D9BD82]/25 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 sm:p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9BD82]/25 bg-[#D9BD82]/10 text-[#EAD39B]">
              <FiStar size={19} />
            </div>

            <h3 className="font-serif text-xl text-[#FFF8E8]">
              The Nexa Edit
            </h3>

            <p className="mt-3 text-[12px] leading-6 text-white/60">
              Discover styling inspiration, new arrivals and jewellery
              care tips for every special moment.
            </p>

            <motion.div
              whileHover={shouldReduceMotion ? undefined : { x: 3 }}
              className="mt-5"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 border-b border-[#D9BD82]/70 pb-2 text-xs font-semibold tracking-wide text-[#EAD39B] transition-colors duration-300 hover:border-[#FFF0C9] hover:text-[#FFF0C9]"
              >
                Explore the collection
                <FiArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 bg-black/[0.12]">
        <div className="container-wide mx-auto flex flex-col gap-3 px-5 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-10">
          <p className="text-[11px] text-white/45">
            © {new Date().getFullYear()} NexaJewels. All rights reserved.
          </p>

          <p className="inline-flex items-center justify-center gap-1.5 text-[11px] text-white/45">
            Designed with
            <FiHeart size={12} className="fill-[#D9BD82] text-[#D9BD82]" />
            for everyday elegance.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-1 text-[11px] text-[#D9BD82] transition-colors hover:text-[#FFF0C9] sm:justify-end"
          >
            Discover Nexa <FiArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
