
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";

const sections = [
  {
    icon: FiTruck,
    number: "01",
    title: "Shipping & Delivery",
    description:
      "Every NexaJewels order deserves a thoughtful journey. Available shipping methods, delivery charges and estimated arrival dates should be displayed during checkout.",
    points: [
      "Delivery estimates depend on your destination and product availability.",
      "Shipping charges are calculated according to the store's configured policy.",
      "Your order confirmation should contain the latest available order details.",
    ],
  },
  {
    icon: FiPackage,
    number: "02",
    title: "Order Tracking",
    description:
      "Keep track of your purchase through your customer account. Order updates and shipment information depend on the services connected to the store.",
    points: [
      "Visit My Orders to review your order status.",
      "Courier tracking details appear when they are available.",
      "Contact customer care if you need assistance with an existing order.",
    ],
  },
  {
    icon: FiRefreshCw,
    number: "03",
    title: "Returns & Exchanges",
    description:
      "We want you to feel confident about your purchase. Before placing an order, review the store's final return and exchange policy.",
    points: [
      "Return eligibility depends on the published store policy.",
      "Product condition, packaging and return deadlines may affect eligibility.",
      "Contact customer care with your order number to request assistance.",
    ],
  },
  {
    icon: FiShield,
    number: "04",
    title: "Refunds & Product Care",
    description:
      "If a return is approved, the refund process and expected timeline should be communicated according to the store's payment and refund policy.",
    points: [
      "Refund timing can depend on the payment provider and bank.",
      "Keep your order confirmation until your request is resolved.",
      "Follow the care instructions appropriate for your jewellery's material.",
    ],
  },
];

const highlights = [
  {
    icon: FiPackage,
    title: "Order Updates",
    text: "Review available order information.",
  },
  {
    icon: FiTruck,
    title: "Delivery Details",
    text: "Check shipping options at checkout.",
  },
  {
    icon: FiHeadphones,
    title: "Customer Support",
    text: "Get help with order-related questions.",
  },
];

export default function ShippingReturns() {
  return (
    <main className="shipping-page min-h-screen overflow-hidden bg-[#FFFEFA] text-[#173F35]">
      <style>{`
        @keyframes shippingReveal {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shippingFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shippingRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .shipping-reveal {
          animation: shippingReveal .7s ease-out both;
        }

        .shipping-delay-1 { animation-delay: .12s; }
        .shipping-delay-2 { animation-delay: .22s; }
        .shipping-delay-3 { animation-delay: .32s; }

        .shipping-float {
          animation: shippingFloat 7s ease-in-out infinite;
        }

        .shipping-rotate {
          animation: shippingRotate 50s linear infinite;
        }

        .shipping-card {
          transition: transform .35s ease, border-color .35s ease,
            box-shadow .35s ease;
        }

        .shipping-card:hover {
          transform: translateY(-5px);
          border-color: #D8C69F;
          box-shadow: 0 16px 38px rgba(23, 63, 53, .07);
        }

        .shipping-icon {
          transition: background .3s ease, color .3s ease,
            transform .3s ease;
        }

        .shipping-card:hover .shipping-icon {
          background: #173F35;
          color: #F1D9A7;
          transform: scale(1.05);
        }

        .shipping-cta {
          transition: transform .25s ease, background .25s ease,
            box-shadow .25s ease;
        }

        .shipping-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 9px 24px rgba(23, 63, 53, .16);
        }

        @media (prefers-reduced-motion: reduce) {
          .shipping-reveal, .shipping-float, .shipping-rotate {
            animation: none !important;
          }

          .shipping-card, .shipping-icon, .shipping-cta {
            transition: none !important;
          }
        }
      `}</style>

      {/* Premium hero */}
      <section className="relative overflow-hidden bg-[#173F35] px-5 py-20 text-center text-white sm:py-28 lg:py-32">
        <div className="shipping-rotate pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#D8BC83]/20" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-60 w-60 rounded-full border border-[#D8BC83]/10" />
        <div className="shipping-float pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-[#D8BC83]/20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045),transparent_65%)]" />

        <div className="shipping-reveal relative mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#D8BC83]/40 bg-white/[0.04] text-[#E1C58E]">
            <FiTruck size={25} />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E1C58E] sm:text-xs">
            Thoughtful Service · Trusted Shopping
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl lg:text-7xl">
            Shipping <span className="font-light italic text-[#E1C58E]">&</span>
            <br className="sm:hidden" /> Returns
          </h1>

          <div className="mx-auto mt-7 h-px w-16 bg-[#D8BC83]/70" />

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            From the moment you place an order to the day it reaches you,
            find the information you need for a more confident shopping
            experience.
          </p>
        </div>

        <div className="shipping-reveal shipping-delay-1 relative mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-white/60 sm:gap-x-9">
          <span className="flex items-center gap-2">
            <FiCheckCircle className="text-[#E1C58E]" size={14} />
            Order assistance
          </span>
          <span className="flex items-center gap-2">
            <FiShield className="text-[#E1C58E]" size={14} />
            Clear guidelines
          </span>
          <span className="flex items-center gap-2">
            <FiClock className="text-[#E1C58E]" size={14} />
            Helpful information
          </span>
        </div>
      </section>

      {/* Service highlights */}
      <section className="container-wide mx-auto px-5 py-10 sm:py-14 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className={`shipping-card shipping-reveal shipping-delay-${index + 1} flex items-start gap-4 border border-[#E8E1D5] bg-white p-5 sm:p-6`}
            >
              <div className="shipping-icon flex h-12 w-12 shrink-0 items-center justify-center bg-[#F3EDE2] text-[#173F35]">
                <Icon size={21} />
              </div>

              <div>
                <h2 className="font-serif text-xl text-[#173F35]">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Policy sections */}
      <section className="container-wide mx-auto px-5 pb-16 lg:px-8 lg:pb-24">
        <header className="shipping-reveal mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A17C3C] sm:text-xs">
            Everything You Need to Know
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#173F35] sm:text-5xl">
            Your Questions, Answered
          </h2>

          <p className="mt-5 text-sm leading-7 text-stone-600 sm:text-base">
            Please review these guidelines and confirm the final store
            policies before making a purchase.
          </p>
        </header>

        <div className="mx-auto max-w-4xl">
          {sections.map(({ icon: Icon, number, title, description, points }, index) => (
            <article
              key={number}
              className="shipping-reveal group grid gap-5 border-t border-[#E8E1D5] py-8 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-8 sm:py-10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 sm:block">
                <div className="shipping-icon flex h-12 w-12 shrink-0 items-center justify-center bg-[#F3EDE2] text-[#173F35]">
                  <Icon size={22} />
                </div>

                <p className="mt-3 font-serif text-sm tracking-[0.2em] text-[#B18B4B] sm:mt-4">
                  {number}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#173F35] transition-colors duration-300 group-hover:text-[#A17C3C] sm:text-3xl">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-8 text-stone-600 sm:text-base">
                  {description}
                </p>

                <ul className="mt-5 space-y-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-7 text-stone-600"
                    >
                      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B18B4B]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <div className="border-t border-[#E8E1D5]" />
        </div>
      </section>

      {/* Policy notice */}
      <section className="container-wide mx-auto px-5 pb-16 lg:px-8">
        <div className="shipping-reveal relative overflow-hidden border border-[#D8C69F] bg-[#F5F0E7] p-6 sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-[#B18B4B]/15" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-[#A17C3C]">
              <FiShield size={23} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#92703A]">
                Important Information
              </p>

              <h2 className="mt-3 font-serif text-2xl text-[#173F35] sm:text-3xl">
                Before You Place an Order
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-8 text-stone-600">
                This page currently provides general guidance. Actual delivery
                estimates, shipping fees, return eligibility, refund timelines
                and exclusions must be confirmed by the store before this
                website is used for real customer orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-[#F5F0E7] px-5 py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full border border-[#B18B4B]/15" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-72 w-72 rounded-full border border-[#B18B4B]/15" />

        <div className="shipping-reveal relative mx-auto max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A17C3C] sm:text-xs">
            We're Here to Help
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#173F35] sm:text-5xl">
            Need Help With Your Order?
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
            If you have questions about shipping, a delivery or a return,
            visit our contact page to get started.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="shipping-cta inline-flex items-center justify-center gap-3 bg-[#173F35] px-6 py-4 text-sm font-semibold text-white sm:px-7"
            >
              Contact Customer Care
              <FiArrowRight size={16} />
            </Link>

            <Link
              to="/faq"
              className="shipping-cta inline-flex items-center justify-center gap-3 border border-[#173F35]/30 bg-white/50 px-6 py-4 text-sm font-semibold text-[#173F35] hover:bg-white sm:px-7"
            >
              Read FAQs
              <FiArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-stone-400">
            NexaJewels · Thoughtful service, every step of the way
          </p>
        </div>
      </section>
    </main>
  );
}
