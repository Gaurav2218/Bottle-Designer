
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFileUpload }) => {
    const [preview, setPreview] = useState(null);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));
        onFileUpload(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
        maxSize: 2 * 1024 * 1024, // 2MB
    });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {!preview ? (
                <p>Drag & drop a logo here, or click to select one</p>
            ) : (
                <img src={preview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
        </div>
    );
};

export default FileUploader;
