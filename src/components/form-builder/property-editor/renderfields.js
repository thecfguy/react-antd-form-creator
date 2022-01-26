import React from 'react';
import { FormElement } from '../../elements';
import Options from './options';
import Rules from './rules';

const camel2title = (camelCase) => {
    if (Array.isArray(camelCase))
        camelCase = camelCase[camelCase.length - 1];
    if (typeof camelCase === "string")
        return camelCase
            .replace(/([A-Z])/g, (match) => ` ${match}`)
            .replace(/^./, (match) => match.toUpperCase())
            .trim()
    else
        return camelCase;
};


const renderField = (name, value) => {
    let type = "TextArea";
    let options = [];
    switch (typeof value) {
        case "boolean":
            type = "RadioButtons";
            options = [{ label: "Yes", value: true }, { label: "No", value: false }];
            return <FormElement key={name} element={{ field_name: name, options: options, label: camel2title(name), type: type }} />
        case "string":
            if (name === "content")
                type = "TextArea";
            else
                type = "TextInput";
            return <FormElement element={{ field_name: name, options: options, label: camel2title(name), type: type }} />
        case "number":
            type = "NumberInput";
            return <FormElement key={name} element={{ field_name: name, options: options, label: camel2title(name), type: type }} />
        case "object":
            if (name === 'options') {
                return (<Options key={name} name={["options"]}></Options>)
            }
            if (name === 'rules') {
                return (<Rules key={name} name={["rules"]} value={value}></Rules>)
            }
            break;
        default:
            type = "TextArea";
            return <FormElement key={name} element={{ field_name: name, options: options, label: camel2title(name), type: type }} />
    }
}

export { renderField };