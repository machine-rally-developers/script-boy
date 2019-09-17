import AceEditor from "react-ace";
import base64url from "base64url";
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/kuroir';
import 'brace/theme/xcode';
import 'brace/theme/terminal';
import 'brace/theme/solarized_dark';
import { getScript, deleteScript } from './queries'
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import ScriptTheme from './script.theme'
class AceDisplayEditor extends Component {
    state = {
        mode: "",
        theme: "github",
        fontSize: 14,
        value: "",
        scriptName: "",
        scriptID: ""
    }
    onChange = (newValue) => {

        this.setState({ value: newValue });
        console.log("change", newValue);
    }
    updateScriptName = (e) => {
        this.setState({ scriptName: e.target.value });
    }
    handleSelectedTheme = (e) => {
        e.preventDefault();
        this.setState({ theme: e.target.value });
    }
    handleSelectedLanguage = (e) => {
        e.preventDefault();
        this.setState({ mode: e.target.value });
    }
    update = (newValue) => {

    }
    showScript = () => {



        let data = this.props.getScript;
        console.log(data)
        if (data.loading) {
            return (<div></div>)
        }
        else {
            let script = data.script[0]
            //this.setState({ value: base64url.decode(script.data) })
            console.log(script)
            return (<div className="container-fluid">
                <h2>Script</h2>
                <hr />
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Script name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={this.updateScriptName} value={script.name} />
                </div>
                <hr />
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Script Language</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={this.updateScriptName} value={script.type} disabled />
                </div>
                <hr />
                <ScriptTheme onHandleSelect={this.handleSelectedTheme} />
                <hr />
                <div className="row">
                    <div className="col-12 col-lg-12 col-sm-12 border p-0">
                        {<AceEditor
                            mode={data.type}
                            theme={this.state.theme}
                            onChange={this.onChange}
                            fontSize={this.state.fontSize}
                            value={base64url.decode(script.data)}
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

                        />}



                    </div>
                    <div className="col-12 col-lg-12 col-sm-12 mt-5">
                        <button onClick={this.update} className="btn btn-primary">Update</button>
                    </div>


                </div>


            </div>)
        }

    }
    render() {
        return (this.showScript())

    }
}

export default compose(graphql(getScript, {
    name: "getScript", options: (props) => {
        console.log("Props");
        console.log(props)
        return {
            variable: {
                id: props
            }
        }
    }
})
)(AceDisplayEditor)

