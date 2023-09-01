import React, { useEffect } from "react";
import { Form, Button, Row, Col } from "antd";
import "@fortawesome/fontawesome-free/css/all.css";
import { FormRenderer } from "../components";
import dayjs from "dayjs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "FormRenderer",
    component: FormRenderer
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(args.values);
    });
    const onFormSubmit = (values) => {
        console.log(JSON.stringify(values));
    };
    return (
        <Row>
            <Col span={2}></Col>
            <Col span={20}>
                <Form
                    form={form}
                    onFinish={onFormSubmit}
                    labelAlign="left"
                    colon
                    requiredMark
                    labelCol={{ span: 3 }}
                    onSubmit
                >
                    <FormRenderer elements={args.elements}></FormRenderer>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col span={2}></Col>
        </Row>
    );
};

export const RenderForm = Template.bind({});
RenderForm.args = {
    elements: [
        {
            dropEffect: "move",
            content: "Header",
            id: "b8d264c4-ea10-4dd0-990e-6ad4ca090c42",
            type: "Header",
            field_name: "field_de8ce171-8877-4f70-9173-57e6f2668a9d"
        },
        {
            dropEffect: "move",
            content: "Your text",
            id: "b664c762-9673-4142-925f-e761fc3b9496",
            type: "Paragraph",
            field_name: "field_1e8fe106-5cb1-4a59-814b-c19e38732c68"
        },
        {
            dropEffect: "move",
            field_name: "field_a840e936-90f7-46df-a58b-f9a696de9155",
            src: "",
            alt: "Update URL",
            id: "f7c2092c-77af-48b6-ac74-b655efafbedf",
            type: "Image"
        },
        {
            dropEffect: "move",
            field_name: "field_f9078487-2a9f-48a7-bde6-c55e649fa5a7",
            label: "Select",
            options: [
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
                { label: "Option 3", value: "Option 3" }
            ],
            rules: [{ required: true, message: "Select value from list" }],
            id: "4bf1b0ec-d615-43da-b332-2802edc1f41c",
            type: "Dropdown"
        },
        {
            dropEffect: "move",
            field_name: "field_7f4f1c0d-9cc0-4d73-b467-2cc1d04b0157",
            label: "Tag",
            options: [
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
                { label: "Option 3", value: "Option 3" }
            ],
            rules: [{ required: true, message: "Select atleast one tag" }],
            id: "87704d1d-1e1b-41ad-b043-2d5fb9926682",
            type: "Tags"
        },
        {
            dropEffect: "move",
            field_name: "field_2c3ddee3-85f4-4548-a098-4807df842ff2",
            label: "Checkbox",
            options: [
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
                { label: "Option 3", value: "Option 3" }
            ],
            rules: [{ required: true, message: "Select atleast one option" }],
            id: "f256c57b-a5ee-40d1-933c-ec446deb4182",
            type: "Checkboxes"
        },
        {
            dropEffect: "move",
            field_name: "field_326ec855-c0fb-4eb8-b45f-67bf344b14d2",
            label: "Options",
            options: [
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
                { label: "Option 3", value: "Option 3" }
            ],
            rules: [{ required: true, message: "Choose any one option" }],
            id: "ed449311-46fe-431f-961d-56bac097e10a",
            type: "RadioButtons"
        },
        {
            dropEffect: "move",
            field_name: "field_d3693f24-c8ed-4330-85d3-14e83a366062",
            label: "Label",
            rules: [{ required: true, message: "Please enter value" }],
            id: "4f2db38c-e54f-4701-bf12-217f674a5436",
            type: "TextInput"
        },
        {
            dropEffect: "move",
            content: "Divider",
            plain: false,
            dashed: false,
            id: "c5bfe33f-60c9-4e9b-b95b-55ebddcf13ce",
            type: "LineBreak",
            field_name: "field_17c2eb42-2775-4c6f-a9d6-6b3bb7e93293"
        },
        {
            dropEffect: "move",
            field_name: "field_9535faf8-7812-4251-980f-6692e2767395",
            label: "Label",
            rules: [{ required: true, message: "Please enter value" }],
            id: "d115c616-b47d-468d-987d-eeade658577f",
            type: "TextArea"
        },
        {
            dropEffect: "move",
            field_name: "field_a1f071c0-fd48-4737-8a5e-57b60184bce1",
            label: "Date",
            allowClear: true,
            format: "MM/DD/YYYY",
            rules: [{ required: true, message: "Please select date" }],
            id: "8942bcdb-115c-4c72-9f87-6cf3552d327f",
            type: "DatePicker"
        },
        {
            dropEffect: "move",
            field_name: "field_bd16e659-d4bd-4d8f-affb-447df33e00ad",
            label: "Rate",
            allowClear: true,
            allowHalf: false,
            count: 5,
            rules: [{ required: true, message: "Please rate" }],
            id: "2e41f307-190a-4b53-8d0e-d59aaf500baa",
            type: "Rating"
        },
        {
            dropEffect: "move",
            field_name: "field_7650803a-63dd-4c30-a4f9-8562d6876f4f",
            label: "Label",
            rules: [{ required: true, message: "Please enter value" }],
            id: "2cc3f543-7fb4-4f47-a09f-e31f32c0ec5e",
            type: "NumberInput"
        },
        {
            dropEffect: "move",
            field_name: "field_eb7ed5e4-74b5-497e-b504-f268355b39a2",
            label: "Time",
            format: "hh:mm a",
            allowClear: true,
            hourStep: 1,
            minuteStep: 1,
            rules: [{ required: true, message: "Please select time" }],
            id: "004754f3-0642-4328-8210-c74f6a8610d4",
            type: "TimePicker"
        },
        {
            dropEffect: "move",
            field_name: "field_85d98c48-61f7-4e4f-9197-82ba3dde45bf",
            label: "Signature",
            width: 400,
            height: 100,
            rules: [{ required: true, message: "Please sing form" }],
            id: "cc4b711b-cab5-438c-831f-a5dceef15832",
            type: "Signature"
        },
        {
            dropEffect: "move",
            field_name: "field_26d97f40-6440-42e9-8384-ca71a7ebe792",
            label: "Photo",
            multiple: true,
            accept: "image/png, image/jpeg",
            rules: [{ required: true, message: "Upload atleast one photo" }],
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            headers: { authorization: "authorization-text" },
            id: "dc64347f-a648-4476-8ea4-7171b2975df6",
            type: "Photo"
        },
        {
            dropEffect: "move",
            field_name: "field_b31b3009-0da3-4dc5-ad59-a1bcaad8bc31",
            label: "Attach File",
            static: true,
            maxCount: 5,
            multiple: true,
            rules: [{ required: true, message: "Upload at least one file" }],
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            headers: { authorization: "authorization-text" },
            id: "f09bdb86-2753-48ef-b576-dd13c39bcbbc",
            type: "File"
        },
        {
            dropEffect: "move",
            field_name: "field_42f55a13-0b07-46b3-a76b-6e4d0a90baa5",
            label: "Label",
            step: 1,
            min: 1,
            max: 5,
            minLabel: "Easy",
            maxLabel: "Difficult",
            id: "91f785ca-6927-4445-b742-bef14a56f755",
            type: "Range"
        },

        {
            dropEffect: "move",
            field_name: "field_44f55a13-0b07-46b3-a76b-6e4d0a90baa5",
            label: "Table",
            columns: [
                {
                    title: "Column 1",
                    dataIndex: "column1",
                    key: "column1",
                    inputType: "Text",
                    isRequired: true
                },
                { title: "Column 2", dataIndex: "column2", key: "column2", inputType: "Text" },
                { title: "Column 3", dataIndex: "column3", key: "column3", inputType: "Text" }
            ],
            noOfRows: 3,
            autoAddLastRow: false,
            id: "91f785ca-6927-4445-b742-bef14a56f755",
            type: "Table"
        }
    ],
    values: {
        "field_f9078487-2a9f-48a7-bde6-c55e649fa5a7": "Option 1",
        "field_7f4f1c0d-9cc0-4d73-b467-2cc1d04b0157": ["Option 2", "Option 3"],
        "field_2c3ddee3-85f4-4548-a098-4807df842ff2": ["Option 1", "Option 2"],
        "field_326ec855-c0fb-4eb8-b45f-67bf344b14d2": "Option 2",
        "field_d3693f24-c8ed-4330-85d3-14e83a366062": "This is text ",
        "field_9535faf8-7812-4251-980f-6692e2767395": "This is multiline text\nThis is multiline text",
        "field_a1f071c0-fd48-4737-8a5e-57b60184bce1": dayjs("2022-01-16T06:51:32.709Z"),
        "field_bd16e659-d4bd-4d8f-affb-447df33e00ad": 4,
        "field_7650803a-63dd-4c30-a4f9-8562d6876f4f": 12,
        "field_eb7ed5e4-74b5-497e-b504-f268355b39a2": dayjs("2022-01-16T06:51:38.721Z"),
        "field_85d98c48-61f7-4e4f-9197-82ba3dde45bf":
            "data:image/png;base64,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",
        "field_26d97f40-6440-42e9-8384-ca71a7ebe792": [
            {
                uid: "rc-upload-1642315470027-18",
                name: "placeholder.png",
                status: "done",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                uid: "rc-upload-1642315470027-19",
                name: "th_3.27gb-19Min.png",
                status: "done",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
        ],
        "field_b31b3009-0da3-4dc5-ad59-a1bcaad8bc31": [
            {
                uid: "rc-upload-1642315470027-21",
                name: "placeholder.png",
                status: "done",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
        ],

        "field_42f55a13-0b07-46b3-a76b-6e4d0a90baa5": 2,
        "field_44f55a13-0b07-46b3-a76b-6e4d0a90baa5": [
            { column1: "test", column2: "test", column3: "test" },
            { column1: "test", column2: "test", column3: "test" },
            { column1: "test", column2: "test", column3: "test" }
        ]
    }
};

// export const UploadS3Presigned = Template.bind({});

// UploadS3Presigned.args = {
// 	elements: [
// 		{
// 			field_name: 'field_26d97f40-6440-42e9-8384-ca71a7ebe792',
// 			label: 'Photo',
// 			multiple: true,
// 			accept: 'image/png, image/jpeg',
// 			rules: [{ required: true, message: 'Upload atleast one photo' }],
// 			action: 'https://s3.amazonaws.com/onetouch-assets-dev/',
// 			data: (file) => {
// 				let fileparts = file.name.split('.');
// 				let fileKey =
// 					'tempfiles/' + file.uid + '.' + fileparts[fileparts.length - 1];
// 				return {
// 					key: fileKey,
// 					'Content-Type': file.type,
// 					acl: 'private',
// 					'X-Amz-Credential':
// 						'AKIAZTHEIL2GY6ILBCOD/20220118/us-east-1/s3/aws4_request',
// 					policy:
// 						'eyJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJvbmV0b3VjaC1hc3NldHMtZGV2In0seyJhY2wiOiJwcml2YXRlIn0seyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjoiQUVTMjU2In0seyJ4LWFtei1jcmVkZW50aWFsIjoiQUtJQVpUSEVJTDJHWTZJTEJDT0QvMjAyMjAxMTgvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMjIwMTE4VDExMDEyNVoifSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsIiJdLFsic3RhcnRzLXdpdGgiLCIka2V5IiwidGVtcGZpbGVzIl1dLCJleHBpcmF0aW9uIjoiMjAyMi0wMS0xOFQxMjowMToyNS4wMDBaIn0=',
// 					'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
// 					'X-Amz-Date': '20220118T110125Z',
// 					'x-amz-server-side-encryption': 'AES256',
// 					'X-Amz-Signature':
// 						'cf33bd2ad50e9c36708795a2ee72a854f2a492a44bc97f46f232bdd78882d118',
// 				};
// 			},
// 			id: 'dc64347f-a648-4476-8ea4-7171b2975df6',
// 			type: 'Photo',
// 		},
// 	],
// 	values: {},
// };
