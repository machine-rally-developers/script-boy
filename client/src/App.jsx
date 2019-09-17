import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login/login'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Plugin from './Plugin/components/plugin'
import PluginInstall from './Plugin/components/plugin.install'
import KVM from './Kvm/components/kvm'
import NewScript from './Script/components/script.new'
import EditScript from './Script/components/script.edit'
import ListScript from './Script/components/script.list'

import NotFound from './NotFound/components/not.found'

//if page isnt showing, exact is needed
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/install"></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/kvm" component={KVM}></Route>
          <Route path="/script" exact component={ListScript}></Route>
          <Route path="/script/new" component={NewScript}></Route>
          <Route path="/script/edit/:id" component={EditScript}></Route>
          <Route path="/middleware" exact></Route>
          <Route path="/middleware/create"></Route>
          <Route path="/plugin" component={Plugin} exact></Route>
          <Route path="/plugin/install" component={PluginInstall}></Route>
          {/* <Route path="/workspace" component={StormReact}></Route> */}
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
