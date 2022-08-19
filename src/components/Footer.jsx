import React from "react";
import "../css/footer.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { IoIosKeypad } from "react-icons/io";
import { MdVoicemail, MdSettings } from "react-icons/md";
function Footer() {
  return (
    <div className="footer_icons">
      <BsFillTelephoneFill />
      <HiUserCircle />
      <div className="center_icon">
        <IoIosKeypad />
      </div>
      <MdSettings />
      <MdVoicemail />
    </div>
  );
}

export default Footer;
