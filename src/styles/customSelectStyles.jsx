// SelectStyles.js
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "24px", // Reduce height
    height: "24px",
    fontSize: "12px", // Adjust text size if needed
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 8px", // Reduce padding
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "24px",
  }),
};

export default customSelectStyles;
