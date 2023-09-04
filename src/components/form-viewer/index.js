import React from "react";
import { ViewElement } from "../elements";
import { Descriptions } from "antd";
import PropTypes from "prop-types";

const FormViewer = ({ elements, values, descriptionProps, descriptionItemProps, ...props }) => {
    const displayObject = elements.reduce((acc, element, index) => {
        if (
            element.type === "Header" ||
            element.type === "Paragraph" ||
            element.type === "LineBreak" ||
            element.type === "Image"
        )
            acc.push(element);
        else {
            const val = acc[acc.length - 1];
            if (Array.isArray(val)) {
                val.push(element);
                acc[acc.length - 1] = val;
            } else {
                acc.push([element]);
            }
        }
        return acc;
    }, []);

    const displayElement = () => {
        return displayObject.map((element) => {
            if (Array.isArray(element)) {
                return (
                    <Descriptions {...descriptionProps}>
                        {element.map((e, index) => {
                            const value = values?.[e.field_name];
                            return (
                                <Descriptions.Item key={e.id} label={e.label} {...descriptionItemProps}>
                                    <ViewElement key={e.id} element={e} value={value} />
                                </Descriptions.Item>
                            );
                        })}
                    </Descriptions>
                );
            } else {
                const value = values?.[element.field_name];
                return <ViewElement key={element.id} element={element} value={value} />;
            }
        });
    };
    return displayElement();
};

FormViewer.defaultProps = {
    descriptionProps: {
        bordered: true,
        size: "small",
        column: { sm: 1, xs: 1 }
    },
    descriptionItemProps: {
        labelStyle: { width: "20%" }
    }
};
FormViewer.propTypes = {
    elements: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    descriptionProps: PropTypes.object,
    descriptionItemProps: PropTypes.object
};

export default FormViewer;
