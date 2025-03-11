import React, { useState, useRef, useEffect, useCallback } from "react";
import { MdCheckBox, MdClose, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./multiselect.css";
import { Button } from "../../ui";

interface MultiselectWithTagsProps<T> {
  placeholder?: string;
  options: { label: string; value: T }[];
  selectedValues: T[];
  onChange: (selectedValues: T[]) => void;
}

const MultiselectWithTags = <T extends React.ReactNode>({
  placeholder,
  options,
  selectedValues,
  onChange,
}: MultiselectWithTagsProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] =
    useState<MultiselectWithTagsProps<T>["options"]>(options);
  const [keyboardHoverIndex, setKeyboardHoverIndex] = useState<number>(-1);

  const handleSelect = (value: T) => {
    if (!selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  const handleRemove = (value: T) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const filterOptions: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setFilteredOptions(
      options.filter((option) =>
        option.value?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    setKeyboardHoverIndex(0);
  };

  const openOptions = () => setOptionsOpen(true);
  const closeOptions = () => setOptionsOpen(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const totalItems = filteredOptions.length;

      if (e.key === "ArrowDown") {
        setKeyboardHoverIndex((curr) => (curr + 1) % totalItems);
      } else if (e.key === "ArrowUp") {
        setKeyboardHoverIndex((curr) => (curr - 1 + totalItems) % totalItems);
      } else if (e.key === "Enter") {
        e.preventDefault();

        handleSelect(filteredOptions[keyboardHoverIndex].value);
      }
    },
    [optionsOpen, filteredOptions.length, keyboardHoverIndex]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        closeOptions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (optionsOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [optionsOpen, handleKeyDown]);

  return (
    <div className="px-3 py-2 rounded-lg outline-none bg-input focus:bg-popover focus:border-primary duration-200 border border-border w-full">
      <input
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        className="w-full px-3 py-2 rounded-lg outline-none bg-popover focus:border-primary duration-200 border border-border"
        onFocus={openOptions}
        onChange={filterOptions}
      />

      <div className="mt-1 flex items-center flex-wrap gap-2">
        {selectedValues.map((value, index) => (
          <span
            key={`multiselect-badge-${index}`}
            className="flex items-center bg-card p-1 rounded-md gap-1"
          >
            <span>{value}</span>
            <Button
              className="rounded-full multiselect-badge-close-btn"
              variant="ghost"
              onClick={() => handleRemove(value)}
            >
              <MdClose size={"20px"} />
            </Button>
          </span>
        ))}
      </div>

      {optionsOpen && (
        <div
          ref={dropdownRef}
          className="mt-1 z-50 bg-card bg-opacity-100 border rounded-lg shadow-md"
        >
          {filteredOptions.map((option, index) => (
            <Button
              key={`${option.value}-${index}`}
              className={`w-full flex items-center justify-start gap-2 ${
                keyboardHoverIndex === index && "bg-primary"
              }`}
              variant="ghost"
              onMouseDown={() => handleSelect(option.value)}
            >
              {selectedValues.includes(option.value) ? (
                <MdCheckBox size={"20px"} />
              ) : (
                <MdCheckBoxOutlineBlank size={"20px"} />
              )}
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiselectWithTags;
