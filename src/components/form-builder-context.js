import React from "react";

const FormBuilderContext = React.createContext({
    elements: [],
    setElements: () => {},
    isDarkTheme: false
});
export default FormBuilderContext;
