import React, { Component } from 'react';
import { getKvm, deleteKvm } from './queries'
import { graphql, compose } from 'react-apollo'




class KVMTable extends Component {
    onDelete(id) {

        this.props.deleteKvm({
            variables: {
                id
            },
            refetchQueries: [{ query: getKvm }]

        })

    }

    showKVM() {

        let data = this.props.getKvm;
        if (data.loading) {
            return (<div>Loading--</div>)
        }
        else {
            return (<table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Key</th>
                        <th scope="col">Value</th>
                        {/* <th scope="col">Edit</th> */}
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.kvm.map((value) => {

                        return (<tr key={value.key}><td>{value.key}</td><td>{value.value}</td><td><button onClick={() => this.onDelete(value._id)} className="btn btn-danger">Delete</button></td></tr>)

                    })}
                </tbody>
            </table>);
        }
    }
    render() {

        return (this.showKVM());


    }

}

//export default KVMTable;
export default compose(graphql(getKvm, { name: "getKvm" }),
    graphql(deleteKvm, { name: "deleteKvm" })
)(KVMTable)


