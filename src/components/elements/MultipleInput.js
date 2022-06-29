import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import PropTypes from "prop-types";

const EditableTable = (props) => {
  const { field_name, value, onChange, columns = [], noOfRows } = props;
  // const [dataSource, setDataSource] = useState(value);
  const [columnsState, setColumnsState] = useState([]);

  useEffect(() => {
    if (!value) onChange(dataSource);
  }, [value]);

  const [dataSource, setDataSource] = useState([
    { column1: "", column2: "", column3: "" },
    { column1: "", column2: "", column3: "" },
  ]);

  const EditableCell = ({ title, editable, children, dataIndex, record, index, ...restProps }) => {
    return (
      <td {...restProps}>
        <Form.Item name={[index, dataIndex]} noStyle>
          <Input />
        </Form.Item>
      </td>
    );
  };
  useEffect(() => {
    setColumnsState(
      columns.map((col) => ({
        ...col,
        onCell: (record, index) => ({
          record,
          editable: true,
          dataIndex: col.title.toLowerCase().replace(/\s/g, ""),
          index: index,
          title: col.title,
        }),
      }))
    );
  }, [columns]);

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  if (dataSource)
    return (
      <Form.List name={field_name}>
        {(fields) => {
          return (
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columnsState}
            />
          );
        }}
      </Form.List>
    );
  else return <div>No data</div>;
};

export default EditableTable;
