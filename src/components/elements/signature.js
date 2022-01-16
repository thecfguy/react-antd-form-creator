import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import SignaturePad from 'react-signature-canvas'

const Signature = ({ value, onChange }) => {

    const signRef = useRef({})

    useEffect(() => {
        if (value && signRef) {
            signRef.current.clear();
            signRef.current.fromDataURL(value);
        }
    }, []);

    const clear = () => {
        signRef.current.clear();
        onChange?.(null);
    }

    const onSignatureEnd = (e) => {
        onChange?.(signRef.current.toDataURL('image/png'))
    }

    return (
        <div style={{
            width: "300px",
            height: "150px",
            border: "1px solid #aaa",
            borderRadius: "10px",
            position: "relative"
        }}>
            <SignaturePad ref={signRef} onEnd={(e) => { onSignatureEnd(e) }}
                canvasProps={{ width: 300, height: 150 }}
            >
            </SignaturePad>
            <Button type="text" onClick={clear} style={{ position: "absolute", right: 0, bottom: 0 }}><i className='fa fa-trash'></i></Button>
        </div>
    );
};

export default Signature;