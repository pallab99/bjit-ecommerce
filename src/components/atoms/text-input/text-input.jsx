/* eslint-disable react/prop-types */

const TextInput = ({ placeholder, fieldValues, className }) => {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      {...fieldValues}
    />
  );
};

export default TextInput;
