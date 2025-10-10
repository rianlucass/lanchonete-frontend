type ButtonProps = {
  text: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-xl px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
    >
      {text}
    </button>
  )
}

export default Button;