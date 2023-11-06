import { PropTypes } from "prop-types";

const FormRow = ({ name, type, handleChange, value, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="form-input"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

FormRow.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  labelText: PropTypes.string,
};

export default FormRow;
