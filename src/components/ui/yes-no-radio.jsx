import { useState } from "react";
import { Label } from "@/components/ui/label";

export function YesNoRadio({ defaultValue = false, onChange }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    const boolValue = e.target.value === "yes";
    setValue(boolValue);
    if (onChange) onChange(boolValue);
  };

  return (
    <div className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          value="yes"
          checked={value === true}
          onChange={handleChange}
          className="accent-red-600"
        />
        <Label className="cursor-pointer">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          value="no"
          checked={value === false}
          onChange={handleChange}
          className="accent-red-600"
        />
        <Label className="cursor-pointer">No</Label>
      </div>
    </div>
  );
}
