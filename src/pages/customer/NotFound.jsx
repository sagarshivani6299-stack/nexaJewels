
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FFFEFA] px-5 py-16">
      <div className="max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F1EBDD] text-[#173F35]">
          <FiCompass size={34} />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#B18B4B]">
          404 · Page Not Found
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight text-[#173F35] sm:text-7xl">
          A Little Detour
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-stone-600 sm:text-base">
          It looks like this page has wandered away from our collection.
          Let's help you find your way back to something beautiful.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#173F35] px-6 py-4 text-sm font-semibold text-white hover:bg-[#245B4D]"
          >
            <FiArrowLeft /> Back to Home
          </Link>

          <Link
            to="/shop"
            className="border border-[#173F35] px-6 py-4 text-sm font-semibold text-[#173F35] hover:bg-[#F5F0E7]"
          >
            Explore Jewellery
          </Link>
        </div>
      </div>
    </main>
  );
}
