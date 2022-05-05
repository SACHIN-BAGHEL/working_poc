import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Config from './page/Config';
import SingleContentList from './page/SingleContentList';

class App extends Component {
    // TODO: not delete because this all state will be pass through web-components later...
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: [],
            selectedContentId: 0,
            selectedTemplateId: 'default',
            selectedContentName: null,
            name: null,
            nameTwo: null,
            // collectionTypes: [],
        };
    }

    setContent = (data) => {
        this.setState({ selectedContent: [data] })
    }

    setSelectedContentName = (contentName) => {
        this.setState({ selectedContentName: contentName })
    }

    setTemplateId = (tempId) => {
        this.setState({ selectedTemplateId: tempId })
    }

    render() {
        return (
            <Router>
                <Route path='/' exact>
                    <Config selectedContent={this.state.selectedContent} setTemplateId={this.setTemplateId }/>
                </Route>
                <Route path='/configpage' exact>
                    <SingleContentList setContent={this.setContent} setSelectedContentName={this.setSelectedContentName}/>
                </Route>
            </Router>
        )
    }
}
export default App;