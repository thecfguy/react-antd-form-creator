import React from "react";
import { Divider, Rate, Tag, Slider, Image, Table } from "antd";
import moment from "moment";
import PhoneList from "./PhoneList";
const ViewElement = ({ element, value, ...props }) => {
  const { type, ...data } = element;

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
        return <img src={data.src} alt={data.alt} />;
      }
      case "TextInput":
      case "NumberInput":
      case "Dropdown":
      case "RadioButtons":
        return <div>{value}</div>;
      case "File":
        return (
          <>
            {value?.map((item, index) => (
              <div key={index}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </div>
            ))}
          </>
        );
      case "Photo":
        return (
          <Image.PreviewGroup>
            {value?.map((item, index) => (
              <Image
                width={200}
                src={item.url}
                key={index}
                style={{
                  padding: "5px",
                  minHeight: "100px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </Image.PreviewGroup>
        );
      case "Checkboxes":
        return <div>{value?.join(", ")}</div>;
      case "Tags":
        return (
          <div>
            {value?.map((v, index) => (
              <Tag key={index}>{v}</Tag>
            ))}
          </div>
        );
      case "Rating":
        return <Rate disabled value={value}></Rate>;
      case "DatePicker":
      case "TimePicker":
        return <div>{value ? moment(value).format(data.format) : null}</div>;
      case "TextArea":
        return <pre>{value}</pre>;
      case "Signature":
        return <Image width={200} src={value} />;
      case "Range":
        const marks = { [data.min]: data.minLabel, [data.max]: data.maxLabel };
        const { minLabel, maxLabel, ...rangeProps } = data;
        return <Slider value={value} marks={marks} onChange={(e) => {}} {...rangeProps}></Slider>;
      case "Table":
        return <Table columns={data.columns} dataSource={value} pagination={false} bordered />;
      case "Phone":
        return <PhoneList />;
      default:
        throw new Error(`Unknown element type: ${type}`);
    }
  };
  return renderElement();
};

export default ViewElement;
