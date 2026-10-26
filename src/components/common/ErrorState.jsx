
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this page right now. Please try again.",
  onRetry,
  showHomeLink = true,
}) {
  return (
    <section className="flex min-h-[360px] flex-col items-center justify-center px-5 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600">
        <FiAlertCircle size={34} strokeWidth={1.5} />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#B18B4B]">
        An Unexpected Interruption
      </p>

      <h2 className="font-serif text-3xl text-[#173F35] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-stone-500 sm:text-base">
        {message}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-[#173F35] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#245B4D]"
          >
            <FiRefreshCw size={16} />
            Try Again
          </button>
        )}

        {showHomeLink && (
          <Link
            to="/"
            className="border border-[#D9C49A] px-6 py-3.5 text-sm font-semibold text-[#173F35] transition hover:bg-[#F8F5EE]"
          >
            Back to Home
          </Link>
        )}
      </div>
    </section>
  );
}
