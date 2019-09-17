import React, { Component } from 'react'
import DropItems from './drop.items'

class DragSource extends Component {
    state = {
        bg: "grey"
    }
    render() { return (<div style={{ backgroundColor: this.state.bg }}><DropItems /></div >) }
}
export default DragSource