import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="toggle">
      <label className="toggle__label">
        <input type="checkbox" className="toggle__checkbox" onChange={handleToggleSwitchChange} />
        <span className="toggle__circle"></span>
        <span className={`toggle__value toggle__value_type_celsius ${currentTemperatureUnit === "C" ? "toggle__value_color_white" : ""}`}>C</span>
        <span className={`toggle__value toggle__value_type_fahrenheit ${currentTemperatureUnit === "F" ? "toggle__value_color_white" : ""}`}>F</span>
      </label>
    </div>
  )
}

export default ToggleSwitch;