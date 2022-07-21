import React, { useState } from "react";
import { dateFormats, InputTypes } from "../../appConstants";
import { Input, InputNumber, Checkbox, DatePicker, TimePicker } from "antd";
// import Picker from "./Picker";

// console.log(Picker, "Picker");
const { TextArea } = Input;

const CustomInput = (props) => {
    const { type } = props;

    switch (type) {
        case InputTypes.Text:
            return <Input {...props} />;
        case InputTypes.Number:
            return <InputNumber {...props} />;
        case InputTypes.TextArea:
            return <TextArea {...props} />;
        case InputTypes.Checkbox:
            return (
                <Checkbox
                    {...props}
                    checked={props?.value ? true : false}
                    onChange={(e) => {
                        props?.onChange(e.target.checked);
                    }}
                />
            );
        case InputTypes.Date:
            return <DatePicker inputReadOnly format={dateFormats.date} {...props} />;
        case InputTypes.Time:
            return <TimePicker inputReadOnly format={dateFormats.time} {...props} />;
        case InputTypes.DateTime:
            return <DatePicker inputReadOnly showTime format={dateFormats.dateTime} {...props} />;

        default:
            return <Input {...props} />;
    }
};

export default CustomInput;
