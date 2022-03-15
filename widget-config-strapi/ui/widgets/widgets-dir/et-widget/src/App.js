import React from 'react';

function App({name, nameTwo}) {
    if (!nameTwo)
        nameTwo = '[{"name":"customer 1","email":"customer1@entando.com","address":"San Jose, CA","createdAt":"2022-03-14T18:41:51.579Z","updatedAt":"2022-03-14T18:49:55.562Z","publishedAt":"2022-03-14T18:49:55.559Z","id":1,"selected":true}]'
    const nameTwoArr = JSON.parse(decodeURIComponent(nameTwo));
    const data = JSON.parse(decodeURIComponent(nameTwo))[0];
    // data = data[0];
    console.log('received ', data);
    data.hasOwnProperty('name')
    data.hasOwnProperty('email')
    data.hasOwnProperty('address')

    return (
        <>
            <div>
                <header>
                    <p>
                        Hello, {name}!
                    </p>
                </header>
            </div>
            <hr></hr>
            <table style={{ backgroundColor: "#FFFFCC", borderCollapse: "collapse", border: "1px solid #FFCC00", color: "#000000", width: "100%" }} cellpadding="3" cellspacing="3" className="table table-bordered table-datatable table-hover table-striped Contents__table-element">
                <thead>
                    <tr>
                        {Object.keys(data).map((item, idx) => <th key={idx}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(data) && Object.keys(data).map((item, idx) => {
                            if (data.hasOwnProperty(item)) return <td key={idx}>{data[item]}</td>
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
