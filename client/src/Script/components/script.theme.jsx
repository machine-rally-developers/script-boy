import React, { Component } from 'react';

class ScriptTheme extends Component {

    render() {

        return (<div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Script Themes</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" onChange={this.props.onHandleSelect}>

                <option value="github">Github</option>
                <option value="kuroir">Kuroir</option>
                <option value="xcode">Xcode</option>
                <option value="terminal">Terminal</option>
                <option value="solarized_dark">Solarized Dark</option>
            </select>
        </div>);
    }
}
export default ScriptTheme;