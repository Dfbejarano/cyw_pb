import React from "react";
import "./Footer.css";
import Footer from "../../imagenes/Footer.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";

export default function Layout(props) {
  return (
    <div class ="main-home">
        <div class ="footer-style">
        <img  class ="footer" src={Footer} />
        </div>
        <div class="social-container">
            <h3>Social Follow</h3>
            <a href="https://www.facebook.com/CrepesyWafflesOficial"
                target="_blank" 
                rel="noopener noreferrer"
                class ="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://twitter.com/CrepesWafflesCo" 
                target="_blank" 
                rel="noopener noreferrer"
                class ="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://instagram.com/crepesywaffles"
                target="_blank" 
                rel="noopener noreferrer"
                class ="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
        </div>
    </div>
  );
}
