import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
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
            name: 'test single name',
            nameTwo: 'nameTwo',
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
            <>
                <HashRouter>
                    <Switch>
                        <Route path='/' exact>
                            <Config selectedContent={this.state.selectedContent} setTemplateId={this.setTemplateId} />
                        </Route>
                        <Route path='/configpage' exact>
                            <SingleContentList setContent={this.setContent} setSelectedContentName={this.setSelectedContentName} />
                        </Route>

                    </Switch>
                </HashRouter>
            </>
        )
    }
}
export default App;