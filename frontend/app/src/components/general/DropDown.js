import React, {useState, useEffect} from "react";

const DropDown = (props) =>{
    const data = props.data;
    const title = props.title;
    const onValueChange = props.onValueChange;
    const [defaultValue, setDefaultValue] = useState(
      props.defaultValue !== undefined && props.defaultValue !== ""
        ? props.defaultValue
        : ""
    );

     useEffect(() => {
       // Update default value when defaultValue prop changes
       setDefaultValue(props.defaultValue || "");
     }, [props.defaultValue]);

    const handleSelectChange = (event)=>{
        const newValue = event.target.value;
        setDefaultValue(event.target.value);
        onValueChange(newValue);
    }

    return (
      <div>
        <p>
          <label htmlFor={title}>{title}</label>
          <select
            id={title}
            className="select-field"
            style={{ display: "block" }}
            onChange={handleSelectChange}
            value={defaultValue}
          >
            <option key="select-a-value" value="" disabled>
              Select an option
            </option>
            {Object.values(data).map((entry) => (
              <option key={entry.name} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>
        </p>
      </div>
    );
}

export default DropDown;