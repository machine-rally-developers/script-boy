import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/navigation.css'
//import '../js/navigation'
import * as $ from 'jquery'
class Navigation extends Component {
    handleSideBarClicked = (e) => {

        $(".sidebar-submenu").slideUp(200);
        if (
            $(e.target)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(e.target)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(e.target)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(e.target)
                .parent()
                .addClass("active");
        }
    }
    showSideBar = (e) => {
        $(".page-wrapper").addClass("toggled");
    }
    closeSideBar = (e) => {
        $(".page-wrapper").removeClass("toggled");
    }
    render() {

        return (
            <div>
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={this.showSideBar}>
                    <i className="fas fa-bars"></i>
                </a>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <a href="#">ScriptBoy</a>
                            <div id="close-sidebar" onClick={this.closeSideBar}>
                                <i className="fas fa-times"></i>
                            </div>
                        </div>
                        <div className="sidebar-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                                    alt="User picture" />
                            </div>
                            <div className="user-info">
                                <span className="user-name">Jhon
                  <strong>Smith</strong>
                                </span>
                                <span className="user-role">Administrator</span>
                                <span className="user-status">
                                    <i className="fa fa-circle"></i>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                        <div className="sidebar-search">
                            <div>
                                <div className="input-group">
                                    <input type="text" className="form-control search-menu" placeholder="Search..." />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>General</span>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#" onClick={this.handleSideBarClicked}>
                                        <i className="fa fa-tachometer-alt"></i>
                                        <span>Dashboard</span>
                                        <span className="badge badge-pill badge-warning">Coming-soon</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="#">Dashboard 1
                          <span className="badge badge-pill badge-success">Pro</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">Dashboard 2</a>
                                            </li>
                                            <li>
                                                <a href="#">Dashboard 3</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#" onClick={this.handleSideBarClicked}>
                                        <i className="fas fa-key"></i>
                                        <span>&nbsp;Key-Value Manager</span>
                                        <span className="badge badge-pill badge-danger">3</span>
                                    </a>

                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#" onClick={this.handleSideBarClicked}>
                                        <i className="far fa-gem"></i>
                                        <span>&nbsp;Middleware</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="#">Create Automated middleware</a>
                                            </li>
                                            <li>
                                                <a href="#">Create non-automated middleware</a>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#" onClick={this.handleSideBarClicked}>
                                        <i className="fa fa-chart-line"></i>
                                        <span>&nbsp;Analytics</span>
                                        <span className="badge badge-pill badge-warning">Coming soon</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="#">Pie chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Line chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Bar chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Histogram</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#" onClick={this.handleSideBarClicked}>
                                        <i className="fas fa-puzzle-piece"></i>
                                        <span>&nbsp;Plugins</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <NavLink to="/plugin">Install plugins</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/plugin/install">View installed plugins</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#" onClick={this.handleSideBarClicked}>
                                        <i className="fas fa-code"></i>
                                        <span>&nbsp;Script</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <NavLink to="/script">View scripts</NavLink>
                                                {/* <a href="#">View scripts</a> */}
                                            </li>
                                            <li>
                                                <NavLink to="/script/new">Create new script</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <li className="header-menu">
                                    <span>Extra</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-book"></i>
                                        <span>Documentation</span>
                                        <span className="badge badge-pill badge-primary">Beta</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-calendar"></i>
                                        <span>Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-folder"></i>
                                        <span>Examples</span>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-footer">
                        <a href="#">
                            <i className="fa fa-bell"></i>
                            <span className="badge badge-pill badge-warning notification">3</span>
                        </a>
                        <a href="#">
                            <i className="fa fa-envelope"></i>
                            <span className="badge badge-pill badge-success notification">7</span>
                        </a>
                        <a href="#">
                            <i className="fa fa-cog"></i>
                            <span className="badge-sonar"></span>
                        </a>
                        <a href="#">
                            <i className="fa fa-power-off"></i>
                        </a>
                    </div>
                </nav>

            </div>);
    }
}

export default Navigation;