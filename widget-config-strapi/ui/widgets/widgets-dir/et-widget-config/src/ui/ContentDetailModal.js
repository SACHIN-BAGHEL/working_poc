import { Button, Icon, Modal, Tab, Tabs } from 'patternfly-react';
import React, { Component } from 'react';
import { renderPanelGroup } from '../helper/AccordionHelper';
export default class ContentDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            collectionTypes: [],
            mockRows: [],
            selectedContent: [],
            selectedCollectionType: null,
            collectionAttributes: this.props.dummyData,
            activeTabKey: 0,
          };
        this.dataToShowOnModal = {};
        this.toggleTab = this.toggleTab.bind(this);
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
                                    {renderPanelGroup(this.dataToShowOnModal)}
                                </Tab>
                                <Tab eventKey={1} title="Italiano">
                                    {renderPanelGroup(this.dataToShowOnModal)}
                                </Tab>
                            </Tabs>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle={'default'} className="btn-cancel" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button bsStyle={'primary'} onClick={this.close} onClick={this.props.onHide}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
