import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { StaticQuery, graphql, Link } from 'gatsby';

export default ({ text }) => {
  // type one text in the typwriter
  const [showText, setShowText] = useState('Ello mate');

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
    } else if (typeof fnCallback === 'function') {
      setTimeout(fnCallback, 200);
    } // call callback after timeout recursivly (HOW FAST IT TYPES)
  };
  const StartTextAnimation = (i) => {
    // start a typewriter animation for a text in the text array
    // check if text[i] exists
    if (typeof text[i] === 'undefined') {
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
      console.warn('finished iteration');
    }
  };

  // component mounted, now we can query html in dom and modify it, load animation at index 0
  useEffect(() => {
    StartTextAnimation(0);
  }, []); // stop when text isnt changed

  return (
    <div>
      <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: showText }} />
    </div>
  ); // text modified in funciton
};
