import { ArrowRight } from "lucide-react";
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300"
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};

export default Button;
