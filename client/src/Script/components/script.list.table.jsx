import React, { Component } from 'react';
import { getScript, deleteScript } from './queries'
import { graphql, compose } from 'react-apollo'
class ScriptEditTable extends Component {
    onDelete(id) {

        this.props.deleteScript({
            variables: {
                id
            },
            refetchQueries: [{ query: getScript }]

        })

    }
    showScript() {

        let data = this.props.getScript;
        if (data.loading) {
            return (<div>Loading--</div>)
        }
        else {
            return (<table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.script.map((value) => {

                        return (<tr key={value._id}>
                            <td>{value.type}</td>
                            <td>{value.name}</td>
                            <td><button onClick={() => this.props.onEdit(value._id)} className="btn btn-dark">Edit</button></td>
                            <td><button onClick={() => this.onDelete(value._id)} className="btn btn-danger">Delete</button></td>
                        </tr>)

                    })}
                </tbody>
            </table>);
        }
    }
    render() {

        return (this.showScript());
    }
}
//export default ScriptEditTable;
export default compose(graphql(getScript, { name: "getScript" }),
    graphql(deleteScript, { name: "deleteScript" })
)(ScriptEditTable)