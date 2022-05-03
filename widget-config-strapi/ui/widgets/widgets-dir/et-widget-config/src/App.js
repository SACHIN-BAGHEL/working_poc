import React, { Component } from 'react';
import ConfigContentPage from './page/Config';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SingleContentList from './page/SingleContentList';
import Config from './page/Config';

class App extends Component {
    // TODO: not delete because this all state will be pass through web-components later...
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: [],
            name: null,
            nameTwo: null,
            contentType: [],
            collectionTypes: [],
            selectedContentId: 0,
            selectedTemplateId: 'default'
        };
    }

    getData = (data) => {
        this.setState({selectedContent: [data]})
    }

    render() {
        return (
            <Router>
                <Route path='/' exact>
                    <Config selectedContent={this.state.selectedContent} />
                </Route>
                <Route path='/configpage' exact>
                    <SingleContentList getData={this.getData} />
                </Route>
            </Router>
        )
    }
}
export default App;