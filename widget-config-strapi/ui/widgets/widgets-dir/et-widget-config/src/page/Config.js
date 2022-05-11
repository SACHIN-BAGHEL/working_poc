import React, { Component } from 'react'
import {
    Grid,
    Row,
    Col,
    Button
} from 'patternfly-react';
import MockModalManager from '../ui/MockModalManager';
import { SimpleTable } from '../ui/SimpleTable';
import { getCollectionTypes, getTemplate } from '../api/Api';
import { Link } from 'react-router-dom';
import { BTN_ADD_NEW_CONTENT } from '../helper/Constant';
const strapiDomain = `${process.env.REACT_APP_STRAPI_TARGET_URL}`;

export default class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: [],
            name: null,
            nameTwo: null,
            collectionTypes: [],
            selectedContentId: 0,
            selectedTemplateId: 'default',
            templateList: []
        };
        this.handleAddNewContent = this.handleAddNewContent.bind(this);
    }

    onChangeTemplateId = (event) => {
        this.setState({ selectedTemplateId: event.target.value })
    }

    setSelectedContent = (selectedContentArr, selectedContenttype) => {
        this.setState({ selectedContent: selectedContentArr })
        this.setState({ name: selectedContentArr })
        this.setState({ nameTwo: encodeURIComponent(JSON.stringify(selectedContentArr)) })
        this.setState({ selectedContentId: selectedContentArr[0].id })
    }

    handleTypeaheadChangeContentType = selected => {
        let selectedContentType = selected.map(option => option.label);
        this.setState({ templateList: selectedContentType });
    };

    componentDidMount = async () => {
        let contentTypes = await getCollectionTypes();
        contentTypes = contentTypes.data.filter(obj => {
            return obj && (obj.uid && obj.uid.startsWith("api::")) && obj.isDisplayed;
        });
        const contentTypeRefine = [];
        contentTypes.length && contentTypes.forEach(element => {
            contentTypeRefine.push({ label: element.info.pluralName })
        });
        let { data: templatesList } = await getTemplate();
        this.setState({ templateList: templatesList, collectionTypes: templatesList })
    }

     /**
     * Navigate to Strapi dashboard/login page in a new tab on browser
     */
      handleAddNewContent = () => {
        let strapiContentManagerUrl = `${strapiDomain}/admin/content-manager`;
        var newWindow = window.open(strapiContentManagerUrl, '_blank');
        if(newWindow) {
            newWindow.focus();
        }
    }

    render() {
        return (
            <form className="form-horizontal SingleContentConfigForm well">
                <Row>
                    <Col xs={12}>
                        <div>
                            <div>
                                <span className="icon fa fa-puzzle-piece" title="Widget" />
                                <h5 className="SingleContentConfigFormBody__widgetTitle">Content</h5>
                                <div className="SectionTitle SectionTitle__non-collapsable" role="button">
                                    <span>Info</span>
                                </div>
                                <div className="row">
                                    <Col xs={6}>
                                        <h3 className="SingleContentConfigFormBody__contentTitle">
                                            Content: -
                                        </h3>
                                    </Col>
                                    <Col xs={6} className="SingleContentConfigFormBody__addButtons">
                                        <Link to="/configpage">
                                            <Button bsStyle="primary">
                                                {this.props.selectedContent.length ? 'Edit' : 'Add existing'} content
                                            </Button>
                                        </Link>
                                        <Button className="AddContentTypeFormBody__save--btn" bsStyle="primary" onClick={this.handleAddNewContent}>
                                            {BTN_ADD_NEW_CONTENT}
                                        </Button>
                                    </Col>
                                </div>
                                <MockModalManager rightSide={false} setSelectedContent={this.setSelectedContent} />
                                <div style={{ marginTop: "1rem" }}></div>
                                <SimpleTable setTemplateId={this.props.setTemplateId} templateList={this.state.templateList} content={this.state.selectedContent} selectedContent={this.props.selectedContent} />
                                {/* {
                                    this.state.selectedContentId != 0 &&
                                    <div style={{ marginTop: "1rem" }}>
                                        <select name="modelId" className="form-control" onChange={this.onChangeTemplateId}>
                                            <option value="default">Default
                                            </option>
                                            {this.state.templatesList.map((el, idx) => {
                                                if (el.collectiontype.toLowerCase() === this.state.name[0].Type.toLowerCase()) {
                                                    return <option key={idx} value={el.code}>{el.templatename}</option>;
                                                }
                                            })}
                                        </select>
                                    </div>
                                } */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }
}
