import React, { useState } from "react";
import { dateFormats, InputTypes } from "../../appConstants";
import { Input, InputNumber, Checkbox, DatePicker, TimePicker } from "antd";

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
            return <DatePicker format={dateFormats.date} {...props} />;
        case InputTypes.Time:
            return <TimePicker format={dateFormats.time} {...props} />;
        case InputTypes.DateTime:
            return <DatePicker showTime format={dateFormats.dateTime} {...props} />;

        default:
            return <Input {...props} />;
    }
};

export default CustomInput;
