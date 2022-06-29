import React from "react";
import {
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Radio,
  Slider,
  Rate,
  Button,
  DatePicker,
  TimePicker,
} from "antd";
import Signature from "./signature";
import Upload from "./Upload";
import EditableTable from "./EditableTable";
import Phone from "./Phone";

const FormElement = ({ element }) => {
  const { dropEffect, type, id, label, field_name, rules, ...data } = element;

  const wrapFormItem = (children) => {
    return (
      <Form.Item label={label} key={field_name} name={field_name} rules={rules}>
        {children}
      </Form.Item>
    );
  };
  const renderElement = () => {
    switch (type) {
      case "Header":
        return <h1>{data.content}</h1>;
      case "Paragraph":
        return <p>{data.content}</p>;
      case "LineBreak": {
        const { content, ...props } = data;
        return <Divider {...props}>{content}</Divider>;
      }
      case "Image": {
        if (data.src === "")
          data.src = "https://via.placeholder.com/728x90.png?text=Place+Your+Image+Here";
        return (
          <div style={{ textAlign: "center" }}>
            <img src={data.src} alt={data.alt} />
          </div>
        );
      }
      case "TextInput":
        return wrapFormItem(<Input {...data} />);
      case "NumberInput":
        return wrapFormItem(<InputNumber {...data} />);
      case "Dropdown":
        return wrapFormItem(<Select {...data} />);
      case "Tags":
        return wrapFormItem(<Select {...data} mode="tags" />);
      case "Checkboxes":
        return wrapFormItem(<Checkbox.Group {...data} />);
      case "RadioButtons":
        return wrapFormItem(<Radio.Group {...data} />);
      case "TextArea":
        return wrapFormItem(<Input.TextArea {...data} />);
      case "DatePicker":
        return wrapFormItem(<DatePicker {...data} />);
      case "TimePicker":
        return wrapFormItem(<TimePicker {...data} />);
      case "Range":
        const marks = { [data.min]: data.minLabel, [data.max]: data.maxLabel };
        return wrapFormItem(<Slider {...data} marks={marks} />);
      case "Rating":
        return wrapFormItem(<Rate {...data} />);
      case "Signature":
        return wrapFormItem(<Signature {...data} />);
      case "File":
        return wrapFormItem(
          <Upload {...data}>
            <Button>
              <i className="fas fa-upload"></i> Upload
            </Button>
          </Upload>
        );
      case "Photo":
        return wrapFormItem(
          <Upload {...data} listType="picture-card">
            <div>
              <div style={{ marginTop: 8 }}>
                <i className="far fa-images"></i> &nbsp;Upload
              </div>
            </div>
          </Upload>
        );

      case "Table":
        console.log("i am rendering Form Item");
        return wrapFormItem(<EditableTable {...data} field_name={field_name} />);
      case "Phone":
        return wrapFormItem(<Phone {...data} />);
      default:
        return <div>{JSON.stringify(data)}</div>;
    }
  };
  return renderElement();
};

export default FormElement;
