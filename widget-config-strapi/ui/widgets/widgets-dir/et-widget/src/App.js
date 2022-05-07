import React, { useEffect, useRef, useState } from 'react';
import { getContentById, getTemplateById } from './api/Api';
var velocityjs = require("velocityjs");
import './app.css';

const domain = process.env.REACT_APP_STRAPI_API_URL;

function App({ name, nameTwo, templateId, contentId }) {
    const [templateData, setTemplateData] = useState(null);
    const [contentData, setContentData] = useState(null);
    const [htmlCode, setHtmlCode] = useState(null);

    useEffect(async () => {
        const getTemplate = await getTemplateById(templateId ? templateId : 48);
        const getContent = await getContentById('banner', 1);
        setTemplateData(getTemplate);
        setContentData(getContent)

        // TODO: VELOCITY START

        // TODO: for regex htmlCode.replace('/') 
        // var s = '<div id="myDiv"></div>';
        // var temp = document.createElement('div');
        // temp.innerHTML = htmlCode;
        // var htmlObject = temp.firstChild;
        // htmlObject.querySelectorAll('img').forEach(
        //     (el) => {
        //         console.log('IMG', el);
        //         // if (el.src.startsWith('$')) {
        //             let templink = el.src
        //             el.src = `${templink}`
        //         // }
        //     }
        // );
        if (getContent && getTemplate) {
            const veloResult = velocityjs.render(getTemplate.contentShape, getContent);
            setHtmlCode(veloResult);
        }

        // TODO: VELOCITY END

    }, [])
    return (
        <>  
            {
                htmlCode ?
                    <div dangerouslySetInnerHTML={{
                        __html: htmlCode
                    }}>
                    </div> : <h1>You Fail</h1>
            }
        </>
    );
}

export default App;
