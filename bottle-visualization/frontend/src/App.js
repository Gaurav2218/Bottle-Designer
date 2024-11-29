
import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import BottleCanvas from './components/BottleCanvas';

const App = () => {
    const [texture, setTexture] = useState(null);

    const handleFileUpload = (file) => {
        setTexture(URL.createObjectURL(file));
    };

    return (
        <div>
            <h1>Custom Bottle Preview</h1>
            <FileUploader onFileUpload={handleFileUpload} />
            <BottleCanvas texture={texture} />
        </div>
    );
};

export default App;
