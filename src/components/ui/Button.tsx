interface ButtonProps {
  href?: string;
  text: string;
  additionalStyles?: string;
  bgColor: "red" | "white";
  icon: string;
  className?: string;
  value?: string;
  iconMobile?: boolean;
  onClick?: () => void;
}

function Button({
  text,
  value,
  iconMobile,
  href,
  additionalStyles,
  bgColor,
  icon,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "flex items-center cursor-pointer justify-center gap-2 rounded-full px-10 py-3 font-semibold leading-[25px] border-solid border-2 transition-all duration-300 ease-in-out transform hover:scale-103";

  const bgStyles =
    bgColor === "red"
      ? "text-white bg-primary border-primary hover:bg-red-700 hover:border-red-700"
      : "text-secondary bg-white border-secondary hover:bg-gray-200 hover:border-gray-400";

  if (href) {
    return (
      <a
        className={`${baseStyles} ${bgStyles} ${additionalStyles}`}
        href={href}
      >
        {text}
        <img
          className={`${
            iconMobile ? "hidden" : "block"
          } sm:block w-[24px] h-[24px] transition-opacity duration-300 hover:opacity-80`}
          src={icon}
        />
      </a>
    );
  }

  return (
    <button
      value={value}
      onClick={onClick}
      className={`${baseStyles} ${bgStyles} ${additionalStyles}`}
    >
      {text}
      <img
        className={`${
          iconMobile ? "hidden" : "block"
        } sm:block w-[24px] h-[24px] transition-opacity duration-300 hover:opacity-80`}
        src={icon}
      />
    </button>
  );
}

export default Button;
