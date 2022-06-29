import React from "react";
import { Modal, Upload } from "antd";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadS3 = ({
  action,
  value,
  onChange,
  children,
  listType,
  onPreview,
  multiple = true,
  ...props
}) => {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  const changeHandler = async ({ fileList }) => {
    let res = fileList.map((file) => ({
      uid: file.uid,
      name: file.name,
      status: file.status,
      url: file.url ? file.url : file.response?.url,
    }));
    //If url doesn't return, then set as base64 string
    for (let i = 0; i < res.length; i++) {
      if (!res[i]?.url) {
        res[i]["url"] = await getBase64(fileList[i].originFileObj);
      }
    }
    onChange?.(res);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  console.log("rendering");

  return (
    <>
      <Upload
        action={action}
        onChange={changeHandler}
        listType={listType}
        multiple={multiple}
        fileList={value ? value : null}
        onPreview={onPreview ? onPreview : listType === "picture-card" ? handlePreview : null}
        {...props}
      >
        {children ? (
          children
        ) : (
          <div>
            Click or Drag <br />
            file
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={(e) => setPreviewVisible(false)}
      >
        <img alt={previewTitle} style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadS3;
