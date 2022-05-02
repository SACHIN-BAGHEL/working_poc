import React, { Component } from 'react';
// import './App.css';
import {
    CardGrid,
    Row,
    Col,
    MenuItem,
    Card,
    CardTitle,
    CardBody,
    CardFooter,
    CardDropdownButton,
    Icon,
    CardLink,
    CardHeading,
} from 'patternfly-react';
import { MockClientPaginationTable } from './MockClientPaginationTable';
import MockModalManager from './ui/MockModalManager';
import { TablePfProvider, TableHeader, } from 'patternfly-react/dist/js/components/Table';
import { SimpleTable } from './ui/SimpleTable';
import { getCollectionTypes, getTemplate } from './api/Api';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: [],
            name: null,
            nameTwo: null,
            contentType: [],
            collectionTypes: [],
            selectedContentId : 0,
            selectedTemplateId: 'default'
        };
    }

    onChangeTemplateId = (event) => {
        this.setState({ selectedTemplateId: event.target.value })
    }

    setSelectedContent = (selectedContentArr, selectedContenttype) => {
        console.log('I am in app', selectedContenttype, selectedContentArr);
        this.setState({ selectedContent: selectedContentArr })
        this.setState({ name: selectedContentArr })
        this.setState({ nameTwo: encodeURIComponent(JSON.stringify(selectedContentArr)) })
        this.setState({ selectedContentId: selectedContentArr[0].id })
        console.log("APPA", this.state)
    }

    handleTypeaheadChangeContentType = selected => {
        let selectedContentType = selected.map(option => option.label);
        this.setState({ contentType: selectedContentType });
    };

    componentDidMount = async () => {
        let contentTypes = await getCollectionTypes();
        contentTypes = contentTypes.data.data.filter(obj => {
            return obj && (obj.uid && obj.uid.startsWith("api::")) && obj.isDisplayed;
        });
        const contentTypeRefine = [];
        contentTypes.length && contentTypes.forEach(element => {
            contentTypeRefine.push({ label: element.info.pluralName })
        });
        let { data: templatesList } = await getTemplate();
        // TODO: need to add filter template logic.
        console.log("TEMPLATESLIST", templatesList)
        this.setState({ contentType: templatesList, collectionTypes: templatesList })
    }

    render() {
        console.log('XYZ',this.state.name)
        return (
            <div style={{ margin: "8rem" }}>
                <MockModalManager rightSide={false} setSelectedContent={this.setSelectedContent} />
                <div style={{ marginTop: "1rem" }}></div>
                <SimpleTable content={this.state.selectedContent} />
                {this.state.selectedContentId != 0 &&
                    <div style={{ marginTop: "1rem" }}>
                        <select name="modelId" className="form-control" onChange={this.onChangeTemplateId}>
                            <option value="default">Default
                            </option>
                            {this.state.contentType.map((el, idx) => {
                                if (el.collectiontype.toLowerCase() === this.state.name[0].Type.toLowerCase()) {
                                    return <option key={idx} value={el.code}>{el.templatename}</option>;
                                }
                            })}
                        </select>
                    </div>
                }

            </div>
        )
    }
}
export default App;