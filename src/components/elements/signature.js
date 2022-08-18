import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import SignaturePad from "react-signature-canvas";
import PropTypes from "prop-types";

const Signature = ({ value, onChange, width, height }) => {
    const signRef = useRef({});
    useEffect(() => {
        if (value && signRef && signRef.current.isEmpty()) {
            signRef.current.clear();
            signRef.current.fromDataURL(value);
        }
    }, [value]);

    const clear = () => {
        signRef.current.clear();
        onChange?.(null);
    };

    const onSignatureEnd = (e) => {
        onChange?.(signRef.current.toDataURL("image/png"));
    };

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                border: "1px solid #aaa",
                borderRadius: "10px",
                position: "relative"
            }}
        >
            <SignaturePad
                ref={signRef}
                onEnd={(e) => {
                    onSignatureEnd(e);
                }}
                canvasProps={{ width: width, height: height }}
            ></SignaturePad>
            <Button type="text" onClick={clear} style={{ position: "absolute", right: 0, bottom: 0 }}>
                <i className="fa fa-trash"></i>
            </Button>
        </div>
    );
};

Signature.defaultProps = {
    width: 300,
    height: 150
};
Signature.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};
export default Signature;
