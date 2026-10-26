
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
  FiArrowRight,
  FiTrash2,
  FiBookmark,
  FiStar,
  FiSun,
} from "react-icons/fi";

import { useWishlist } from "../../hooks/useWishlist";
import ProductGrid from "../../components/products/ProductGrid";

export default function Wishlist() {
  const { items, isEmpty, emptyWishlist } = useWishlist();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearWishlist = () => {
    emptyWishlist();
    setShowConfirm(false);
  };

  return (
    <main className="wishlist-page min-h-screen overflow-hidden bg-[#FFFEFA] text-[#173F35]">
      <style>{`
        @keyframes wishlistReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wishlistFloat {
          0%, 100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-9px) rotate(4deg);
          }
        }

        @keyframes wishlistPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(177, 139, 75, .13);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(177, 139, 75, 0);
          }
        }

        @keyframes wishlistShimmer {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }

        .wishlist-reveal {
          animation: wishlistReveal .7s ease-out both;
        }

        .wishlist-delay-1 {
          animation-delay: .12s;
        }

        .wishlist-delay-2 {
          animation-delay: .24s;
        }

        .wishlist-float {
          animation: wishlistFloat 5s ease-in-out infinite;
        }

        .wishlist-pulse {
          animation: wishlistPulse 2.8s ease-out infinite;
        }

        .wishlist-button {
          transition:
            transform .25s ease,
            background .25s ease,
            color .25s ease,
            box-shadow .25s ease;
        }

        .wishlist-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 9px 22px rgba(23, 63, 53, .14);
        }

        .wishlist-outline {
          transition:
            border-color .3s ease,
            background .3s ease,
            color .3s ease;
        }

        .wishlist-outline:hover {
          border-color: #B18B4B;
          background: #fff;
        }

        .wishlist-decor {
          transition: transform .7s ease;
        }

        .wishlist-page:hover .wishlist-decor {
          transform: rotate(12deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .wishlist-reveal,
          .wishlist-float,
          .wishlist-pulse {
            animation: none !important;
          }

          .wishlist-button,
          .wishlist-outline,
          .wishlist-decor {
            transition: none !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#EAE3D8] bg-[#F7F3EB]">
        <div className="wishlist-decor pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#B18B4B]/15" />

        <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-[#B18B4B]/10" />

        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#E8EFE7]/60 blur-3xl" />

        <div className="container-wide relative mx-auto px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="wishlist-reveal max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-9 bg-[#B18B4B]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A17C3C] sm:text-xs">
                  Your Personal Collection
                </p>
              </div>

              <h1 className="font-serif text-4xl leading-tight text-[#173F35] sm:text-5xl lg:text-6xl">
                Your Wishlist
                <span className="ml-3 inline-block font-light italic text-[#A17C3C]">
                  ♥
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
                Keep the pieces you love close, until you're ready to make
                them yours. A little collection of things that feel like you.
              </p>

              {!isEmpty && (
                <div className="mt-6 inline-flex items-center gap-2 border border-[#DED2BD] bg-white/70 px-4 py-2.5 text-xs text-[#173F35]">
                  <FiBookmark size={15} className="text-[#A17C3C]" />

                  <span>
                    {items.length} saved{" "}
                    {items.length === 1 ? "piece" : "pieces"}
                  </span>
                </div>
              )}
            </div>

            {/* Animated Wishlist Illustration */}
            <div className="wishlist-reveal wishlist-delay-1 relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center sm:mx-0 sm:h-44 sm:w-44">
              <div className="absolute inset-0 rounded-full border border-[#B18B4B]/30" />

              <div className="absolute inset-3 rounded-full border border-[#B18B4B]/15" />

              <div className="wishlist-pulse absolute inset-7 rounded-full bg-white/80" />

              <div className="wishlist-float relative flex h-20 w-20 items-center justify-center rounded-full bg-[#173F35] text-[#E6C990] shadow-lg sm:h-24 sm:w-24">
                <FiHeart size={36} strokeWidth={1.25} />
              </div>

              <FiSun
                size={17}
                className="absolute right-5 top-5 text-[#A17C3C]"
              />

              <FiStar
                size={13}
                className="absolute bottom-6 left-4 text-[#A17C3C]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="container-wide mx-auto px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
        {!isEmpty && (
          <div className="wishlist-reveal mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A17C3C]">
                Saved for Later
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#173F35] sm:text-3xl">
                Pieces You Love
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="wishlist-outline inline-flex items-center gap-2 border border-[#E5DED2] px-4 py-3 text-xs font-medium text-stone-500 hover:text-red-600"
            >
              <FiTrash2 size={15} />
              Clear Wishlist
            </button>
          </div>
        )}

        {isEmpty ? (
          /* Empty Wishlist */
          <div className="wishlist-reveal mx-auto max-w-xl py-14 text-center sm:py-20">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#D8C69F]" />

              <div className="absolute inset-2 rounded-full bg-[#F3EDE2]" />

              <FiHeart
                size={32}
                strokeWidth={1.4}
                className="relative text-[#A17C3C]"
              />
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A17C3C]">
              A Collection Waiting to Begin
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-snug text-[#173F35] sm:text-4xl">
              A Little Room for Something Lovely
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-stone-500">
              Tap the heart on any piece to save it here. Keep your favourites
              together and return whenever you're ready to find your next
              treasured piece.
            </p>

            <Link
              to="/shop"
              className="wishlist-button mt-8 inline-flex items-center justify-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold text-white"
            >
              <FiShoppingBag size={17} />
              Explore the Collection
              <FiArrowRight size={16} />
            </Link>

            <div className="mt-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              <span className="h-px w-7 bg-[#D8C69F]" />
              Find something you love
              <span className="h-px w-7 bg-[#D8C69F]" />
            </div>
          </div>
        ) : (
          /* Products */
          <div className="wishlist-reveal wishlist-delay-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE3D8] pb-5">
              <p className="text-sm text-stone-500">
                Showing{" "}
                <span className="font-semibold text-[#173F35]">
                  {items.length}
                </span>{" "}
                saved {items.length === 1 ? "item" : "items"}
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#173F35] transition-colors hover:text-[#A17C3C]"
              >
                Continue Exploring
                <FiArrowRight size={15} />
              </Link>
            </div>

            <ProductGrid
              products={items}
              emptyTitle="Your wishlist is empty"
              emptyDescription="Explore our collection and save your favourites."
            />
          </div>
        )}
      </section>

      {/* Clear Wishlist Confirmation Modal */}
      {showConfirm && !isEmpty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B24]/55 p-5 backdrop-blur-sm"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowConfirm(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-wishlist-title"
            className="wishlist-reveal w-full max-w-md border border-[#E8E1D5] bg-[#FFFEFA] p-6 shadow-2xl sm:p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center bg-[#F7E9E5] text-red-700">
              <FiTrash2 size={21} />
            </div>

            <h2
              id="clear-wishlist-title"
              className="mt-5 font-serif text-2xl text-[#173F35]"
            >
              Clear your wishlist?
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-500">
              This will remove all {items.length} saved{" "}
              {items.length === 1 ? "piece" : "pieces"} from your collection.
              You can add them again from the shop.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="wishlist-button border border-[#E5DED2] px-5 py-3 text-sm font-medium text-[#173F35]"
              >
                Keep My Wishlist
              </button>

              <button
                type="button"
                onClick={handleClearWishlist}
                className="wishlist-button bg-[#173F35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#245647]"
              >
                Yes, Clear It
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
