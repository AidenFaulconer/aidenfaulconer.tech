import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTheme } from "emotion-theming";
import { INVIEWCONFIG } from "../page-builders/index-builder";
const axios = require('axios').default;
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";


// #region contact
export default ({ data, sectionName, odd, setCurrentSection }) => {
  const [selected, selectProject] = useState(0);
  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({ name: sectionName, odd }); // entry.target.id)
    }
  }, [inView]);

  const SubmitForm = (firstName,lastName,subject,message) => {
  //sanitize input
  alert("submitting form...")
  axios({
  headers: { 'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",},
  method: "post",
  url: "192.168.0.210:8181/api/v1/email",
  data: {firstName,lastName,subject,message}
  }).then(
  (response)=>alert(JSON.stringify(response.data,null,2)),
  (error)=>alert(JSON.stringify(error,null,2)))

  return(false)
  }

  const theme = useTheme();

  return (
    <>
      <ContactForm
        ref={ref}
        className="form-container"
        // action="https://sendmail.w3layouts.com/SubmitContactForm"
        method="post"
      >
        <div>
          <label htmlFor="w3lName">Name</label>
          <input type="text" name="w3lName" id="w3lName" />
        </div>
        <div>
          <label htmlFor="w3lSender">Email</label>
          <input type="email" name="w3lSender" id="w3lSender" />
        </div>
        <div>
          <label htmlFor="w3lSubject">Subject</label>
          <input type="text" name="w3lSubject" id="w3lSubject" />
        </div>
        <div>
          <label htmlFor="w3lMessage">Message</label>
          <textarea name="w3lMessage" id="w3lMessage" />
        </div>
        <BtnPrimary
          text="Contact"
          color={theme.colors.textPrimary}
          callback={() => SubmitForm("test","test","test","test")}
        />
        <div dangerouslySetInnerHTML={{ __html: "" }} />
      </ContactForm>
      {/**
      <ContactBranding lazyLoad />
       */}
    </>
  );
};

const ContactBranding = styled.div`
  min-width: 40%;
  background: url("./assets/svg/contact-branding.png");
  height: auto;
  background-repeat: no-repeat;
  background-size: contain;
`;
const ContactForm = styled.form`
  width: 100%;

  & label {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1em;
    margin-right: 50px;
    margin-bottom: 6.25px;
    font-size: ;
  }

  & input {
    padding: 6.25px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textPrimary};
    border: none;
    width: 100%;
    margin-bottom: 12.5px;
    border-radius: ${props => props.theme.corners.borderRadius1};
  }
  & textarea {
    padding: 6.25px;
    color: ${props => props.theme.colors.textPrimary};
    width: 100%;
    background: ${props => props.theme.colors.primary};
    border: none;
    border-radius: ${props => props.theme.corners.borderRadius1};
    min-height: 125px;
    margin-bottom: 25px;
  }

  & button {
    color: white;
  }
`;
// <ContactForm>
//   <label />
//   <label />
//   <label />
//   <input />
//   <input />
//   <input />
// </ContactForm>
// #endregion contact
