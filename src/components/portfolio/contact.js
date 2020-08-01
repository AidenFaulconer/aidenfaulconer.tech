import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { INVIEWCONFIG } from "../page-builders/index-builder";

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
        <BtnPrimary text="Contact" onClick={() => {}} />
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

  }
`;
const ContactForm = styled.form`
  color: white;
  min-width: 100%;
  padding-right: 25px;

  & label {
    font-size: ${props => props.theme.text.sizes.extraSmall};
    margin-right: 50px;
    margin-bottom: 6.25px;
    font-size: ;
  }

  & input {
    background: ${props => props.theme.colors.primary};
    border: none;
    padding: 3.125px;
    width: 100%;
    margin-bottom: 12.5px;
    border-radius: ${props => props.theme.corners.borderRadius1};
  }
  & textarea {
    width: 100%;
    background: ${props => props.theme.colors.primary};
    border: none;
    padding: 3.125px;
    border-radius: ${props => props.theme.corners.borderRadius1};
    min-height: 125px;
    margin-bottom: 25px;
  }

  & .button {
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
