import React, { useEffect, useRef, useState } from 'react';
import { getContentById, getTemplate, getTemplateById } from './api/Api';
import TemplateComponent from './helper/TemplateComponent';
import axios from 'axios';
import './app.css';

const domain = 'http://localhost:1337'

function App({ name, nameTwo, templateId, contentId }) {
    
    console.log('NAME, NAMETWO, TEMPLATEID, CONTENTID -1', name, nameTwo, templateId, contentId);
    if (!name) {
        name = 'test data transfer';
    }

    if (!nameTwo) {
        nameTwo = nameTwo = '[{"name":"customer 1","email":"customer1@entando.com","address":"San Jose, CA","createdAt":"2022-03-14T18:41:51.579Z","updatedAt":"2022-03-14T18:49:55.562Z","publishedAt":"2022-03-14T18:49:55.559Z","id":1,"selected":true}]';
    }
    const nameTwoArr = JSON.parse(decodeURIComponent(nameTwo));
    const dataNameTwo = JSON.parse(decodeURIComponent(nameTwo))[0];

    if (!templateId) {
        templateId = '9';
    }

    if (!contentId) {
        contentId = 'test contentId';
    }
    console.log('NAME, NAMETWO, TEMPLATEID, CONTENTID static data - ', name, nameTwo, templateId, contentId);


    const [css] = useState(
        `#header {
          background:red;
          padding:10px;
        }`
    ); // compiled scss

    const [html, setHtml] = useState(`
      <div id="wrapper">
        <h1 className="title">{{name}}</h1>
      </div>
      `); // template

    const [data, setData] = useState({
        name: "Static",
        bold: function () {
            return function (text, render) {
                return;
            };
        },
        bannerType: "wideBanner"
    })

    useEffect(() => {
        (async () => {
            const dataTemplateId = await getTemplateById(48);
            const dataContentById = await getContentById();
            console.log('dataTemplateId', dataTemplateId);
            console.log('dataContentById', dataContentById);
            const { data } = await getTemplate('code', templateId);
            const { data: strapiData } = await axios.get(`${domain}/api/projects?populate=img`);
            console.log('core Data', strapiData.data);
            console.log("STRAPIDATA", strapiData.data[0].attributes);
            console.log('just for now', data);
            const hbr = `${data[0].contentshape}`;
            console.log("HBR",hbr)
            setHtml(hbr);
            const imgPath = `${domain}${strapiData.data[0].attributes.img.data.attributes.url}`;
            console.log(domain+strapiData.data[0].attributes.img.data.attributes.url)
            setData({content: {...strapiData.data[0].attributes, img: imgPath}})
        })()
    }, [])

    return (
        <>
            <div>
                <TemplateComponent css={css} template={html} data={data} />
            </div>
            <hr></hr>
            <table style={{ backgroundColor: "#FFFFCC", borderCollapse: "collapse", border: "1px solid #FFCC00", color: "#000000", width: "100%", padding: "10px" }} cellPadding="3" cellSpacing="3" className="table table-bordered table-datatable table-hover table-striped Contents__table-element">
                <thead>
                    <tr>
                        {Object.keys(dataNameTwo).map((item, idx) => <th key={idx}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(dataNameTwo) && Object.keys(dataNameTwo).map((item, idx) => {
                            if (dataNameTwo.hasOwnProperty(item)) return <td key={idx}>{dataNameTwo[item]}</td>
                        })}
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            {
                nameTwoArr && nameTwoArr.map(el => {
                    return (
                        <div style={{ boxShadow: "3px 12px 14px 0px #838383", height: "25rem", width: "20rem" }} key={el.id}>
                            <div className="cardHeader" style={{ boxShadow: "inset 1px -1px 20px 6px #aeced2", borderBottom: "1px solid black" }}>
                                <div style={{ padding: "1rem" }}>
                                    <div><strong>ID #: {el.id}</strong></div>
                                    <div><strong>Name: </strong>{el.name}{el.version}</div>
                                </div>
                            </div>
                            <div style={{ boxShadow: "rgb(210 174 174) 1px -1px 20px 6px inset" }}>
                                <div style={{ padding: "1rem" }}><div><strong>Email: </strong>{el.email}</div></div>
                            </div>
                            <div style={{ boxShadow: "rgb(210 174 174) 1px -1px 20px 6px inset" }}>
                                <div style={{ padding: "1rem" }}><div><strong>Address: </strong>{el.address}</div></div>
                            </div>
                            <div style={{ boxShadow: "rgb(210 174 174) 1px -1px 20px 6px inset" }}>
                                <div style={{ padding: "1rem" }}><div><strong>Created at: </strong>{el.createdAt}</div></div>
                            </div>
                            <div style={{ boxShadow: "rgb(210 174 174) 1px -1px 20px 6px inset" }}>
                                <div style={{ padding: "1rem" }}><div><strong>updated at: </strong>{el.updatedAt}</div></div>
                            </div>
                            <div style={{ boxShadow: "rgb(210 174 174) 1px -1px 20px 6px inset" }}>
                                <div style={{ padding: "1rem" }}><div><strong>Published at: </strong>{el.publishedAt}</div></div>
                            </div>

                        </div>
                    )
                })
            }
        </>
    );
}

export default App;
