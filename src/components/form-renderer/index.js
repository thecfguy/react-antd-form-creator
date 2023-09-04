import React from "react";
import { FormElement } from "../elements";
const FormRenderer = ({ elements, form, ...props }) => {
    return (
        <>
            {elements.map((element) => {
                return <FormElement key={element.id} element={element} />;
            })}
        </>
    );
};

export default FormRenderer;
