import React, { Component } from 'react';
import Navigation from '../../Navigation/components/navigation';
import ScriptEditTable from './script.list.table'
import { Redirect } from 'react-router-dom'
import * as $ from 'jquery'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: "/graphql" })
class ScriptEdit extends Component {
    state = {
        redirectId: ""
    }



    handleEdit = (id) => {
        //update redirect in state
        this.setState({ redirectId: id })

    }
    render() {
        if (this.state.redirectId != "") {
            let redirect = "script/edit/" + this.state.redirectId
            return <Redirect to={redirect} />
        }
        return (
            <ApolloProvider client={client}>
                <div className="page-wrapper chiller-theme toggled">
                    <Navigation />
                    <main className="page-content">
                        <div className="container-fluid">
                            <h2>Scripts</h2>
                            <hr />

                            <div className="row">
                                <div className="col-12">
                                    <ScriptEditTable onEdit={this.handleEdit} />
                                </div>

                            </div>


                        </div>

                    </main>
                </div>

            </ApolloProvider>
        );
    }
}
export default ScriptEdit;