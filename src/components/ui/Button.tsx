import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button
      className="w-full flex justify-center items-center px-4 py-2 text-white bg-indigo-400 rounded-sm hover:brightness-110"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled && (
        <CgSpinner className="animate-spin inline-block w-6 h-6 mr-2" />
      )}
      {text}
    </button>
  );
}
