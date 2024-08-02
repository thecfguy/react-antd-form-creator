import React from "react";
import { FormElement } from "../elements";
import { theme as ANTDTheme, ConfigProvider, Layout } from "antd";

const FormRenderer = ({ elements, form, theme = "light", ...props }) => {
    const isDarkTheme = theme !== "dark";
    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: isDarkTheme ? ANTDTheme.darkAlgorithm : ANTDTheme.defaultAlgorithm
                }}
            >
                <Layout
                    style={{
                        padding: 24
                    }}
                >
                    {elements.map((element) => {
                        return <FormElement key={element.id} element={element} />;
                    })}
                </Layout>
            </ConfigProvider>
        </>
    );
};

export default FormRenderer;
