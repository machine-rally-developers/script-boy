import React, { Component } from 'react';
import { addKvm, getKvm } from './queries'
import { graphql, compose } from 'react-apollo'
class KVMForm extends Component {
    state = {}
    getKeyValueForm() {
        return (<div className="input-group mt-4">
            <div className="form-check mt-2 mr-1">
                <input className="form-check-input" type="checkbox" value="" id="checkbox" onClick={(e) => this.setState({ encrypted: e.target.checked })} />
                <label className="form-check-label" hmtlfor="defaultCheck1">
                    Encrypt-Value
                    </label>
            </div>
            <div className="input-group-prepend">
                <span className="input-group-text">Key and Value</span>
            </div>
            <input onChange={(e) => this.setState({ key: e.target.value })} type="text" aria-label="key" className="form-control" required />
            <input onChange={(e) => this.setState({ value: e.target.value })} id="value" type="text" aria-label="value" className="form-control" required />
            <button className="btn btn-dark ml-1" onClick={this.addKeyValue.bind(this)}>Add</button>

        </div>)
    }
    addKeyValue() {
        this.props.addKvm({
            variables: {
                key: this.state.key,
                value: this.state.value,
                encrypted: this.state.encrypted === undefined ? false : true,
            },

            refetchQueries: [{ query: getKvm }]


        })
        console.log(this.state);

    }
    render() {
        return (this.getKeyValueForm())
    }

}

export default compose(graphql(addKvm, { name: "addKvm" })
)(KVMForm)