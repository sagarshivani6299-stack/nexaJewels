
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const faqGroups = [
  {
    title: "Orders & Payments",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Browse the collection, open a product, select your quantity and add it to your bag. Continue through checkout once the checkout service is configured.",
      },
      {
        question: "Can I change or cancel an order?",
        answer:
          "Contact customer support with your order number as soon as possible. Changes depend on the order status and the store's actual cancellation policy.",
      },
      {
        question: "Which payment methods are accepted?",
        answer:
          "Available payment methods will be displayed at checkout. Payment options must be configured by the store before launch.",
      },
    ],
  },
  {
    title: "Shipping & Returns",
    items: [
      {
        question: "How much does shipping cost?",
        answer:
          "The current demo cart estimates complimentary shipping on orders of ₹2,999 or more and ₹99 standard shipping below that amount. Confirm your final shipping policy before launch.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Sign in and visit My Orders to view available order information. Live shipment tracking requires integration with your order or courier service.",
      },
      {
        question: "Can I return a product?",
        answer:
          "Please review the Shipping & Returns page for the store's final eligibility, timeframe and product-condition rules. Do not rely on placeholder policy text for an actual purchase.",
      },
    ],
  },
  {
    title: "Products & Care",
    items: [
      {
        question: "How should I care for my jewellery?",
        answer:
          "Follow the care instructions specific to your item's material. As a general precaution, avoid harsh chemicals, store pieces separately and keep them dry unless the product instructions say otherwise.",
      },
      {
        question: "Will a product look exactly like the photos?",
        answer:
          "Product photography aims to represent each item clearly, but screen settings and lighting can affect appearance. Publish accurate material, dimensions and finish details for every product.",
      },
      {
        question: "How can I save my favourite pieces?",
        answer:
          "Use the heart icon on a product to add it to your wishlist. Account-based wishlist syncing requires a connected and authenticated customer account.",
      },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState("Orders & Payments-0");

  return (
    <main className="min-h-screen bg-[#FFFEFA]">
      <section className="bg-[#173F35] px-5 py-16 text-center text-white sm:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-[#E1C58E]">
          A Little Guidance
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75">
          Helpful answers about your order, our products and the shopping experience.
        </p>
      </section>

      <section className="container-wide mx-auto max-w-4xl px-5 py-14 lg:py-20">
        {faqGroups.map((group) => (
          <div key={group.title} className="mb-10">
            <h2 className="mb-4 font-serif text-2xl text-[#173F35]">
              {group.title}
            </h2>

            <div className="border-t border-stone-200">
              {group.items.map((item, index) => {
                const key = `${group.title}-${index}`;
                const isOpen = openItem === key;

                return (
                  <div key={item.question} className="border-b border-stone-200">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenItem(isOpen ? "" : key)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    >
                      <span className="font-medium text-[#173F35]">
                        {item.question}
                      </span>
                      <FiChevronDown
                        className={`shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <p className="max-w-3xl pb-5 text-sm leading-7 text-stone-600">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-[#F5F0E7] p-7 text-center sm:p-10">
          <h2 className="font-serif text-2xl text-[#173F35]">
            Still have a question?
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            Our contact page is the place to start with an enquiry.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex bg-[#173F35] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#245B4D]"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
