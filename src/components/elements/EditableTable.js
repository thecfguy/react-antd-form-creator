import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import { InputTypes } from "../appConstants";
import CustomInput from "./common/CustomInput";

const EditableCell = ({ title, width, type, dataIndex, index, isRequired = false, record, ...restProps }) => {
    return (
        <td {...restProps} style={width ? { width: width + "px" } : {}}>
            <Form.Item
                name={[index, dataIndex]}
                style={{ margin: 0 }}
                rules={[{ required: isRequired, message: `This field is required` }]}
            >
                <CustomInput type={type} style={{ width: "100%" }} />
            </Form.Item>
        </td>
    );
};
const EditableTable = (props) => {
    const { element, autoAddLastRow, value, onChange, columns = [], noOfRows, onAnyChange } = props;
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
                    let newArray = value.slice(0, noOfRows);
                    onChange(newArray);
                    setDataSource(newArray);
                }
            }
        }
    }, [noOfRows]);

    function getRequiredStatus(col, index) {
        if (autoAddLastRow) {
            if (index === value?.length - 1) {
                return false;
            }
        }
        return col.isRequired;
    }

    //to set columnsState when we have columns changes
    useEffect(() => {
        if (columns?.length) {
            setColumnsState(
                columns.map((col) => ({
                    ...col,
                    width: parseInt(col?.width) > 0 ? parseInt(col.width) : null,
                    onCell: (record, index) => ({
                        record,
                        editable: true,
                        isRequired: getRequiredStatus(col, index),
                        type: col.inputType,
                        dataIndex: col.title.toLowerCase().replace(/\s/g, ""),
                        index: index,
                        title: col.title
                    })
                }))
            );
        }
    }, [columns, value]);

    //add row automatically
    useEffect(() => {
        if (value?.length && autoAddLastRow) {
            let lastRow = value[value.length - 1];

            let isLastRowHasValues = Object.values(lastRow).every((val) => val === null || val === "");

            if (!isLastRowHasValues) {
                let newArray = [
                    ...value,
                    ...Array(1).fill(columns.reduce((acc, cur) => ({ ...acc, [getDataIndex(cur)]: "" }), {}))
                ];
                let newElement = { ...element, noOfRows: newArray.length };

                onAnyChange?.(newElement);
                onChange(newArray);
                setDataSource(newArray);
            }
        }
    }, [value]);

    const components = {
        body: {
            cell: EditableCell
        }
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
                        rowKey={(record) => record.key}
                        columns={columnsState}
                        pagination={false}
                    />
                );
            }}
        </Form.List>
    );
};

export default EditableTable;
