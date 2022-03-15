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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedContent: [],
            name: null,
            nameTwo: null
        };
    }

    setSelectedContent = (selectedContentArr, selectedContenttype) => {
        console.log('I am in app', selectedContenttype, selectedContentArr);
        this.setState({ selectedContent: selectedContentArr })
        this.setState({ name: selectedContentArr })
        this.setState({ nameTwo: encodeURIComponent(JSON.stringify(selectedContentArr)) })
        console.log("APPA", this.state)
    }

    render() {
        return (
            <div style={{ margin: "8rem" }}>
                <MockModalManager rightSide={false} setSelectedContent={this.setSelectedContent} />
                <SimpleTable content={this.state.selectedContent}/>
            </div>
        )
    }
}

export default App;