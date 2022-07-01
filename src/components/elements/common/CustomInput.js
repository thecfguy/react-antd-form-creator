import React from "react";
import { InputTypes } from "../../appConstants";
import { Input, InputNumber } from "antd";

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
    default:
      return <Input {...props} />;
  }
};

export default CustomInput;
