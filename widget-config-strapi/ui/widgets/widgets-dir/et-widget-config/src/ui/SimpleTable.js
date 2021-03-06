import React from "react";
import moment from 'moment';
import { UNIVERSAL_DATE_FORMAT } from "../helper/Constant";

export class SimpleTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // DATA STATE
            templateType: [{'label': 'vj'}],
            selectedTemplateType: [],
        }
    }

    /**
       * Renders Button on Typehead.
       * @returns Button element
       */
    renderToggleButton = ({ isMenuShown, onClick }) => (
        <button
            type="button"
            style={{ position: "absolute", height: "100%", top: "0px", right: "0px", border: "1px solid lightgray" }}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        ><span className="fa fa-angle-down"></span></button>
    );

    onChangeTemplateId = (e) => {
        this.props.setTemplateId(e.target.value);
    }

    render() {
        return (
            <>
                <table className="table table-bordered table-datatable table-hover table-striped Contents__table-element">
                    <thead>
                        <tr>
                            {Object.keys(contentAttribute).map((item, idx) => <th key={idx}>{contentAttribute[item]}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.selectedContent.length > 0 && (
                                this.props.selectedContent.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item[Object.keys(item)[1]]}</td>
                                            <td>{`${item.createdBy.firstname} ${item.createdBy.lastname}`}</td>
                                            <td>{moment(new Date(item.updatedAt)).format(UNIVERSAL_DATE_FORMAT)}</td>
                                            <td>{moment(new Date(item.publishedAt)).format(UNIVERSAL_DATE_FORMAT)}</td>
                                            <td>
                                                <select name="modelId" className="form-control" onChange={this.onChangeTemplateId}>
                                                    <option value="1">Select Template
                                                    </option>
                                                    {this.props.templateList.map((el) => {
                                                        return <option key={el.id} value={el.id}>{el.templateName}</option>;
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        }
                    </tbody>
                </table>
            </>
        );

    }
}


const contentAttribute = {
    Title: "Name",
    createdAt: "Created by",
    updatedAt: "Last edited",
    createDate: "Created date",
    selectDefaultTemplate: "Select default template *"
    // restirctions: "Restrictions"
}