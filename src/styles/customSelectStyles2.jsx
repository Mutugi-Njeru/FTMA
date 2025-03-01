const customSelectStyles2 = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#6366f1" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#6366f1" : "#d1d5db",
    },
    minHeight: "2.5rem",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#6366f1"
      : state.isFocused
      ? "#e0e7ff"
      : "white",
    color: state.isSelected ? "white" : "#374151",
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#4f46e5",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#374151",
    fontSize: "0.875rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
    fontSize: "0.875rem",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9ca3af",
    "&:hover": {
      color: "#6b7280",
    },
    padding: "0.25rem",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0.25rem 0.5rem",
  }),
};

export default customSelectStyles2;
