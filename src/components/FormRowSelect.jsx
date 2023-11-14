import { PropTypes } from "prop-types";
const FormRowSelect = ({
  name,
  labelText,
  value,
  handleChange,
  options = [],
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        className="form-select"
        onChange={(e) => handleChange(e)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

FormRowSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  labelText: PropTypes.string,
};

export default FormRowSelect;
