import React, { Component } from 'react'
import { Button, Col, Icon, Modal, Tab, Tabs } from 'patternfly-react';
export default class ContentDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = { show: true, collectionTypes: [], mockRows: [], selectedContent: [], selectedCollectionType: null, collectionAttributes: this.props.dummyData, activeTabKey: 0 };
        this.toggleTab = this.toggleTab.bind(this);
        this.dataToShowOnModal = {};
    }

    toggleTab = (index) => {
        this.setState({ activeTabKey: index })
    }

    constructContentDetailsForModal = () => {
        if (Object.keys(this.props.contentDetailsOnModal).length && Object.keys(this.props.contentDetailsOnModal).indexOf('createdBy')) {
            this.dataToShowOnModal = { ...this.props.contentDetailsOnModal };
            const { firstname, lastname } = this.dataToShowOnModal.createdBy;
            const { firstname: updatedFname, lastname: updatedLname } = this.dataToShowOnModal.updatedBy;
            const { createdBy, updatedBy } = this.dataToShowOnModal;
            if (createdBy) this.dataToShowOnModal.createdBy = `${firstname} ${lastname}`;
            if (updatedBy) this.dataToShowOnModal.updatedBy = `${updatedFname} ${updatedLname}`;
        }
    }

    renderElementByType = (key) => {
        if (this.dataToShowOnModal[key] === null || this.dataToShowOnModal[key] === undefined) return
        if (typeof this.dataToShowOnModal[key] === 'boolean') {
            return this.dataToShowOnModal[key] + '';
        } else if (Array.isArray(this.dataToShowOnModal[key])) {
            // For MultiMedia
            if (this.dataToShowOnModal[key][0]['ext']) {
                return this.dataToShowOnModal[key].map(pic => (
                    <img src={process.env.REACT_APP_STRAPI_API_URL + pic.formats.thumbnail.url} height="50px" width="50px" alt={pic['name']} />
                ))
            } else {
                <b>Not Handle Please Check</b>
            }
        } else if (typeof this.dataToShowOnModal[key] === 'object') {
            // For SingleMedia
            if (this.dataToShowOnModal[key]['ext']) {
                if (typeof this.dataToShowOnModal[key] === 'object') {
                    return <img src={process.env.REACT_APP_STRAPI_API_URL + this.dataToShowOnModal[key].formats.thumbnail.url} width="50px" height="50px" alt={this.dataToShowOnModal[key]['name']} />
                }
            }
            return JSON.stringify(this.dataToShowOnModal[key]);
        }
        return this.dataToShowOnModal[key];
    }

    render() {
        this.constructContentDetailsForModal();
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
                        <Modal.Title>{Object.keys(this.dataToShowOnModal).length > 0 && this.dataToShowOnModal[Object.keys(this.dataToShowOnModal)[1]]}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div
                            className="CollapsibleSection__title no-padding"
                            role="button"
                            tabIndex={0}
                        >
                        </div>
                        <div>
                            <Tabs id={'id'} activeKey={this.state.activeTabKey} onSelect={this.toggleTab}>
                                <Tab eventKey={0} title="English">
                                    {Object.keys(this.dataToShowOnModal).length > 0 && Object.keys(this.dataToShowOnModal).filter(key => ignoreProps(key)).map((key, i) => {
                                        return (
                                            <div key={i} className="row" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                                                <div className="col-xs-12">
                                                    <Col xs={2}>
                                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                                                    </Col>
                                                    <Col xs={10}>
                                                        {
                                                            this.renderElementByType(key)
                                                        }
                                                    </Col>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Tab>
                                <Tab eventKey={1} title="Italiano">
                                    {Object.keys(this.dataToShowOnModal).length > 0 && Object.keys(this.dataToShowOnModal).filter(key => ignoreProps(key)).map((key, i) => {
                                        return (
                                            <div key={i} className="row" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                                                <div className="col-xs-12">
                                                    <Col xs={2}>
                                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                                                    </Col>
                                                    <Col xs={10}>
                                                        {
                                                            this.renderElementByType(key)
                                                        }
                                                    </Col>
                                                </div>
                                            </div>
                                        );
                                    })}
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

        function ignoreProps(key) {
            return !key.match("createdAt") && !key.match("updatedAt") && !key.match("publishedAt") && !key.match("createdBy") && !key.match("updatedBy") && !key.match("id");
        }
    }
}
