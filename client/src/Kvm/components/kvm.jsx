import React, { Component } from 'react';
import Navigation from '../../Navigation/components/navigation';
import KVMTable from './kvmtable'
import KVMForm from './kvmForm'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import kvmtable from './kvmtable';
const client = new ApolloClient({ uri: "/graphql" })
class KVM extends Component {
    state = {
        count: 0,
        kvm: [],
        key: "",
        value: "",
        encrypted: false
    }
    getKeyValueForm = () => {

        if (this.state.count) {
            return (<KVMForm></KVMForm>)
        }
    }

    showKvmAdder = () => {
        console.log("showkvmAdder")
        this.setState({ count: 1 })


    }
    removeKvmAdder = () => {
        this.setState({ count: 0 })
    }

    render() {

        return (
            <ApolloProvider client={client}>
                <div className="page-wrapper chiller-theme toggled">
                    <Navigation />
                    <main className="page-content">
                        <div className="container-fluid">
                            <h2>Key-Value Manager</h2>
                            <hr />
                            <div className="row p-3">
                                <button className="btn btn-light" onClick={this.showKvmAdder}><i className="fas fa-plus"></i> Add Key-Value</button>
                                {
                                    this.getKeyValueForm()
                                }
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    <KVMTable kvm={this.state.kvm} onDelete={this.handleDelete} />
                                </div>

                            </div>


                        </div>

                    </main>
                </div>
            </ApolloProvider>);
    }
}
export default KVM;