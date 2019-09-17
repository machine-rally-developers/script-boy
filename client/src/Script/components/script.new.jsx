import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as $ from 'jquery'
import Navigation from '../../Navigation/components/navigation';
import ScriptTheme from './script.theme'
import ScriptLanguage from './script.language'
import AceEditor from "react-ace";
import base64url from "base64url";
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/kuroir';
import 'brace/theme/xcode';
import 'brace/theme/terminal';
import 'brace/theme/solarized_dark';
class NewScript extends Component {
    state = {
        mode: "javascript",
        theme: "github",
        fontSize: 14,
        value: "",
        scriptName: "",
        success: false
    }
    onChange = (newValue) => {
        //const updateValue = newValue;
        this.setState({ value: newValue });
        console.log("change", newValue);
    }
    handleSelectedTheme = (e) => {
        e.preventDefault();
        this.setState({ theme: e.target.value });
    }
    handleSelectedLanguage = (e) => {
        e.preventDefault();
        this.setState({ mode: e.target.value });
    }
    updateScriptName = (e) => {
        this.setState({ scriptName: e.target.value });
    }
    save = (newValue) => {
        let data = {
            name: this.state.scriptName,
            type: this.state.mode,
            data: base64url(this.state.value)
        }
        let isSuccess = false
        $.ajax({
            type: "POST",
            url: "/script",
            async: false,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                isSuccess = true;
            },
            error: function (err) {
                console.error(err)
            }

        })
        if (isSuccess) {
            this.setState({ success: isSuccess })
            //this.state.success = isSuccess;
        }
        console.log("change", newValue);
    }
    render() {
        if (this.state.success) {
            console.log("Redirect")
            return <Redirect to="/script" />
        }
        return (<div className="page-wrapper chiller-theme toggled"><Navigation />
            <main className="page-content">
                <div className="container-fluid">
                    <h2>Script</h2>
                    <hr />
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Script name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={this.updateScriptName} />
                    </div>
                    <hr />
                    <ScriptLanguage onHandleSelect={this.handleSelectedLanguage} />
                    <hr />
                    <ScriptTheme onHandleSelect={this.handleSelectedTheme} />
                    <hr />
                    <div className="row">
                        <div className="col-12 col-lg-12 col-sm-12 border p-0">
                            <AceEditor
                                mode={this.state.mode}
                                theme={this.state.theme}
                                onChange={this.onChange}
                                fontSize={this.state.fontSize}
                                value={this.state.value}
                                width={"100%"}
                                height={"600px"}
                                showGutter={true}
                                highlightActiveLine={true}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}

                            />


                        </div>
                        <div className="col-12 col-lg-12 col-sm-12 mt-5">
                            <button onClick={this.save} className="btn btn-primary">Save</button>
                        </div>


                    </div>


                </div>

            </main></div>);
    }
}
export default NewScript;