import React, { Component } from 'react';
import './css/login.css'

class Login extends Component {


    render() {

        return (

            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-5 col-lg-5 col-m-5 col-sm-12">
                        <div className="login-dark p-3 shadow-lg rounded">
                            <div className="pt-3">
                                <h2 className="text-white ">Sign In | Dark</h2>
                            </div>

                            <form className="mt-5">
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-sm bg-light" placeholder="Email Id" />
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control form-control-sm bg-light" placeholder="Password" />
                                </div>

                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberCheckBox" />
                                    <label className="form-check-label text-light" htmlFor="rememberCheckBox">Remember me?</label>
                                </div>

                                <div className="mt-5">
                                    <button className="btn btn-sm btn-light col">
                                        Login
             </button>
                                </div>

                                <div className="text-center mt-2">
                                    <a href="#" className="text-warning">Forgot Password?</a>
                                </div>

                                <div className="mt-5">
                                    <p className="text-white text-center">
                                        Don't have an account?
                 <a href="#" className="text-warning">Click here to register</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>




        )
    }
}
export default Login