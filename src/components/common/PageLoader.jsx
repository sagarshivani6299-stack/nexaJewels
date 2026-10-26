
import { FiLoader } from "react-icons/fi";

export default function PageLoader({
  message = "Preparing your experience...",
  fullScreen = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center ${
        fullScreen
          ? "min-h-screen bg-[#FAF8F3]"
          : "min-h-[300px] bg-transparent"
      }`}
    >
      <div className="flex flex-col items-center gap-5 px-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D9C49A] bg-white shadow-sm">
          <FiLoader
            className="animate-spin text-[#173F35]"
            size={27}
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="font-serif text-2xl text-[#173F35]">
            NexaJewels
          </p>

          <p className="mt-2 text-sm tracking-wide text-stone-500">
            {message}
          </p>
        </div>

        <span className="h-0.5 w-16 overflow-hidden bg-stone-200">
          <span className="block h-full w-1/2 animate-pulse bg-[#C5A56A]" />
        </span>
      </div>
    </div>
  );
}
