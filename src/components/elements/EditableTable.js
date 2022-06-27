import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import PropTypes from "prop-types";

const EditableTable = ({ value, onChange, columns = [], noOfRows, ...props }) => {
  const [dataSource, setDataSource] = useState(value ? value : []);
  const [columnsState, setColumnsState] = useState([]);

  useEffect(() => {
    setDataSource(value ? value : []);
  }, [value]);

  useEffect(() => {}, []);

  const handleCellChange = (e, dataIndex) => {
    const {
      target: { name, value },
    } = e;
    const newData = [...dataSource];
    const index = name;

    const row = newData[index];

    if (index > -1) {
      const item = { [dataIndex]: value };
      newData.splice(index, 1, { ...row, ...item });
    } else {
      newData.push(row);
    }

    onChange(newData);
    // setDataSource(newData);
    console.log("newData", newData, "dataSource", dataSource);
  };

  const CellInput = ({ value, ...props }) => (
    <Input
      size="small"
      name={props.index}
      value={value}
      onChange={(e) => handleCellChange(e, props.dataIndex)}
    />
  );

  useEffect(() => {
    setColumnsState(
      columns.map((col) => ({
        ...col,
        editable: true,
        dataIndex: col.title.toLowerCase().replace(/\s/g, ""),
        render: (text, record, index) => (
          <CellInput
            value={text}
            index={index}
            dataIndex={col.title.toLowerCase().replace(/\s/g, "")}
          />
        ),
      }))
    );
  }, [columns]);

  useEffect(() => {
    if (noOfRows && columnsState.length) {
      let defaultRows = Array(noOfRows).fill(
        columnsState.reduce((acc, cur) => ({ ...acc, [cur.dataIndex]: "" }), {})
      );
      setDataSource(defaultRows);
    }
  }, [noOfRows, columnsState]);

  const onEditableTableEnd = (e) => {
    onChange?.();
  };
  if (dataSource.length) return <Table columns={columnsState} dataSource={dataSource} />;
  else return <div>No data</div>;
};

EditableTable.defaultProps = {
  width: 300,
  height: 150,
};

export default EditableTable;
