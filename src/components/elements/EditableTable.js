import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table } from "antd";

const EditableCell = ({ title, dataIndex, index, isRequired = false, ...restProps }) => {
  return (
    <td {...restProps}>
      <Form.Item
        name={[index, dataIndex]}
        rules={[
          { required: isRequired, message: `Please enter ${title} value at row ${index + 1}` },
        ]}
        noStyle
      >
        <Input />
      </Form.Item>
    </td>
  );
};
const EditableTable = (props) => {
  const { autoAddLastRow, value, onChange, columns = [], noOfRows } = props;
  const [dataSource, setDataSource] = useState([]);
  const [columnsState, setColumnsState] = useState([]);

  //to set first time values when value is undefined
  function getDataIndex(col) {
    return col.title.toLowerCase().replace(/\s/g, "");
  }
  //to set default dataSource when noOfRows is changed
  useEffect(() => {
    if (noOfRows && columns?.length) {
      //for first time when value is undefined
      if (!value) {
        let defaultRows = Array(noOfRows).fill(
          columns.reduce((acc, cur) => ({ ...acc, [getDataIndex(cur)]: null }), {})
        );
        onChange(defaultRows);
        setDataSource(defaultRows);
      } else {
        if (noOfRows > value.length) {
          let defaultRows = Array(noOfRows - value.length).fill(
            columns.reduce((acc, cur) => ({ ...acc, [getDataIndex(cur)]: null }), {})
          );
          let newArray = [...value, ...defaultRows];
          onChange(newArray);
          setDataSource(newArray);
        } else {
          console.log("noOfRows is less than value.length", value.length);
          let newArray = value.slice(0, noOfRows);
          onChange(newArray);
          setDataSource(newArray);
        }
      }
    }
  }, [noOfRows]);

  //to set columnsState when we have columns changes
  useEffect(() => {
    if (columns?.length) {
      setColumnsState(
        columns.map((col) => ({
          ...col,
          onCell: (record, index) => ({
            record,
            editable: true,
            isRequired: col.isRequired,
            dataIndex: col.title.toLowerCase().replace(/\s/g, ""),
            index: index,
            title: col.title,
          }),
        }))
      );
    }
  }, [columns]);

  //add row automatically
  useEffect(() => {
    if (value?.length && autoAddLastRow) {
      let lastRow = value[value.length - 1];

      let lastRowHasEmptyValue = Object.values(lastRow).some((val) => val === null || val === "");

      if (!lastRowHasEmptyValue) {
        let newArray = [
          ...value,
          ...Array(1).fill(columns.reduce((acc, cur) => ({ ...acc, [getDataIndex(cur)]: "" }), {})),
        ];
        onChange(newArray);
        setDataSource(newArray);
      }
    }
  }, [value]);

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return (
    <Form.List name={props.id}>
      {(fields) => {
        return (
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columnsState}
            pagination={false}
          />
        );
      }}
    </Form.List>
  );
};

export default EditableTable;
