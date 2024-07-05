import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import './Login.scss';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Login() {


    //------
    const userName = useRef();
    const password = useRef();
    const navigate = useNavigate();

    async function handleLogin() {
        const staff = {
            UserName: userName.current.value,
            Password: password.current.value,
            Name: "",
            Email: "",
            Token: ""
        }
        //console.log(process.env.REACT_APP_API + "/api/staffs/login");
        await axios.post(process.env.REACT_APP_API + "/api/staffs/login", staff)
        .then(function (response) {
            //console.log(response);
            if(response.data.content.token!==""){
                localStorage.setItem("user",JSON.stringify(response.data.content));

                navigate("/management");
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="login-container container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <div className="form-floating mb-3">
                                    <input ref={userName}  className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input ref={password} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                    <label className="form-check-label" for="rememberPasswordCheck">
                                        Remember password
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button onClick={handleLogin} className="btn btn-primary text-uppercase fw-bold">Sign
                                        in</button>
                                </div>
                                <hr className="my-4" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;