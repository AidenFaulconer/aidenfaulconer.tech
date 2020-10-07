import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTheme } from "emotion-theming";
import { INVIEWCONFIG } from "../page-builders/index-builder";
import { BtnPrimary, BtnBlob, BtnSecondary } from "../buttons";
import Confetti from "react-confetti"
// #region contact
export default ({ data, sectionName, odd, setCurrentSection }) => {
  //handle color changing
  const [selected, selectProject] = useState(0);
  const [formSubmitted, toggleFormSubmition] = useState(false);
  const [ref, inView, entry] = useInView(INVIEWCONFIG);
  useEffect(() => {
    if (typeof entry !== "undefined") {
      setCurrentSection({ name: sectionName, odd }); // entry.target.id)
    }
  }, [inView]);
  //handle color changing

  const [formData,setFormData] = useState({
  contactName: "",
  contactSender: "",
  contactSubject: "",
  contactMessage: "",
  });

  const tests = {
  contactName: /[a-zA-Z]+/gim,
  contactSender: /[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.com/gim,
  contactSubject: /[a-zA-Z]+/gim,
  contactMessage: /.{20,}/gim,
  }

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const HandleBadInput = (name,formData) => {
  let test = Boolean(formData[name].match(tests[name]));
  if (typeof document !== "undefined")
    test ? document.getElementById(name).classList.remove("incomplete") : document.getElementById(name).classList.add("incomplete")
  return test;
  }

  const SubmitForm = () => {
  //sanitize input
  let testInput = Object.keys(formData).every((data,i)=>HandleBadInput(data,formData))
  if (!testInput) return//if not all tests fail dont run code

  fetch("/",{
  headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
  method: "POST",
  body: encode({"form-name": "contact",...formData})
  })
  .then((response)=>console.log("form submission successful"))
  .catch((error)=>alert(error))

  toggleFormSubmition(true);

  return(false)//prevents default behaviour to redirect user
  }

  const HandleChange =(e)=>setFormData(Object.assign({},formData,{[e.target.name]: e.target.value}))

  const theme = useTheme();
  useEffect(()=>{
  // alert(JSON.stringify(formData,null,2));
  // setTimeout(()=>{
  // toggleFormSubmition(false);
  // },30000)//30 seconds

  // typeof document !== "undefined" && !formSubmitted && document.getElementById("contact-submit").classList.add("disabled")

  },[formData])



  return (
    <>
      <ContactForm
        ref={ref}
        name="contact"
        className="form-container"
        form-name="contact"
        method="POST"
        onSubmit={SubmitForm}
        data-netlify-honeypot="bot-field"
        data-netlify="true"
        netlify
      >

        {formSubmitted &&(
          <div className="messenger" >
            <Confetti
              className="confetti"
              colors={[
              theme.colors.primary,
              theme.colors.secondary,
              theme.colors.textPrimary,
              theme.colors.textSecondary,
              ]}
              numberOfPieces={50}
              gravity={0.17}
            />
            <h1>
            Thank you!
            </h1>
            <p>Looking forward to getting in touch, you will have a response within 1-5 business days :)</p>
          </div>
        )}
        <div id="contactName" >
          <label htmlFor="contactName">Name</label>
          <div className="incomplete-message">please only enter letters</div>
          <input onChange={HandleChange} type="hidden" type="text" name="contactName"/>
        </div>
        <div id="contactSender" >
          <label htmlFor="contactSender">Email</label>
          <div className="incomplete-message">please enter a valid email address</div>
          <input onChange={HandleChange} type="hidden" type="email" name="contactSender"/>
        </div>
        <div id="contactSubject" >
          <label htmlFor="contactSubject">Subject</label>
          <div className="incomplete-message">please only enter letters</div>
          <input onChange={HandleChange} type="hidden" type="text" name="contactSubject" />
        </div>
        <div id="contactMessage" >
          <label htmlFor="contactMessage">Message</label>
          <div className="incomplete-message">please write a message containing more than 20 characters</div>
          <textarea onChange={HandleChange} type="hidden" type="text" name="contactMessage" />
        </div>
        <BtnPrimary
          text="Contact"
          type="submit"
          id="contact-submit"
          color={theme.colors.textPrimary}
          callback={()=>SubmitForm()}
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

  & .disabled {
  pointer-events:none;
  }

  & .incomplete {
    & .incomplete-message {
      padding: 6.125px;
      display: inline-block;
      width: 100%;
      border: 2px solid red;
      text-align: center;
      color: ${props=>props.theme.colors.textSecondary};
      font-weight: bolder;
      border-radius: ${props=>props.theme.corners.borderRadius2};
      visibility: visible;
      box-shadow: ${props=>props.theme.shadows.primary};
    }
  }

  & .incomplete-message {
    visibility: hidden;
    margin: 6.125px 0px;
    font-size: ${props=>props.theme.text.sizes.extraSmall};
  }

  & .confetti {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  }

  & .messenger {
    visibility: visible;
    position: absolute;
    height: 75%;
    width: 75%;
    transform: translateZ(100);
    padding: 25px;
    background: ${props=>props.theme.colors.foreground};
    color: ${props=>props.theme.colors.primary};
    right: 0px;
    text-align: center;
    font-weight: bolder;
    box-shadow: ${props=>props.theme.shadows.primary};
    top: 12.5%;
    left: 12.5%;
    z-index: 3;
    border-radius: ${props=>props.theme.corners.borderRadius1};

    & p {
      margin-top: 12.5%;
    }

    &:after {
      position: absolute;
      content: "";
      width: 150vw;
      background: ${props=>props.theme.colors.foreground};
      opacity: .6;
      left: -100%;
      top: -25%;
      z-index: -50;
      height: 150%;
    }
  }
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