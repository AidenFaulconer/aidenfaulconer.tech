import React, { useEffect, useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme=>({
typewriter: {
    width: '100%',
  margin: 'auto',
  textAlign: 'center',
  lineHeight: '110%',
  position: 'relative',
  "& span": {
    borderRight: '0.08em solid',
    paddingRight: '0.15em',
    animation: 'caret 1s steps(1) infinite',
  },
  "@keyframes caret": {
    "50%": {
      "borderColor": 'transparent',
    }
  }},
}));

export default ({ text }) => {
  const classes = useStyles();
  // type one text in the typwriter
  const [showText, setShowText] = useState("Ello mate");
  
  // keeps calling itself until the text is finished
  const typeWriter = (inputText, i, fnCallback) => {
    if (i < inputText.length) {
      // check if inputText isn't finished yet
      // console.warn(`${inputText.substring(0,i+1)} is the current letter rendering`);
      // re-render inputText
      setShowText(inputText.substring(0, i + 1));
      setTimeout(() => {
        // wait for a while and call this function again for next character
        typeWriter(inputText, i + 1, fnCallback);
      }, 70);
    } else if (typeof fnCallback === "function") {
      setTimeout(fnCallback, 200);
    } // call callback after timeout recursivly (HOW FAST IT TYPES)
  };
  const StartTextAnimation = (i) => {
    // start a typewriter animation for a text in the text array
    // check if text[i] exists
    if (typeof text[i] === "undefined") {
      setTimeout(() => {
        StartTextAnimation(0);
      }, 20000);
    } else {
      // console.warn(`running ${i < text[i].length} ${i} ${text[i].length} ${text[i]} `)
      // text exists! start typewriter animation
      typeWriter(text[i], 0, () => {
        StartTextAnimation(i + 1);
      }); // recursive call this for entirety of text
    }
    // after callback (and whole text has been animated), start next text
    if (i >= text.length) {
      console.warn("finished iteration");
    }
  };

  // component mounted, now we can query html in dom and modify it, load animation at index 0
  useEffect(() => {
    StartTextAnimation(0);
  }, []); // stop when text isnt changed

  return (
    <div className={classes.typewriter}>
      <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: showText }} />
    </div>
  ); // text modified in funciton
};
