import React, { Component } from 'react';
import { Button, Col, Icon, Modal, Tab, Tabs} from 'patternfly-react';
import { PanelGroup, Panel, Row } from 'react-bootstrap';
import { STRAPI_IMAGE_EXTENSIONS, STRAPI_IMAGE_URL_KEY } from '../helper/Constant';
// import { Accordion, Card } from 'react-bootstrap';

const tempData = {
    "blankObj": {},
    "id": 1,
    "name": "Kamlesh",
    "createdAt": "2022-05-12T05:00:52.450Z",
    "updatedAt": "2022-05-12T14:30:35.916Z",
    "publishedAt": "2022-05-12T05:01:38.750Z",
    "address": {
      "id": 1,
      "permanent_address": "Bhopal",
      "temporary_address": "nagpur",
      "address_line1": {
        "id": 1,
        "postal_code": "460661",
        "street": "Village chilhati",
        "city": "Betul",
        "address": {
          "id": 1,
          "permanent_address": "Bhopal",
          "temporary_address": "nagpur",
          "address_line1": {
            "id": 1,
            "postal_code": "460661",
            "street": "Village chilhati",
            "city": "Betul"
          }
        }
      },
      "address_dynamiczone": [
        {
          "__component": "address.address-component",
          "id": 2,
          "permanent_address": "Bhopal",
          "temporary_address": "Nagpur",
          "address_line1": {
            "id": 2,
            "postal_code": "111111",
            "street": "street1",
            "city": "Mumbai"
          }
        }
      ],
      "address_dynamiczone2": [
        
      ],
      "photo": {
        "id": 1,
        "name": "WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
        "alternativeText": "WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
        "caption": "WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
        "width": 1200,
        "height": 1600,
        "formats": {
          "large": {
            "ext": ".jpeg",
            "url": "/uploads/large_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0.jpeg",
            "hash": "large_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0",
            "mime": "image/jpeg",
            "name": "large_WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
            "path": null,
            "size": 81.68,
            "width": 750,
            "height": 1000
          },
          "small": {
            "ext": ".jpeg",
            "url": "/uploads/small_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0.jpeg",
            "hash": "small_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0",
            "mime": "image/jpeg",
            "name": "small_WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
            "path": null,
            "size": 30.85,
            "width": 375,
            "height": 500
          },
          "medium": {
            "ext": ".jpeg",
            "url": "/uploads/medium_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0.jpeg",
            "hash": "medium_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0",
            "mime": "image/jpeg",
            "name": "medium_WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
            "path": null,
            "size": 54.61,
            "width": 563,
            "height": 750
          },
          "thumbnail": {
            "ext": ".jpeg",
            "url": "/uploads/thumbnail_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0.jpeg",
            "hash": "thumbnail_Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0",
            "mime": "image/jpeg",
            "name": "thumbnail_WhatsApp Image 2022-04-01 at 19.29.37 (1).jpeg",
            "path": null,
            "size": 5.27,
            "width": 117,
            "height": 156
          }
        },
        "hash": "Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "size": 132.45,
        "url": "/uploads/Whats_App_Image_2022_04_01_at_19_29_37_1_a2b9584ab0.jpeg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "createdAt": "2022-05-12T14:30:04.347Z",
        "updatedAt": "2022-05-12T14:30:04.347Z"
      },
      "gallery": [
        {
          "id": 2,
          "name": "WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
          "alternativeText": "WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
          "caption": "WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
          "width": 1200,
          "height": 1600,
          "formats": {
            "large": {
              "ext": ".jpeg",
              "url": "/uploads/large_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2.jpeg",
              "hash": "large_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2",
              "mime": "image/jpeg",
              "name": "large_WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
              "path": null,
              "size": 74.86,
              "width": 750,
              "height": 1000
            },
            "small": {
              "ext": ".jpeg",
              "url": "/uploads/small_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2.jpeg",
              "hash": "small_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2",
              "mime": "image/jpeg",
              "name": "small_WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
              "path": null,
              "size": 26.6,
              "width": 375,
              "height": 500
            },
            "medium": {
              "ext": ".jpeg",
              "url": "/uploads/medium_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2.jpeg",
              "hash": "medium_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2",
              "mime": "image/jpeg",
              "name": "medium_WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
              "path": null,
              "size": 48.59,
              "width": 563,
              "height": 750
            },
            "thumbnail": {
              "ext": ".jpeg",
              "url": "/uploads/thumbnail_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2.jpeg",
              "hash": "thumbnail_Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2",
              "mime": "image/jpeg",
              "name": "thumbnail_WhatsApp Image 2022-04-01 at 19.29.37.jpeg",
              "path": null,
              "size": 4.34,
              "width": 117,
              "height": 156
            }
          },
          "hash": "Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "size": 123.78,
          "url": "/uploads/Whats_App_Image_2022_04_01_at_19_29_37_61dc2617d2.jpeg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "createdAt": "2022-05-12T14:30:30.557Z",
          "updatedAt": "2022-05-12T14:30:30.557Z"
        },
        {
          "id": 3,
          "name": "WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
          "alternativeText": "WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
          "caption": "WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
          "width": 1200,
          "height": 1600,
          "formats": {
            "large": {
              "ext": ".jpeg",
              "url": "/uploads/large_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6.jpeg",
              "hash": "large_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6",
              "mime": "image/jpeg",
              "name": "large_WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
              "path": null,
              "size": 121.28,
              "width": 750,
              "height": 1000
            },
            "small": {
              "ext": ".jpeg",
              "url": "/uploads/small_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6.jpeg",
              "hash": "small_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6",
              "mime": "image/jpeg",
              "name": "small_WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
              "path": null,
              "size": 36.83,
              "width": 375,
              "height": 500
            },
            "medium": {
              "ext": ".jpeg",
              "url": "/uploads/medium_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6.jpeg",
              "hash": "medium_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6",
              "mime": "image/jpeg",
              "name": "medium_WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
              "path": null,
              "size": 74.74,
              "width": 563,
              "height": 750
            },
            "thumbnail": {
              "ext": ".jpeg",
              "url": "/uploads/thumbnail_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6.jpeg",
              "hash": "thumbnail_Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6",
              "mime": "image/jpeg",
              "name": "thumbnail_WhatsApp Image 2022-04-01 at 19.29.31.jpeg",
              "path": null,
              "size": 4.67,
              "width": 117,
              "height": 156
            }
          },
          "hash": "Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "size": 207.18,
          "url": "/uploads/Whats_App_Image_2022_04_01_at_19_29_31_d4679363f6.jpeg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "createdAt": "2022-05-12T14:30:30.560Z",
          "updatedAt": "2022-05-12T14:30:30.560Z"
        },
        {
          "id": 4,
          "name": "WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
          "alternativeText": "WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
          "caption": "WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
          "width": 1200,
          "height": 1600,
          "formats": {
            "large": {
              "ext": ".jpeg",
              "url": "/uploads/large_Whats_App_Image_2022_04_01_at_19_29_36_99da767410.jpeg",
              "hash": "large_Whats_App_Image_2022_04_01_at_19_29_36_99da767410",
              "mime": "image/jpeg",
              "name": "large_WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
              "path": null,
              "size": 122.98,
              "width": 750,
              "height": 1000
            },
            "small": {
              "ext": ".jpeg",
              "url": "/uploads/small_Whats_App_Image_2022_04_01_at_19_29_36_99da767410.jpeg",
              "hash": "small_Whats_App_Image_2022_04_01_at_19_29_36_99da767410",
              "mime": "image/jpeg",
              "name": "small_WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
              "path": null,
              "size": 41.6,
              "width": 375,
              "height": 500
            },
            "medium": {
              "ext": ".jpeg",
              "url": "/uploads/medium_Whats_App_Image_2022_04_01_at_19_29_36_99da767410.jpeg",
              "hash": "medium_Whats_App_Image_2022_04_01_at_19_29_36_99da767410",
              "mime": "image/jpeg",
              "name": "medium_WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
              "path": null,
              "size": 78.75,
              "width": 563,
              "height": 750
            },
            "thumbnail": {
              "ext": ".jpeg",
              "url": "/uploads/thumbnail_Whats_App_Image_2022_04_01_at_19_29_36_99da767410.jpeg",
              "hash": "thumbnail_Whats_App_Image_2022_04_01_at_19_29_36_99da767410",
              "mime": "image/jpeg",
              "name": "thumbnail_WhatsApp Image 2022-04-01 at 19.29.36.jpeg",
              "path": null,
              "size": 6.21,
              "width": 117,
              "height": 156
            }
          },
          "hash": "Whats_App_Image_2022_04_01_at_19_29_36_99da767410",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "size": 208.06,
          "url": "/uploads/Whats_App_Image_2022_04_01_at_19_29_36_99da767410.jpeg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "createdAt": "2022-05-12T14:30:30.615Z",
          "updatedAt": "2022-05-12T14:30:30.615Z"
        }
      ],
      "createdBy": {
        "id": 1,
        "firstname": "Kamlesh",
        "lastname": "Bobde",
        "username": "admin"
      },
      "updatedBy": {
        "id": 1,
        "firstname": "Kamlesh",
        "lastname": "Bobde",
        "username": "admin"
      }
    }
}
let panelGroupId = 1;
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

        this.renderPanel = this.renderPanel.bind(this);
        this.renderPanelHeading = this.renderPanelHeading.bind(this);
        this.renderPanelTitleToggle = this.renderPanelTitleToggle.bind(this);
        this.renderPanelGroup = this.renderPanelGroup.bind(this);
        this.renderPanelBody = this.renderPanelBody.bind(this);
        this.renderAccordionData = this.renderAccordionData.bind(this);
        this.isImageObject = this.isImageObject.bind(this);
        this.ignoreProps = this.ignoreProps.bind(this);
    }

    toggleTab = (index) => {
        this.setState({ activeTabKey: index })
    }

    constructContentDetailsForModal = () => {
        console.log('this.props.contentDetailsOnModal: ', this.props.contentDetailsOnModal);
        if (Object.keys(this.props.contentDetailsOnModal).length && Object.keys(this.props.contentDetailsOnModal).indexOf('createdBy')) {
            this.dataToShowOnModal = { ...this.props.contentDetailsOnModal };
            const { firstname, lastname } = this.dataToShowOnModal.createdBy;
            const { firstname: updatedFname, lastname: updatedLname } = this.dataToShowOnModal.updatedBy;
            const { createdBy, updatedBy } = this.dataToShowOnModal;
            if (createdBy) this.dataToShowOnModal.createdBy = `${firstname} ${lastname}`;
            if (updatedBy) this.dataToShowOnModal.updatedBy = `${updatedFname} ${updatedLname}`;
        }
    }

    renderElementByType_old = (key) => {
        if (this.dataToShowOnModal[key] === null || this.dataToShowOnModal[key] === undefined) return
        if (typeof this.dataToShowOnModal[key] === 'boolean') {
            return this.dataToShowOnModal[key] + '';
        } else if (Array.isArray(this.dataToShowOnModal[key])) {
            // For MultiMedia
            if (this.dataToShowOnModal[key] && this.dataToShowOnModal[key][0]['ext']) {
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

    renderElementByType = (key) => {
        if (this.dataToShowOnModal[key] === null || this.dataToShowOnModal[key] === undefined) return
        if (typeof this.dataToShowOnModal[key] === 'boolean') {
            return this.dataToShowOnModal[key] + '';
        } else if (Array.isArray(this.dataToShowOnModal[key])) {
            // For MultiMedia
            if (this.dataToShowOnModal[key] && this.dataToShowOnModal[key][0] && this.dataToShowOnModal[key][0]['ext']) {
                return this.dataToShowOnModal[key].map((pic, index) => (
                    <img key={index} src={process.env.REACT_APP_STRAPI_API_URL + pic.formats.thumbnail.url} height="50px" width="50px" alt={pic['name']} />
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

    renderAccordionData = (data) => {
        if (data === null || data === undefined) {
            return <span> - </span>
        } else if (typeof data === 'boolean') {
            return data.toString();
        } else if (typeof data === 'string') {
            if(this.endsWithAnyImageExtension(data)) {
               return <img src={process.env.REACT_APP_STRAPI_API_URL + data} width="75px" height="75px" alt='image' />
            } 
            return data;
        } else if (typeof data === 'number') {
            return data;
        } else if (typeof data === 'object') {
            return data;
        } else {
            return <span> - </span>;
        }
    }

    endsWithAnyImageExtension = (string) => {
        for (let suffix of STRAPI_IMAGE_EXTENSIONS)  
            if(string.toUpperCase().endsWith(suffix))
                return true;
        return false;
    }

    isObject = (data) => {
        if (data) {
            if (typeof data === 'object') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    isImageObject = (object) => {
        let keys = Object.keys(object);
        if(keys.includes('ext') && keys.includes('formats') && keys.includes('url')) {
            if(STRAPI_IMAGE_EXTENSIONS.includes(object['ext'].toUpperCase())) {
                return true;
            }
        }
        return false;
    }

    ignoreProps = (key) => {
        return !key.match("createdAt") && !key.match("updatedAt") && !key.match("publishedAt") && !key.match("createdBy") && !key.match("updatedBy") && !key.match("id");
    }

    renderPanelGroup = (data) => {
        panelGroupId = panelGroupId + 1;
        return (
            <PanelGroup accordion id={panelGroupId}>
                {data && Object.keys(data).length > 0 
                ? 
                    !this.isImageObject(data) 
                    ?
                    Object.keys(data).filter(key => this.ignoreProps(key)).map((key, index) => {
                        return (this.renderPanel(key, index, data[key]));
                    })
                    :
                    this.renderPanel(STRAPI_IMAGE_URL_KEY, 0, data[STRAPI_IMAGE_URL_KEY])
                : 
                <span>No data available</span>}
            </PanelGroup>
        )
    }

    renderPanel = (theKey, theIndex, data) => {
        // if (!this.isObject(data)) {
        //     // return (<Row key={theIndex} style={{ marginLeft: '1px', backgroundColor: '#F5FFFA', border:'1px solid transparent' }}>
        //     //             <span key={theIndex} style={{ marginLeft: '20px'}}>{theKey.charAt(0).toUpperCase() + theKey.slice(1)}:</span>{this.renderAccordionData(data)}
        //     //         </Row>)

        //     return (
        //         <div key={theIndex} className="row" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
        //             <div className="col-xs-12">
        //                 <Col xs={1}>
        //                     <strong>{theKey.charAt(0).toUpperCase() + theKey.slice(1)}</strong>
        //                 </Col>
        //                 <Col xs={11}>
        //                 {!this.isObject(data) && this.renderElementByType(theKey)}
        //                 </Col>
        //             </div>
        //         </div>
        //     )
        // } else {
            return (
                <Panel eventKey={theIndex} key={theIndex}>
                    {this.renderPanelHeading(theKey, data)}
                    {
                        this.isObject(data)
                        &&
                        this.renderPanelBody(data, true)
                    }
                </Panel>)
        // }
    }

    renderPanelHeading = (theKey, data) => {
        return (
            <Panel.Heading>
                {this.isObject(data) 
                ? 
                this.renderPanelTitleToggle(theKey) 
                : 
                this.renderPanelTitle(theKey, data)}
            </Panel.Heading>
        );
    }

    renderPanelTitle = (theKey, data) => {
        return (
            <Panel.Title>
                <span style={{ marginLeft: '15px' }}>
                    {theKey.toUpperCase() === STRAPI_IMAGE_URL_KEY.toUpperCase() 
                    ? 
                    '' 
                    : 
                    theKey.charAt(0).toUpperCase() + theKey.slice(1) + ':'}  </span>  {this.renderAccordionData(data)}
            </Panel.Title>
        );
    }

    renderPanelTitleToggle = (theKey) => {
        return (
            <Panel.Title toggle>
                <span>{theKey.charAt(0).toUpperCase() + theKey.slice(1)}</span>
            </Panel.Title>
        );
    }

    renderPanelBody = (data, isObject) => {
        if (isObject) {
            return (
                <Panel.Body collapsible>
                    {this.renderPanelGroup(data)}
                </Panel.Body>
            )
        } else {
            return (
                <Panel.Body collapsible>
                    <span>{data}</span>
                </Panel.Body>
            )
        }
    }

    render() {
        this.constructContentDetailsForModal();
        console.log('this.dataToShowOnModal: ', Object.keys(this.dataToShowOnModal));
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
                                 <Tab eventKey={0} title="English kamlesh">
                                {/*    {Object.keys(this.dataToShowOnModal).length > 0 && Object.keys(this.dataToShowOnModal).filter(key => ignoreProps(key)).map((key, i) => {
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
                                    })} */}
                                    {/* My code */}

                                    {this.renderPanelGroup(this.dataToShowOnModal)}
                                    {/* {this.renderPanelGroup(tempData)} */}
                                        

                               {/* //======================hardcoded example ==============  */}
                    {/* <PanelGroup accordion id="ent-1">
                                    <Panel id='1' eventKey={1} key={2}>
                                        <Panel.Heading id='13'>
                                            <Panel.Title id='30' toggle><span style={{marginLeft:'10px'}}>Collapsible Group Item #1</span></Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>

                                            <PanelGroup accordion id="ent-1">
                                                <Panel eventKey={3} key={4}>
                                                    <Panel.Heading id='4'>
                                                        <Panel.Title><span style={{ marginLeft: '15px' }}>Int #1</span></Panel.Title>
                                                    </Panel.Heading>
                                                </Panel>
                                                <Panel eventKey={5} key={6}>
                                                    <Panel.Heading>
                                                        <Panel.Title toggle><span style={{ marginLeft: '5px' }}>Int #1</span></Panel.Title>
                                                    </Panel.Heading>
                                                    <Panel.Body collapsible>
                                                        Int #1 Body
                                                    </Panel.Body>
                                                </Panel>
                                                <Panel eventKey={7} key={8}>
                                                    <Panel.Heading>
                                                        <Panel.Title toggle><span style={{ marginLeft: '5px' }}></span></Panel.Title>
                                                    </Panel.Heading>
                                                    <Panel.Body collapsible>
                                                        Int #2 Body
                                                    </Panel.Body>
                                                </Panel>
                                                <Panel eventKey={9} key={10}>
                                                    <Panel.Heading>
                                                        <Panel.Title toggle><span style={{ marginLeft: '5px' }}>Hello</span></Panel.Title>
                                                    </Panel.Heading>
                                                    <Panel.Body collapsible>

                                                        <PanelGroup accordion id="ent-2">
                                                            <Panel eventKey={11} key={12}>
                                                                <Panel.Heading>
                                                                    <Panel.Title toggle><span style={{ marginLeft: '5px' }}>Hello in1</span></Panel.Title>
                                                                </Panel.Heading>
                                                                <Panel.Body collapsible>
                                                                Hello in1 Body
                                                                </Panel.Body>
                                                            </Panel>
                                                            <Panel eventKey={13} key={14}>
                                                                <Panel.Heading>
                                                                    <Panel.Title><span style={{ marginLeft: '5px' }}>Hello in2</span></Panel.Title>
                                                                </Panel.Heading>
                                                            </Panel>
                                                        </PanelGroup>

                                                    </Panel.Body>
                                                </Panel>
                                                
                                            </PanelGroup>
                                        </Panel.Body>
                                    </Panel>
                            </PanelGroup> */}


{/* =========== <<<<========kamlesh ================== */}

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
                                                            // this.renderElementByType(key)
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
