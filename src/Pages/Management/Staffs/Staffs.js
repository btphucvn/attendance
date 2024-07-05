import React, { useState, useEffect, useRef, Fragment } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from '../../../Components/NavBar/NavBar';
import DataTable from 'react-data-table-component';
import "./Staffs.scss"
const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

function Staffs() {
    return (
        <Fragment>
            <NavBar />
            <div class="staffs-container">
                <div class="table-staffs-container">
                <DataTable
                    columns={columns}
                    data={data}
                />
                </div>
            </div>
        </Fragment>
    )
}
export default Staffs;