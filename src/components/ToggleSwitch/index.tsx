import React from "react";
import Switch from "react-switch";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  labelName: string;
  name: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  labelName,
  name,
}) => {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={name}
        className={`text-sm text-dark_100 leading-5 flex gap-1 items-center mb-1`}
      >
        {labelName}
      </label>
      <Switch
        onChange={onChange}
        checked={checked || false}
        onColor="#E20083"
        offColor="#ccc"
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        uncheckedIcon={false}
        height={18}
        width={40}
        handleDiameter={20}
      />
    </div>
  );
};

export default ToggleSwitch;
