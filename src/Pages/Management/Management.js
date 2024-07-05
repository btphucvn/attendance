import React, { useState, useEffect, useRef, Fragment } from "react";
import * as faceapi from "face-api.js";
import './Management.scss';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../Components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Staffs from "./Staffs/Staffs";
import NotFound from "../NotFound/NotFound";

function Management() {


    //=====
    useEffect(() => {
        //console.log(localStorage.getItem("token"));
    }, [])



    return (
        <Fragment>
            <Navbar></Navbar>
        </Fragment>

    )
}
export default Management;


