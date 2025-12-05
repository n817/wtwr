import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  return (
    <div className="toggle">
      <label className="toggle__label">
        <input type="checkbox" className="toggle__checkbox" />
        <span className="toggle__circle"></span>
        <span className="toggle__value toggle__value_type_fahrenheit">F</span>
        <span className="toggle__value toggle__value_type_celsius">C</span>
      </label>
    </div>
  )
}

export default ToggleSwitch;