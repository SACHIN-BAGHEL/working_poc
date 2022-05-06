import React, { useEffect, useRef, useState } from 'react';
import { getContentById, getTemplateById } from './api/Api';
import './app.css';

const domain = 'http://localhost:1337'

function App({ name, nameTwo, templateId, contentId }) {
    const [templateData, setTemplateData] = useState(null);
    const [contentData, setContentData] = useState(null);

    console.log(name, nameTwo, templateId, contentId);

    useEffect(async () => {
        const getTemplate = await getTemplateById(templateId ? templateId : 48);
        const getContent = await getContentById('banner', 1);
        setTemplateData(getTemplate);
        setContentData(getContent)
    }, [])

    return (
        <>
            <div>{templateData ? JSON.stringify(templateData) : 'Loading OR Check Network'}</div>
            <div>{templateData ? JSON.stringify(contentData) : 'Loading OR Check Network'}</div>
        </>
    );
}

export default App;
