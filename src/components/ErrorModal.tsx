import { useEffect, useImperativeHandle, useState } from "react";
import { X } from "lucide-react";

export default function ErrorModal({
  message,
  setError,
}: {
  message: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setClosing(false);
    setTimeout(() => handleClose(), 2000);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setError(""), 360);
  };

  return (
    <div
      className={`absolute right-5 top-5 z-50 flex justify-center transition-all duration-300 ${
        closing ? "animate-slide-out" : "animate-slide-in"
      }`}
    >
      <div className="relative w-80 bg-white text-gray-800 rounded-xl shadow-2xl border border-green-500 p-5 flex flex-col items-center">
        {/* Close button */}
        <X
          className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition duration-200"
          onClick={handleClose}
        />

        {/* Icon + message */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full border border-green-400">
            <span className="text-green-600 font-bold text-xl">!</span>
          </div>

          <p className="text-sm font-medium">{message}</p>
        </div>

        {/* Glow line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-b-xl"></div>
      </div>
    </div>
  );
}
