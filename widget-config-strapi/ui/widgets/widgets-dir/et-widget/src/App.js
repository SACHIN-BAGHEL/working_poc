import React, { useEffect, useRef, useState } from 'react';
import { getTemplate } from './api/Api';
import TemplateComponent from './helper/TemplateComponent';
import axios from 'axios';


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
        templateId = '1002';
    }

    if (!contentId) {
        contentId = 'test contentId';
    }
    console.log('NAME, NAMETWO, TEMPLATEID, CONTENTID static data - ', name, nameTwo, templateId, contentId);


    const [css] = useState(
        `#wrapper {
          background:red;
          padding:10px;
        }`
    ); // compiled scss

    const [html, setHtml] = useState(`
      <div id="wrapper">
        <h1 class="title">{{name}}</h1>
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
            const { data } = await getTemplate('code', templateId);
            const { data: strapiData } = await axios.get('http://localhost:1337/api/projects');
            console.log("STRAPIDATA", strapiData.data[0].attributes);
            const hbr = `${data[0].contentshape}`;
            setHtml(hbr);
            setData(strapiData.data[0].attributes)
        })()
    }, [])

    return (
        <>
            <div>
                <TemplateComponent css={css} template={html} data={data} />
            </div>
            <hr></hr>
            <table style={{ backgroundColor: "#FFFFCC", borderCollapse: "collapse", border: "1px solid #FFCC00", color: "#000000", width: "100%", padding: "10px" }} cellpadding="3" cellspacing="3" className="table table-bordered table-datatable table-hover table-striped Contents__table-element">
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
