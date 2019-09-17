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
import AceDisplayEditor from './ace.display.editor'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: "/graphql" })
class EditScript extends Component {
    /* state = {
        mode: "",
        theme: "github",
        fontSize: 14,
        value: "",
        scriptName: ""
    }
    onChange = (newValue) => {
        //const updateValue = newValue;
        this.setState({ value: newValue });
        console.log("change", newValue);
    } */
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
    /*     getScript = () => {
            let scriptID = this.props.match.params.id
            let response = {
    
            }
            if (scriptID !== undefined) {
    
                $.ajax({
    
                    url: "/script/" + scriptID,
                    type: "GET",
                    async: false,
                    success: function (res) {
    
                        response.result = res[0];
                    },
                    error: function (err) {
    
                        console.error("Error occured fetching data");
                        console.error(err)
                    }
                });
                return response;
            }
    
    
        }
        componentDidMount() {
            let result = this.getScript();
    
            if (result.result) {
                console.log("Component did mont")
                this.updateState(result.result)
            }
    
    
        }
        updateState = (data) => {
            console.log(data)
            this.setState({ mode: data.type, value: base64url.decode(data.data), scriptName: data.name })
    
        } */

    update = (newValue) => {
        let scriptID = this.props.match.params.id
        let data = {

            data: base64url(this.state.value)
        }
        let isSuccess = false
        if (scriptID !== undefined) {
            $.ajax({
                type: "PUT",
                url: "/script/" + scriptID,
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
        }

        if (isSuccess) {
            alert("Data updated")
        }
        console.log("change", newValue);
    }
    render() {

        return (<ApolloProvider client={client}><div className="page-wrapper chiller-theme toggled"><Navigation />
            <main className="page-content">

                <AceDisplayEditor id={this.props.match.params.id}></AceDisplayEditor>

            </main></div></ApolloProvider>);
    }
}
export default EditScript;