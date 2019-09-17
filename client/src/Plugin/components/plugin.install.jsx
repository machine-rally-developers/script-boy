import React, { Component } from 'react';
import Navigation from '../../Navigation/components/navigation';
/* import '../css/plugin.install.css'
import '../js/plugin.install' */
class PluginInstall extends Component {
    upload = (e) => {


    }
    render() {

        return (<div className="page-wrapper chiller-theme toggled"><Navigation />
            <main className="page-content">
                <div className="container-fluid">
                    <h2>Plugin-Manager</h2>
                    <hr />

                    <div className="row">
                        <div className="input-group m-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01"> <i className="fas fa-cloud-upload-alt"></i> &nbsp; Upload</span>
                            </div>
                            <div className="custom-file">
                                <input type="file" accept=".zip" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">ZIP file</label>
                            </div>

                        </div>
                        <button className="btn btn-dark m-3" onClick={this.upload}>Upload</button>
                    </div>


                </div>

            </main></div>);
    }
}
export default PluginInstall;