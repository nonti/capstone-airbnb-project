import React from "react";
import "./Footer.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Footer = () => {
  return (
    <div className="footer">
      <div className="menus-footer">
        <div className="item-footer">
          <b>Support</b>
          <p>Help Centre</p>
          <p>Safety Information</p>
          <p>Cancellation Options</p>
          <p>Our Covid-19 Responses</p>
          <p>Supporting people with disabilities</p>
          <p>Report a neighbourhood concern</p>
        </div>
        <div className="item-footer">
          <b>Community</b>
          <p>Airbnb.org: disaster relief housing</p>
          <p>Support Afghan refugees</p>
          <p>Combating discrimination</p>
        </div>
        <div className="item-footer">
          <b>Hosting</b>
          <p>Try Hosting</p>
          <p>AirCover: protection for Hosts</p>
          <p>Explore hosting resources</p>
          <p>Visit our community forum</p>
          <p>How to host responsibly</p>
        </div>
        <div className="item-footer">
          <b>About</b>
          <p>Newsroom</p>
          <p>Learn about new features</p>
          <p>Letter from our founders</p>
          <p>Careers</p>
          <p>Investors</p>
          <p>Airbnb Luxe</p>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-bottom">
        <div className="footer-left">
          <p>&copy; {new Date().getFullYear()} Airbnb, Inc.</p>
          <p>·</p>
          <p>Privacy</p>
          <p>·</p>
          <p>Terms</p>
          <p>·</p>
          <p>Sitemap</p>
        </div>
        <div className="footer-center"></div>
        <div className="footer-right">
          <div className="footer-right-left">
             <span><LanguageIcon /></span> 
            <select className="footer-select" style={{textDecoration: 'underline'}}>
              {/* <KeyboardArrowDownIcon /> */}
              <option value="English">English(EN)</option>
              <option value="English">English(IN)</option>
              <option value="English">English(US)</option>
              <option value="English">English(UK)</option>
            </select>
            <select className="footer-select" style={{textDecoration: 'underline'}}>
              {/* <KeyboardArrowDownIcon /> */}
              <option value="zar">$USD</option>
              <option value="usd"> RZAR</option>
              <option value="aud">$AUD</option>
            </select>
          </div>
          <div className="footer-right-center"></div>
          <div className="footer-right-right">
            <p>
              <FacebookRoundedIcon style={{ fontSize: "17px" }} />
            </p>
            <p>
              <XIcon style={{ fontSize: "17px" }} />
            </p>
            <p>
              <InstagramIcon style={{ fontSize: "20px" }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
