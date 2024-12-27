import React from "react";
import classNames from "classnames";

const Button: React.FC<TButtonProps> = ({
  children,
  startIcon,
  endIcon,
  theme = '',
  textColor = '',
  classnames = '',
  isLoading = false,
  ...props
}) => {
  const themeHandler = (theme: string) => {
    switch(theme) {
      case 'primary':
        return "bg-[#2a60d4]";
      case 'secondary':
        return "bg-gray-400";
      case 'warning':
        return "bg-yellow-500";
      case 'error':
        return "bg-[#e81328]";
      default:
        return "";
    }
  };

  const textHandler = (textColor: string) => {
    switch(textColor) {
      case 'primary':
        return "text-white";
      case 'secondary':
        return "text-[#585858]";
      default:
        return "";
    }
  }

  const btnStyles = classNames(
    "p-2 font-semibold rounded-lg hover:bg-opacity-[60%] transition duration-150 ease-in-out",
    classnames,
    themeHandler(theme),
    textHandler(textColor),
    {
      "flex gap-2 items-center bg-gray-400": isLoading
    }
  );

  return (
    <button
      className={btnStyles}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
          width="16" height="16">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-500">
          </path>
        </svg>
      ) : startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;