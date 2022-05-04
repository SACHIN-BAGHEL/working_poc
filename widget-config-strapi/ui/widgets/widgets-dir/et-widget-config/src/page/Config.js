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
        console.log('templatesList ======== ', templatesList);
        this.setState({ templateList: templatesList, collectionTypes: templatesList })
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <div className="form-horizontal SingleContentConfigForm well">
                            <div>
                                <span className="icon fa fa-puzzle-piece" title="Widget" />
                                <h5 className="SingleContentConfigFormBody__widgetTitle">Content</h5>
                                <div
                                    className={"FormSectionTitle__inner-body"}
                                    role="button"
                                    tabIndex={0}
                                >   <legend>
                                        <span className="SectionTitle__tip">
                                            Info
                                        </span>
                                    </legend>
                                    <div className="row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                        <Col xs={6}>
                                            <h3 className="SingleContentConfigFormBody__contentTitle">
                                                Content: -
                                            </h3>
                                        </Col>
                                        <Col xs={6} className="SingleContentConfigFormBody__addButtons">
                                            <Link to="/configpage">
                                                <Button bsStyle="primary">
                                                    Add existing content
                                                </Button>
                                            </Link>
                                            <Button className="AddContentTypeFormBody__save--btn" bsStyle="primary">
                                                Add new content
                                            </Button>
                                        </Col>
                                    </div>
                                    <MockModalManager rightSide={false} setSelectedContent={this.setSelectedContent} />
                                </div>
                                <div style={{ marginTop: "1rem" }}></div>
                                <SimpleTable templateList={this.state.templateList} content={this.state.selectedContent} selectedContent={this.props.selectedContent} />
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
            </Grid>
        )
    }
}
