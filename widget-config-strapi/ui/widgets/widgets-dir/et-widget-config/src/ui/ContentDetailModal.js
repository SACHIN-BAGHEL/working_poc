import React, { Component } from 'react'
import { Button, Col, Row, Icon, Modal, Tab, Tabs } from 'patternfly-react';

export default class ContentDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = { show: true, collectionTypes: [], mockRows: [], selectedContent: [], selectedCollectionType: null, collectionAttributes: this.props.dummyData, activeTabKey: 0 };
        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab = (index) => {
        this.setState({ activeTabKey: index })
    }

    componentDidMount = () => {
    }

    close = () => {
        this.setState({ show: false })
    }

    open = async () => {
        this.setState({ show: true })
        // Commented for now..
        // let contentTypes = await getContents("Sample-about-uses");
        this.setState({ collectionAttributes: {
            "Title": "About Us",
            "Subtitle": "By integrating leading edge open source projects and extending their capabilities, Entando allows developers and operations teams to create modern UX on Kubernetes.",
            "Abstract": "Entando is an open source software company providing the leading micro frontend platform building enterprise web apps on Kubernetes. The company, founded in 2010 as an open-source system integrator, was re-founded as a product company in 2015 in response to the growing demand for tools and services to create modern online experiences. Since then, Entando has stepped into international markets. It’s headquartered in San Diego, California with R&D and sales offices in Europe, and features teams all over the world, including the United States, Italy, Brazil, South Africa, Georgia and the Philippines.\nIn 2015, Entando was named in the “Cool Vendors in Web Computing” Gartner report. In 2017, it became an official Red Hat Technology Partner, followed in 2018 by an OEM agreement with Red Hat. Also in 2018 the platform won the Digital360 Awards prize in the cloud computing category.\n",
            "createdAt": "2022-03-14T05:45:10.607Z",
            "updatedAt": "2022-05-02T07:43:44.378Z",
            "publishedAt": "2022-03-14T05:45:13.766Z",
            "Test": "Testing"
        } })
    }

    render() {
        return (
            <>
                <Modal dialogClassName="ContentsFilterModal" show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header>
                        <button
                            className="close"
                            onClick={this.props.onHide}
                            aria-hidden="true"
                            aria-label="Close"
                        >
                            <Icon type="pf" name="close" />
                        </button>
                        <Modal.Title>Sample - About Us
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div
                            className="CollapsibleSection__title no-padding"
                            // onClick={onClick}
                            // onKeyDown={handleKeyDown}
                            role="button"
                            tabIndex={0}
                        >
                            {/* {<span>{name}</span> || (
                                <FormattedMessage id={nameId} defaultMessage="Info" />
                            )} */}
                        </div>
                        <div>
                            <Tabs id={'id'} activeKey={this.state.activeTabKey} onSelect={this.toggleTab}>
                                <Tab eventKey={0} title="English">
                                    <div style={{ paddingLeft: "7rem", paddingRight: "7rem", paddingTop: "3rem", paddingBottom: "5rem", overflowY: 'auto', maxHeight: '600px', minHeight: '500px' }}>
                                        <Row>
                                            <Col lg={12}>
                                                <table style={{ borderSpacing: "0 1em", textAlign: "justify" }}>
                                                    {Object.keys(this.state.collectionAttributes).filter(key => !key.match("createdAt") && !key.match("updatedAt") && !key.match("publishedAt")).map((key, i) => (
                                                        <tr key={i} style={{ borderBottom: "1px solid #f5f5f5", padding: "1rem 0rem" }}>
                                                            <td style={{ textAlign: "center", paddingRight: "150px" }}> <label className="control-label col-xs-3" style={{ fontWeight: 'bold', fontSize: "15px" }} htmlFor="group">
                                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                            </label></td>
                                                            <td style={{ textAlign: "justify", fontSize: "15px", padding: "1rem 0rem" }}>{this.state.collectionAttributes[key]}</td>
                                                        </tr>
                                                    ))}
                                                </table>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                                <Tab eventKey={1} title="Italiano">
                                    <div style={{ paddingLeft: "7rem", paddingRight: "7rem", paddingTop: "3rem", paddingBottom: "5rem", overflowY: 'auto', maxHeight: '600px', minHeight: '500px' }}>
                                        <Row>
                                            <Col lg={12}>
                                                <table style={{ borderSpacing: "0 1em", textAlign: "justify" }}>
                                                    {Object.keys(this.state.collectionAttributes).filter(key => !key.match("createdAt") && !key.match("updatedAt") && !key.match("publishedAt")).map((key, i) => (
                                                        <tr key={i+1} style={{ borderBottom: "1px solid #f5f5f5", padding: "1rem 0rem" }}>
                                                            <td style={{ textAlign: "center", paddingRight: "150px" }}> <label className="control-label col-xs-3" style={{ fontWeight: 'bold', fontSize: "15px" }} htmlFor="group">
                                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                            </label></td>
                                                            <td style={{ textAlign: "justify", fontSize: "15px", padding: "1rem 0rem" }}>{this.state.collectionAttributes[key]}</td>
                                                        </tr>
                                                    ))}
                                                </table>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" className="btn-cancel" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button bsStyle="primary" onClick={this.close} onClick={this.props.onHide}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
