import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiHeart,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiMail,
  FiCheck,
} from "react-icons/fi";

const categories = [
  {
    name: "Necklaces",
    slug: "necklaces",
    description: "Everyday elegance",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Earrings",
    slug: "earrings",
    description: "Made to make you shine",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Rings",
    slug: "rings",
    description: "A symbol of forever",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    description: "The perfect finishing touch",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bridal Jewellery",
    slug: "bridal",
    description: "For your forever moment",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Gifts",
    slug: "gifts",
    description: "Love, beautifully wrapped",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  },
];

const products = [
  {
    id: 1,
    name: "Golden Grace Necklace",
    category: "Necklaces",
    price: 2499,
    oldPrice: 3299,
    label: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Classic Pearl Earrings",
    category: "Earrings",
    price: 1799,
    oldPrice: 2299,
    label: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Timeless Gold Ring",
    category: "Rings",
    price: 1999,
    oldPrice: 2699,
    label: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Everyday Charm Bracelet",
    category: "Bracelets",
    price: 1599,
    oldPrice: 1999,
    label: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
];

const benefits = [
  {
    icon: <FiTruck />,
    title: "Complimentary Shipping",
    description: "On qualifying orders",
  },
  {
    icon: <FiShield />,
    title: "Quality You Can Trust",
    description: "Carefully selected pieces",
  },
  {
    icon: <FiRefreshCw />,
    title: "Easy Assistance",
    description: "We're here to help",
  },
  {
    icon: <FiHeart />,
    title: "Made for Memories",
    description: "Jewellery worth keeping",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <motion.main
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen overflow-hidden bg-[#FFFEFA] text-[#173F35]"
    >
      {/* PREMIUM ANIMATED HERO */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative isolate overflow-hidden bg-[#102E27] text-white"
      >
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, 35, 0], y: [0, -25, 0], scale: [1, 1.12, 1] }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/15 blur-[100px]"
        />

        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion ? {} : { x: [0, -30, 0], y: [0, 25, 0] }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-amber-300/10 blur-[100px]"
        />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[740px] lg:grid-cols-[1fr_1fr] lg:gap-8 lg:px-12">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative z-10 order-2 max-w-xl lg:order-1"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#D9BD82]/40 bg-white/[0.04] px-4 py-2"
            >
              <motion.span
                animate={
                  shouldReduceMotion ? {} : { opacity: [1, 0.35, 1] }
                }
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-[#D9BD82]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E8D5A5] sm:text-xs">
                Jewellery that tells your story
              </span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-[80px]"
            >
              Elegance in
              <br />

              <motion.span
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        backgroundPosition: [
                          "0% 50%",
                          "100% 50%",
                          "0% 50%",
                        ],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block bg-gradient-to-r from-[#B99A5D] via-[#FFF0BE] to-[#D9BD82] bg-[length:200%_auto] bg-clip-text italic text-transparent"
              >
                every detail.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-6 max-w-lg text-sm leading-8 text-white/75 sm:text-base"
            >
              Discover thoughtfully designed jewellery that celebrates your
              individuality, your milestones, and every beautiful moment in
              between.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 rounded-sm bg-[#D9BD82] px-6 py-4 text-sm font-semibold text-[#173F35] shadow-[0_8px_35px_rgba(217,189,130,0.18)] transition hover:bg-[#F0DCA8] sm:px-7"
                >
                  Explore Collection
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 rounded-sm border border-[#D9BD82]/60 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white transition hover:border-[#D9BD82] hover:bg-white/10 sm:px-7"
                >
                  Our Story <FiArrowUpRight />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 sm:mt-12"
            >
              <div>
                <p className="font-serif text-xl text-[#D9BD82]">Timeless</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Designs
                </p>
              </div>

              <span className="h-9 w-px bg-white/15" />

              <div>
                <p className="font-serif text-xl text-[#D9BD82]">Everyday</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Luxury
                </p>
              </div>

              <span className="h-9 w-px bg-white/15" />

              <div>
                <p className="font-serif text-xl text-[#D9BD82]">For You</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Always
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image and floating jewellery cards continue in Part 2 */}
                    <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="relative order-1 mx-auto w-full max-w-[490px] lg:order-2 lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-t-[48%] border border-[#D9BD82]/30 sm:-inset-5" />

            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto aspect-[4/5] w-[85%] overflow-hidden rounded-t-[48%] bg-[#24453A] shadow-2xl shadow-black/30"
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90"
                alt="Elegant gold necklace jewellery"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102E27]/65 via-transparent to-[#102E27]/10" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8D5A5]">
                  The signature edit
                </p>
                <p className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                  Golden elegance
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -12, 0], rotate: [0, 1.5, 0] }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-1 bottom-[14%] w-[32%] overflow-hidden rounded-sm border border-[#D9BD82]/50 bg-[#173F35] p-1.5 shadow-2xl sm:-left-2 sm:p-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E9E0D1]">
                <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=500&q=85"
                  alt="Gold jewellery detail"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <p className="px-1 pb-1 pt-2 text-center font-serif text-xs text-[#E8D5A5] sm:text-sm">
                Made to shine
              </p>
            </motion.div>

            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -12, 0], rotate: [0, 8, 0] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 top-[12%] flex h-12 w-12 items-center justify-center rounded-full border border-[#D9BD82]/50 bg-[#173F35]/90 text-[#D9BD82] shadow-xl sm:-right-2 sm:h-16 sm:w-16"
            >
              <FiStar className="text-xl sm:text-2xl" />
            </motion.div>

            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }
              }
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute right-[9%] top-[38%] text-3xl text-[#F0DCA8]"
            >
              ✦
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute right-0 top-[62%] max-w-[145px] border border-[#D9BD82]/30 bg-[#102E27]/90 p-3 shadow-xl backdrop-blur-md sm:right-1 sm:max-w-[165px] sm:p-4"
            >
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#D9BD82]">
                Your moment
              </p>
              <p className="mt-1 font-serif text-sm text-white sm:text-base">
                Your jewellery. Your story.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, delay: 0.4 }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D9BD82]/80 to-transparent"
        />
      </motion.section>

      {/* BENEFITS */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border-b border-[#E9E0D1] bg-[#F7F3EB]"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-9 sm:px-8 lg:grid-cols-4 lg:px-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D9BD82] text-xl text-[#A17C3C]">
                {benefit.icon}
              </span>
              <div>
                <h3 className="text-sm font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-xs text-[#6F746B]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CATEGORIES */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#A17C3C]">
                Find your favourite
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl">
                Shop by <span className="italic">category</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#77786F]">
                Pieces for every mood, every occasion, and every version of you.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-b border-[#A17C3C] pb-2 text-sm font-medium hover:text-[#A17C3C]"
            >
              View all collections <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {categories.map((category) => (
              <Link
                to={`/shop?category=${category.slug}`}
                key={category.slug}
                className="group block min-w-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0E8DA]">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                    <p className="font-serif text-lg leading-tight sm:text-xl">
                      {category.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/80 sm:text-xs">
                      {category.description}
                    </p>
                  </div>
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFEFA]/90 text-[#173F35] transition group-hover:bg-[#D9BD82]">
                    <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
            {/* FEATURED PRODUCTS */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#F7F3EB] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#A17C3C]">
                Carefully chosen for you
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl">
                Pieces you'll <span className="italic">love</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#77786F]">
                Discover our favourite designs, created to bring a little more
                beauty to your everyday moments.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-b border-[#A17C3C] pb-2 text-sm font-medium transition hover:text-[#A17C3C]"
            >
              Shop all products <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 25 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                }}
                whileHover={
                  shouldReduceMotion ? {} : { y: -6 }
                }
                className="group relative bg-[#FFFEFA]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EEE7DA]">
                  <Link
                    to={`/product/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="absolute inset-0 z-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </Link>

                  <span className="absolute left-3 top-3 z-10 bg-[#173F35] px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-white sm:left-4 sm:top-4">
                    {product.label}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      wishlist.includes(product.id)
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={wishlist.includes(product.id)}
                    className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition sm:right-4 sm:top-4 ${
                      wishlist.includes(product.id)
                        ? "bg-red-50 text-red-500"
                        : "bg-[#FFFEFA]/95 text-[#173F35] hover:bg-[#D9BD82]"
                    }`}
                  >
                    <FiHeart
                      className="text-lg"
                      fill={
                        wishlist.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="absolute inset-x-3 bottom-3 z-10 flex translate-y-2 items-center justify-center gap-2 bg-[#173F35] px-4 py-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 hover:bg-[#245848] group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100"
                  >
                    View Product <FiArrowUpRight />
                  </Link>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#A17C3C]">
                    {product.category}
                  </p>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="mt-2 font-serif text-xl transition hover:text-[#A17C3C]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold">
                      {formatPrice(product.price)}
                    </span>

                    <span className="text-sm text-[#929087] line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs text-[#A17C3C]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar key={star} fill="currentColor" />
                    ))}
                    <span className="ml-1 text-[#77786F]">
                      Loved by our customers
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 border border-[#173F35] px-8 py-4 text-sm font-semibold transition hover:bg-[#173F35] hover:text-white"
            >
              Explore the full collection <FiArrowRight />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* BRAND STORY */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="overflow-hidden bg-[#FFFEFA] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, x: -25 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute -left-3 -top-3 h-full w-full border border-[#D9BD82] sm:-left-5 sm:-top-5" />

            <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E0D1]">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
                alt="Beautiful jewellery arranged for a special occasion"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#102E27]/35 to-transparent" />
            </div>

            <motion.div
              animate={
                shouldReduceMotion ? {} : { y: [0, -8, 0] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 right-3 max-w-[230px] border border-[#D9BD82]/60 bg-[#173F35] p-5 text-white shadow-xl sm:-right-5 sm:p-6"
            >
              <p className="font-serif text-2xl italic text-[#E8D5A5]">
                Made with meaning.
              </p>
              <p className="mt-2 text-xs leading-6 text-white/75">
                Jewellery is more than an accessory. It's a memory you can
                carry with you.
              </p>
            </motion.div>
          </motion.div>

          <div className="pt-4 lg:pt-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#A17C3C]">
              A little about us
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Beauty in the
              <br />
              <span className="italic text-[#A17C3C]">little things.</span>
            </h2>

            <p className="mt-7 text-sm leading-8 text-[#77786F] sm:text-base">
              At NexaCart, we believe the right piece of jewellery can make an
              ordinary day feel special. Our collection brings together
              timeless inspiration and modern style for the moments that
              matter most to you.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#77786F] sm:text-base">
              Whether you're celebrating a milestone, finding a thoughtful
              gift, or simply treating yourself, discover designs that feel
              personal, beautiful, and uniquely yours.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5 border-y border-[#E9E0D1] py-6">
              <div>
                <p className="font-serif text-2xl text-[#A17C3C] sm:text-3xl">
                  Timeless
                </p>
                <p className="mt-2 text-xs leading-5 text-[#77786F]">
                  Designed to complement your personal style.
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-[#A17C3C] sm:text-3xl">
                  Thoughtful
                </p>
                <p className="mt-2 text-xs leading-5 text-[#77786F]">
                  Beautiful pieces for meaningful moments.
                </p>
              </div>
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#245848]"
            >
              Discover our story
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#F7F3EB] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#A17C3C]">
              Words that warm our hearts
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl">
              Little notes of <span className="italic">love.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77786F]">
              Every piece has a story. Here's what our customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  "The necklace is even more beautiful in person. The details are lovely, and it made the perfect gift.",
                name: "A happy customer",
                occasion: "A special gift",
              },
              {
                quote:
                  "I love how easy it is to style these pieces. They feel elegant without being too much for everyday wear.",
                name: "A happy customer",
                occasion: "Everyday elegance",
              },
              {
                quote:
                  "Found something that felt personal and meaningful. The design made my occasion extra special.",
                name: "A happy customer",
                occasion: "A memorable moment",
              },
            ].map((review, index) => (
              <motion.article
                key={review.occasion}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                }}
                whileHover={
                  shouldReduceMotion ? {} : { y: -5 }
                }
                className="border border-[#E5DAC5] bg-[#FFFEFA] p-6 sm:p-8"
              >
                <div className="flex gap-1 text-[#A17C3C]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} fill="currentColor" />
                  ))}
                </div>

                <span className="mt-5 block font-serif text-5xl leading-none text-[#D9BD82]">
                  “
                </span>

                <p className="mt-1 text-sm leading-8 text-[#62665E]">
                  {review.quote}
                </p>

                <div className="mt-7 border-t border-[#E9E0D1] pt-5">
                  <p className="font-serif text-lg">{review.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#A17C3C]">
                    {review.occasion}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-[#8B8A80]">
            Sample testimonial content — replace with genuine customer
            feedback before publishing.
          </p>
        </div>
      </motion.section>

      {/* NEWSLETTER */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative isolate overflow-hidden bg-[#102E27] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24"
      >
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, 25, 0], scale: [1, 1.1, 1] }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#D9BD82]/10 blur-[90px]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#D9BD82]/60 text-2xl text-[#D9BD82]">
              <FiMail />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D9BD82]">
              A little something special
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Stay close to
              <br />
              <span className="italic text-[#D9BD82]">the sparkle.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-8 text-white/70">
              Get updates about new collections, styling inspiration, and
              special offers delivered to your inbox.
            </p>
          </div>

          <div className="border border-white/15 bg-white/[0.04] p-5 sm:p-8">
            {subscribed ? (
              <div
                role="status"
                className="py-6 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D9BD82]/60 text-2xl text-[#D9BD82]">
                  <FiCheck />
                </span>

                <h3 className="mt-5 font-serif text-2xl">
                  Thank you for joining!
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  Your email has been accepted in this demo.
                </p>

                <button
                  type="button"
                  onClick={() => setSubscribed(false)}
                  className="mt-5 text-sm text-[#D9BD82] underline underline-offset-4"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl">
                  Join our community
                </h3>

                <p className="mt-2 text-sm leading-7 text-white/65">
                  A little inspiration, straight to your inbox.
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="mt-6"
                >
                  <label
                    htmlFor="newsletter-email"
                    className="mb-2 block text-xs font-medium text-white/80"
                  >
                    Email address
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="min-w-0 flex-1 border border-white/20 bg-white/[0.06] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#D9BD82]"
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-[#D9BD82] px-6 py-4 text-sm font-semibold text-[#173F35] transition hover:bg-[#F0DCA8]"
                    >
                      Subscribe <FiArrowRight />
                    </button>
                  </div>
                </form>

                <p className="mt-4 text-[11px] leading-5 text-white/45">
                  This is a frontend demo. Connect a newsletter service or
                  backend to store email subscriptions.
                </p>
              </>
            )}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.6 }}
        className="bg-[#F7F3EB] px-5 py-12 sm:px-8 lg:px-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border border-[#E5DAC5] bg-[#FFFEFA] p-6 text-center sm:flex-row sm:p-8 sm:text-left">
          <div>
            <p className="font-serif text-2xl sm:text-3xl">
              Find the piece that feels like you.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#77786F]">
              Explore designs for your everyday moments and special occasions.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#245848]"
          >
            Shop the collection <FiArrowRight />
          </Link>
        </div>
      </motion.section>
    </motion.main>
  );
}

export default Home;