import { useState } from "react";

export const Input = ({
  type,
  onInputChange,
  placeholder,
  value,
  className = "w-full",
  disabled,
  ref,
  name,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const btnShowPasswordContent = isShowPassword
    ? "eye-off-outline"
    : "eye-outline";

  if (type === "text") {
    return (
      <input
        disabled={disabled}
        className={`${className} h-12 pl-4 pr-4 border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
        type="text"
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
        ref={ref}
        name={name}
      />
    );
  }

  if (type === "password") {
    return (
      <div className="w-full relative">
        <input
          className={`${className} w-full h-12 pl-4 pr-4 border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={onInputChange}
          ref={ref}
          name={name}
        />
        <button
          className="absolute right-4 top-3 text-2xl cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsShowPassword(!isShowPassword);
          }}
        >
          <ion-icon name={btnShowPasswordContent}></ion-icon>
        </button>
      </div>
    );
  }

  if (type === "username") {
    return (
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          onChange={onInputChange}
          ref={ref}
          name={name}
          className="w-full h-12 pl-10 pr-4 border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        />
        <span className="absolute left-4 top-2 text-blue-500 text-lg transition-all duration-300 peer-focus:scale-110">
          @
        </span>
      </div>
    );
  }
};
