const CustomSelectStyles = {
  control: (base) => ({
    ...base,
    borderColor: "#E5E7EB",
    "&:hover": {
      borderColor: "#9CA3AF",
    },
    boxShadow: "none",
    "&:focus-within": {
      borderColor: "#6366F1",
      boxShadow: "0 0 0 1px #6366F1",
    },
  }),
  menu: (base) => ({
    ...base,
    fontSize: "0.875rem",
    padding: "0.5rem 0",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    fontSize: "0.875rem", // Adjust the font size of the dropdown options
    padding: "0.5rem 1rem", // Adjust the padding of each dropdown item
    backgroundColor: isFocused ? "#fef3c7" : "white", // Change background color on hover
    color: isSelected ? "#1E40AF" : "#374151", // Change text color for selected item
    "&:active": {
      backgroundColor: "#E5E7EB", // Change background color on click
    },
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "0.875rem",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "0.875rem",
  }),
};
export default CustomSelectStyles;
