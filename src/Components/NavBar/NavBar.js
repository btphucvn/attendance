import React, { useState, useRef, useEffect } from 'react'
// import { FaBars, FaTwitter } from 'react-icons/fa';
import { FaBars, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { links, social } from './data';
import logo from '../../logo.svg';
import './NavBar.scss';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  let userData;
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  useEffect(async() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    // console.log(linksHeight)

    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px'
    }
    const currentUserLogin = JSON.parse(localStorage.getItem("user"));
    if (currentUserLogin===null||currentUserLogin === undefined || currentUserLogin === "") {
      navigate("/login");
    }
    const checkUserLogin = await axios.get(process.env.REACT_APP_API + "/api/staffs/info/"+currentUserLogin.token)
    console.log(checkUserLogin);
    setUserInfo(JSON.parse(localStorage.getItem("user")));

  }, [showLinks])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">

          <img src={logo} className="logo" alt="" />
          <span>{userInfo !== null ? userInfo.name : ""}</span>
          <button className="nav-toggle" onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>

        </div>
        {/* useRef approach */}
        <div className='links-container' ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {
              links.map(link => <li key={link.id}><a href={link.url}>{link.text}</a></li>)
            }
          </ul>
        </div>

        {/* <div className={`links-container ${showLinks && 'show-container'}`}>
        <ul className="links">
          {
            links.map(link=><li key={link.id}><a href={link.url}>{link.text}</a></li>)
          }
        </ul>
      </div> */}
        {/* ----ANOTHER WAY---- */}
        {/* {showLinks ? 
      <div className="links-container show-container">
          <ul className="links">
            {
              links.map(link=><li key={link.id}><a href={link.url}>{link.text}</a></li>)
            }
          </ul>
      </div> 
      : 
      <div className="links-container">
        <ul className="links">
          {
            links.map(link=><li key={link.id}><a href={link.url}>{link.text}</a></li>)
          }
        </ul>
      </div>} */}

        {/* <ul className="social-icons">
          <li>Xin chào admin</li>
          <li ><a href="/logout">Logout</a></li>
        </ul> */}

      </div>
    </nav>
  )
}

export default NavBar;