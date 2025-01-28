"use client";
import React, { ChangeEvent, useState } from "react";
import TextInput from "./TextInput";
import SearchIcon from "./logos/SearchIcon";
import SelectIcon from "./logos/SelectIcon";
import CheckIcon from "./logos/CheckIcon";
import AddIcon from "./logos/AddIcon";
import Button from "./Button";

interface SearchableMultiSelectProps {
  className?: string;
  options: Option[];
  setSelected: (options: Option[]) => void;
  selected?: Option[];
  placeholder?: string;
}

interface MultiSelectProps {
  className?: string;
  options: Option[];
  selected?: Option[];
  setSelected: (options: Option[]) => void; 
  placeholder?: string;
}

interface Option {
  label: string;
  id: number | string | null;
}

interface OptionProps {
  isSelected: boolean;
  option: Option;
  toggleOption: (option: Option) => void;
}
const MultiSelectOption : React.FC<OptionProps> = ({option, toggleOption, isSelected}) => {
  return (
      <div
      key={option.id ?? option.label}
      onClick={() => toggleOption(option)}
      className={`cursor-pointer flex items-center gap-2 w-full py-2 px-4 hover:brightness-90
        hover:backdrop-brightness-90
        ${isSelected ? "bg-[#2b4752]" : ""}
      `}
    >
      {isSelected && <CheckIcon fill="#BAEAFF"/>}
      {!isSelected && <AddIcon />}
      <span className="font-bold text-white">{option.label}</span>
    </div>
  );
}
const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  className,
  options,
  setSelected,
  selected = [],
}) => {
  

  // This state tracks the text typed into the search box
  const [searchTerm, setSearchTerm] = useState("");
  // This state determines whether the dropdown is open
  const [showTooltip, setShowTooltip] = useState(false);
  // This state tracks all selected options

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleToolTip = () => {
    console.log("toggle");
    setTimeout(() => {
      setShowTooltip((prev) => !prev);
    }, 100);
  };

  // Toggle selection of an option
  const toggleOption = (option: Option) => {
    const isSelected = selected.find((item) => (item.id??item.label) === (option.id??option.label));
    if (isSelected) {
      // Remove if already selected
      const newSelected = selected.filter((item) => (item.id??item.label) !== (option.id??option.label));
      setSelected(newSelected);
    } else {
      // Otherwise add
      setSelected([...selected, option]);
    }
  };



  // Filtered list of options to show in the dropdown
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOptions = filteredOptions.filter((option) =>
    selected.some((sel) => (sel.id ?? sel.label) === (option.id ?? option.label))
  );
  const unselectedOptions = filteredOptions.filter((option) =>
    !selected.some((sel) => (sel.id ?? sel.label) === (option.id ?? option.label))
  );
  return (
    <div className={`${className} relative w-full`}>
      <Button
        className="rounded-xl w-full text-left truncate"
        onClick={toggleToolTip}
        afterIcon = {<SelectIcon/>}
      >
        {selected.length?selected.map((sel) => sel.label).join(", "):'Filter Topics'}
      </Button>
      {showTooltip && (
        <div className="overflow-x-hidden absolute top-full left-0 bg-[#3f6473] rounded-xl w-full max-h-[33vh] overflow-auto shadow-md z-10">
          <TextInput
          beforeIcon = {<SearchIcon/>}
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-lg w-full rounded-b-none"
            placeholder="Search"/>
          {[...selectedOptions, ...unselectedOptions].map((option) => {
          const isSelected = selected.some(
            (sel) => (sel.id ?? sel.label) === (option.id ?? option.label)
          );

          return (
            <MultiSelectOption
              key={option.id ?? option.label}
              option={option}
              isSelected={isSelected}
              toggleOption={toggleOption}
            />
          );
        })}
        </div>
      )}
    </div>
  );
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  className,
  options,
  selected = [],
  setSelected,
  placeholder = "Select",
}) => {
  // Controls visibility of the dropdown
  const [showTooltip, setShowTooltip] = useState(false);


  // Toggles the dropdown
  const toggleToolTip = () => {
    setTimeout(() => {
      setShowTooltip((prev) => !prev);
    }, 100);
  };

  // Select / Deselect an option
  const toggleOption = (option: Option) => {
    const isSelected = selected.find((item) => (item.id??item.label) === (option.id??option.label));
    if (isSelected) {
      // Remove if already selected
      const newSelected = selected.filter((item) => (item.id??item.label) !== (option.id??option.label));
      setSelected(newSelected);
    } else {
      // Otherwise add
      setSelected([...selected, option]);
    }
  };

  // Partition options so that selected items appear first
  const selectedOptions = options.filter((option) =>
    selected.some((sel) => (sel.id ?? sel.label) === (option.id ?? option.label))
  );
  const unselectedOptions = options.filter((option) =>
    !selected.some((sel) => (sel.id ?? sel.label) === (option.id ?? option.label))
  );

  return (
    <div className={`${className} relative w-full`}>
      <Button
        className="rounded-xl w-full text-left truncate"
        onClick={toggleToolTip}
        afterIcon={<SelectIcon />}
      >
        {selected.length
          ? selected.map((sel) => sel.label).join(", ")
          : placeholder}
      </Button>

      {showTooltip && (
        <div className="absolute top-full left-0 bg-[#3f6473] rounded-xl w-full max-h-[33vh] overflow-auto shadow-md z-10">
          {[...selectedOptions, ...unselectedOptions].map((option) => {
            const isSelected = selected.some(
              (sel) =>
                (sel.id ?? sel.label) === (option.id ?? option.label)
            );
            return (
              <MultiSelectOption
                key={option.id ?? option.label}
                option={option}
                isSelected={isSelected}
                toggleOption={toggleOption}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export {MultiSelect, SearchableMultiSelect};