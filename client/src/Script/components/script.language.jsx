import React, { Component } from 'react';

class ScriptLanguage extends Component {

    render() {

        return (<div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Script Language</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" onChange={this.props.onHandleSelect}>

                <option value="javascript">Javascript</option>

            </select>
        </div>);
    }
}
export default ScriptLanguage;