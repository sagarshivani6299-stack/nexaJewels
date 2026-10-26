
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiAward,
  FiStar,
  FiArrowUpRight,
  FiShield,
  FiFeather,
  FiCompass,
} from "react-icons/fi";

const values = [
  {
    icon: FiHeart,
    number: "01",
    title: "Designed with feeling",
    description:
      "Jewellery inspired by meaningful moments, personal style, and thoughtful gifting.",
  },
  {
    icon: FiAward,
    number: "02",
    title: "Timeless by nature",
    description:
      "Classic designs for everyday elegance and special occasions that deserve to be remembered.",
  },
  {
    icon: FiStar,
    number: "03",
    title: "Details matter",
    description:
      "A considered shopping experience that makes discovering your next favourite piece enjoyable.",
  },
];

const imageUrl =
  "https://plus.unsplash.com/premium_photo-1740020241476-be2394113f0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const viewport = { once: true, amount: 0.2 };

  return (
    <main className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFEFA] via-[#FAF7EF] to-[#F0E7D7] text-[#173F35]">
      {/* Ambient decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 18, 0], y: [0, -14, 0] }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-36 top-40 h-96 w-96 rounded-full border border-[#B89552]/15"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -14, 0], y: [0, 18, 0] }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-[950px] h-96 w-96 rounded-full border border-[#174A3D]/10"
        />

        <div className="absolute left-1/2 top-[480px] h-80 w-80 -translate-x-1/2 rounded-full bg-[#D9BD82]/[0.08] blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071F18] via-[#123D31] to-[#174A3D] text-[#FFFDF7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-[#D9BD82]/15" />
          <div className="absolute -right-8 -top-12 h-64 w-64 rounded-full border border-[#D9BD82]/10" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D9BD82]/70 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[0.92fr_1.08fr] md:gap-8 md:px-12 md:py-20 lg:gap-16 lg:px-16 lg:py-24">
          {/* Hero copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.13,
                },
              },
            }}
            className="relative z-10"
          >
            <motion.div variants={reveal} className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#D9BD82]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E7D19B] sm:text-xs">
                The world of Nexa
              </span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="max-w-xl font-serif text-4xl leading-[1.12] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Beauty in every
              <span className="mt-1 block italic text-[#E4C989]">
                little detail.
              </span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-6 max-w-lg text-sm leading-8 text-white/70 sm:text-base sm:leading-9"
            >
              NexaJewels is a jewellery brand concept inspired by timeless
              design, thoughtful gifting, and the beauty of expressing your
              individual style.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-sm border border-[#E4C989] bg-gradient-to-r from-[#D9BD82] to-[#EBD8A5] px-5 py-4 text-xs font-bold tracking-wide text-[#12372F] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(217,189,130,0.18)] sm:px-6 sm:text-sm"
              >
                Explore our collection
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2 text-xs text-white/60">
                <FiStar className="text-[#E4C989]" size={15} />
                Elegance, thoughtfully imagined
              </div>
            </motion.div>

            {/* Small decorative details */}
            <motion.div
              variants={reveal}
              className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6"
            >
              <div className="flex -space-x-2">
                {[0, 1, 2].map((item) => (
                  <span
                    key={item}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#123D31] bg-gradient-to-br from-[#F2E4C3] to-[#B89552] text-[#173F35]"
                  >
                    {item === 0 ? (
                      <FiHeart size={14} />
                    ) : item === 1 ? (
                      <FiStar size={14} />
                    ) : (
                      <FiAward size={14} />
                    )}
                  </span>
                ))}
              </div>
              <p className="max-w-[230px] text-[11px] leading-5 text-white/60">
                Thoughtful designs for everyday moments and special occasions.
              </p>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 30,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.85,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-[600px] md:ml-auto"
          >
            <div className="absolute -inset-3 rounded-t-[48%] rounded-b-[42%] border border-[#D9BD82]/35 sm:-inset-4" />

            <motion.div
              whileHover={
                shouldReduceMotion ? undefined : { scale: 1.015 }
              }
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-t-[48%] rounded-b-[42%] border border-[#D9BD82]/30 bg-[#D8C7A5] shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
            >
              <img
                src={imageUrl}
                alt="Elegant jewellery details in warm golden light"
                className="aspect-[4/4.5] w-full object-cover object-center sm:aspect-[5/4.5] md:aspect-[4/5]"
                loading="eager"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071F18]/55 via-transparent to-[#D9BD82]/10" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071F18]/45 to-transparent" />
            </motion.div>

            {/* Floating image label */}
            <motion.div
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 12,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.65,
                duration: 0.5,
              }}
              className="absolute -bottom-5 left-2 max-w-[230px] border border-[#D9BD82]/45 bg-[#FFFEFA] p-4 text-[#173F35] shadow-[0_15px_35px_rgba(0,0,0,0.15)] sm:bottom-8 sm:-left-8 sm:p-5"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#A17C3C]">
                The Nexa philosophy
              </p>
              <p className="mt-2 font-serif text-lg italic sm:text-xl">
                Personal. Timeless. Yours.
              </p>
            </motion.div>

            <div className="absolute right-2 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#D9BD82]/60 bg-[#123D31]/80 text-[#E4C989] backdrop-blur-md sm:right-5 sm:top-10">
              <FiFeather size={21} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={reveal}
        className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28"
      >
        <div className="mx-auto mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#B89552]" />
          <FiStar size={15} className="text-[#B89552]" />
          <span className="h-px w-8 bg-[#B89552]" />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A17C3C] sm:text-xs">
          Our philosophy
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-tight text-[#123D31] sm:text-4xl md:text-5xl">
          Style that feels
          <span className="italic text-[#A17C3C]"> personal.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#756F63] sm:text-base sm:leading-9">
          From everyday favourites to celebration pieces, we believe jewellery
          can become part of a memory you treasure for years. Our storefront
          brings together elegant imagery, intuitive browsing, and a smooth
          shopping journey.
        </p>

        <div className="mx-auto mt-9 h-px w-20 bg-gradient-to-r from-transparent via-[#B89552] to-transparent" />
      </motion.section>

      {/* Values */}
      <section className="relative overflow-hidden border-y border-[#D9BD82]/20 bg-gradient-to-br from-[#0B2C23] via-[#123D31] to-[#09251E] px-5 py-16 text-[#FFFDF7] sm:px-8 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#D9BD82]/10"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={reveal}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C989] sm:text-xs">
              What inspires us
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl">
              The values behind
              <span className="block italic text-[#E4C989]">our vision.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
              A thoughtful approach to design, detail, and the experience of
              finding something that feels uniquely yours.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 24,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.12,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -7, borderColor: "rgba(217,189,130,0.65)" }
                  }
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-6 transition-colors duration-300 sm:p-8"
                >
                  <div className="absolute right-5 top-5 font-serif text-4xl text-white/[0.06]">
                    {value.number}
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#D9BD82]/35 bg-[#D9BD82]/[0.09] text-[#E4C989] transition-all duration-300 group-hover:bg-[#D9BD82] group-hover:text-[#12372F]">
                    <Icon size={23} strokeWidth={1.6} />
                  </div>

                  <h3 className="mt-7 font-serif text-xl text-[#FFF8E8] sm:text-2xl">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {value.description}
                  </p>

                  <div className="mt-6 h-px w-10 bg-[#D9BD82]/65 transition-all duration-300 group-hover:w-20" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9BD82]/[0.09] blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={reveal}
          className="relative mx-auto max-w-4xl overflow-hidden border border-[#D9BD82]/35 bg-gradient-to-br from-[#123D31] via-[#0E3026] to-[#071F18] px-6 py-12 text-center text-[#FFFDF7] shadow-[0_25px_70px_rgba(18,60,49,0.16)] sm:px-12 sm:py-16 md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-3 border border-white/[0.08]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D9BD82]/50 bg-[#D9BD82]/10 text-[#E4C989]">
              <FiCompass size={21} />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C989] sm:text-xs">
              Find your favourite
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Every piece has a story.
              <span className="mt-2 block italic text-[#E4C989]">
                Make it yours.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/65">
              Explore a collection inspired by personal style, thoughtful
              details, and the beauty of meaningful moments.
            </p>

            <Link
              to="/shop"
              className="group mt-8 inline-flex items-center gap-3 border border-[#E4C989] bg-gradient-to-r from-[#D9BD82] to-[#F0DDA9] px-7 py-4 text-sm font-semibold text-[#12372F] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(217,189,130,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4C989]"
            >
              Explore the collection
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
