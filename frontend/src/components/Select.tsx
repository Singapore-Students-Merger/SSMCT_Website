"use client"
import React from "react";
import Select, { StylesConfig, components } from "react-select";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (option: Option | null) => void;
  beforeIcon?: React.ReactNode;
  className?: string;
  version?: "primary" | "secondary";
  shadow?: boolean;
  border?: boolean;
  label?: string;
  name?: string;
  value?: Option | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  onChange,
  beforeIcon,
  className,
  version = "primary",
  shadow = true,
  border = true,
  label,
  name,
  value,
}) => {
  const baseClass = `
    text-primary
    ${shadow ? "shadow-[0_0_2px_0_var(--tw-shadow-color)] shadow-primary/50" : ""}
    rounded-full
    px-0 py-0
    font-semibold
    hover:brightness-90 
    transition
    duration-200
    text-lg
    focus:outline-none
    focus:ring-2
    focus:ring-primary
    min-w-72
    relative 
    z-10
  `;

  const versionClass =
    version === "primary" ? "bg-secondary-tier1/50" : "bg-secondary-tier3";

  const borderClass = border ? "border-2 border-secondary-tier2" : "";

  // Custom styles to fix height, remove separator, and style the dropdown indicator
  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      padding: "0.25rem 1rem 0.25rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "normal",
      margin:0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0, // Ensure consistent padding
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgb(63, 100, 115)",
      zIndex: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      zIndex:10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      backdropFilter: state.isSelected ? "brightness(0.8)": state.isFocused ? "brightness(0.7)" : "none",
      color: "inherit",
      padding: "8px 1rem",
      width: "100%",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "inherit",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "inherit",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "currentColor", // Match the text color
      padding: "0 0",
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove vertical separator
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: 0,
    }),
    
  };

  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <span className="text-current">&#x25BC;</span> {/* Custom dropdown indicator */}
    </components.DropdownIndicator>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className={twMerge(baseClass, versionClass, borderClass, className)}>
        <Select
          options={options}
          placeholder={placeholder}
          onChange={onChange}
          styles={customStyles}
          components={{
            DropdownIndicator,
          }}
          name={name}
          value={value}
        />
      </div>
      {label && <label className="text-primary text-lg md:text-md ml-2">{label}</label>}
    </div>
  );
};

export default CustomSelect;
