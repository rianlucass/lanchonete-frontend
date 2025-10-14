import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button
      className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300"
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};

export default Button;
