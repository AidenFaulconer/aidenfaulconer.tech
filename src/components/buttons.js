import React, { Component } from "react";

import { ThemeProvider, useTheme } from "emotion-theming";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Icon, InlineIcon } from "@iconify/react";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import chevronRight from "@iconify/icons-ic/round-arrow-right";
import { CSSTransition } from "react-transition-group";

export const test = {
  color: "#8EF2D2",
  color2: "#5A00DB",
  text: "#FFFFFF",
  text2: "#300075",
};

const Button = styled.button`
  ${"" /* border-radius: ${props => props.theme.corners.borderRadius1}; */}
  ${"" /* padding: ${props => props.padding}; */}
  border: none;
  text-decoration: none;
  ${"" /* font-size: ${props => props.theme.text.sizes.small}; */}
  pointer-events: all;
  z-index: 100;
  display: inline-flex;
  margin: auto;
  flex: 2 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &.-primary {
    ${"" /* color: ${props => props.theme.colors.textSecondary}; */}
    ${"" /* background: ${props => props.theme.colors.primary}; */}
  }
  &.-secondary {
    ${"" /* color: ${props => props.theme.colors.textSecondary}; */}
    ${"" /* background: ${props => props.theme.colors.textPrimary}; */}
  }
  &.-none {
    ${"" /* color: ${props => props.theme.colors.textSecondary}; */}
    background: transparent;
  }

  & svg {
    width: 25px;
    height: 25px;
    position: relative;
    z-index: 1;
    ${"" /* ${props => props.theme.transitions.primary("margin-left")}; */}
  }

  &:hover {
    cursor: pointer;
    & svg {
      margin-left: 50px;
      ${"" /* ${props => props.theme.transitions.primary("margin-left")}; */}
    }
  }

  & p {
    font-family: poppins;
    font-weight: 400;
    ${"" /* font-size: ${props => props.theme.text.sizes.small}; */}
    text-align: center;
    margin: auto;
  }
`;

export const defaultPadding = "12.5px";

export const BtnPrimary = ({
  children,
  callback,
  text,
  theme,
  padding,
  color,
  bg,
}) => (
  <Button
    type="button"
    onClick={callback}
    padding={padding || defaultPadding}
    className="-primary"
    style={{ color: color || "", background: bg || "" }}
  >
    {children}
    <p>{text}</p>
    <Icon icon={chevronRight} />
  </Button>
);
export const BtnSecondary = ({
  children,
  callback,
  text,
  theme,
  padding,
  color,
  bg,
}) => (
  <Button
    type="button"
    onClick={callback}
    padding={padding || defaultPadding}
    className="-secondary"
    style={{ color: color || "", background: bg || "" }}
  >
    {children}
    <p>{text}</p>
    <Icon icon={chevronRight} />
  </Button>
);
export const Btn = ({ children, text, theme, callback, padding, color }) => (
  <Button
    type="button"
    onClick={callback}
    padding={padding || defaultPadding}
    className="-none"
    style={{ color: color || "" }}
  >
    {children}
    <p>{text}</p>
    <Icon icon={chevronRight} />
  </Button>
);

export const blobs = {
  1: `<svg width="258" height="254" viewBox="0 0 258 254"  xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M174.084 30.5772C191.585 39.6774 199.174 49.3474 210.749 65.3201C222.787 81.9311 232.266 92.4654 232.858 112.971C233.447 133.358 224.975 144.542 213.77 161.584C202.186 179.202 192.513 187.338 175.182 199.348C157.274 211.758 146.181 220.441 124.51 222.693C103.375 224.889 88.6741 223.346 71.3656 211.02C53.4076 198.232 51.7814 182.481 42.665 162.408C33.9622 143.246 26.6699 132.337 25.4996 111.323C24.3731 91.0981 25.5334 77.8952 35.9361 60.5137C46.2786 43.2331 57.0614 35.5517 75.4853 27.4188C93.7122 19.3729 106.111 19.6459 126.02 20.4153C145.191 21.1562 157.062 21.7267 174.084 30.5772Z" />
<path d="M173.853 31.0208C191.247 40.0652 198.779 49.6552 210.344 65.6135C211.618 67.371 212.861 69.0589 214.067 70.6962C224.289 84.5707 231.833 94.8103 232.358 112.986C232.901 131.775 225.702 142.649 215.663 157.81C214.908 158.95 214.137 160.115 213.352 161.309C201.816 178.855 192.198 186.948 174.897 198.937C173.666 199.79 172.468 200.625 171.297 201.441C155.413 212.51 144.503 220.112 124.458 222.195C113.911 223.292 105.008 223.45 96.5984 221.812C88.1963 220.175 80.2593 216.74 71.6556 210.613C62.7624 204.28 57.9157 197.22 54.152 189.233C52.2702 185.239 50.6606 181.016 48.9483 176.524L48.9373 176.495C47.2227 171.997 45.4067 167.235 43.1202 162.201C41.4726 158.573 39.8784 155.246 38.3684 152.094C31.8787 138.548 26.9428 128.245 25.9988 111.296C24.8752 91.122 26.0338 78.0326 36.3652 60.7705C41.5121 52.1708 46.7569 45.9781 52.9949 40.9244C59.2371 35.8673 66.4933 31.9347 75.6872 27.8762C93.8024 19.8796 106.102 20.1459 126.001 20.9149C145.164 21.6555 156.938 22.2254 173.853 31.0208Z" stroke="#5A00DB"/>
</g>
<defs>
<filter id="filter0_d" x="0.152832" y="0.0532227" width="257.734" height="253.477" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="5"/>
<feGaussianBlur stdDeviation="12.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0 0 0 0 0 0.290196 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`,
  2: `<svg width="265" height="282" viewBox="0 0 265 282"  xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M61.7558 23.4058C96.2524 12.1707 143.763 31.2146 179.982 63.9309C216.559 96.9706 255.099 144.763 232.312 178.785C209.367 212.807 117.04 280.944 61.7558 237.324C24.0437 207.569 23.8121 157.186 26.3439 119.525C29.034 81.8633 27.101 34.4827 61.7558 23.4058Z" />
<path d="M61.908 23.8821L61.9106 23.8812C79.0182 18.3095 99.4001 20.2337 120.054 27.6571C140.702 35.0785 161.58 47.9818 179.647 64.302C197.919 80.8072 216.652 100.972 227.972 121.234C239.298 141.507 243.132 161.733 231.897 178.507C220.482 195.431 191.74 220.917 158.944 236.72C126.132 252.531 89.4736 258.557 62.0655 236.932C24.5816 207.356 24.3095 157.243 26.8427 119.559C27.1614 115.099 27.4151 110.509 27.6718 105.864C28.5017 90.8531 29.3632 75.2693 32.55 61.6097C36.7184 43.7428 44.8276 29.3416 61.908 23.8821Z" stroke="#5A00DB"/>
</g>
<defs>
<filter id="filter0_d" x="0.434082" y="0.164062" width="263.707" height="281.297" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="5"/>
<feGaussianBlur stdDeviation="12.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0 0 0 0 0 0.290196 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`,
  3: `<svg width="377" height="378" viewBox="0 0 377 378"  xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M108.439 117.822C139.414 75.7803 178.182 42.492 228.041 58.0208C283.189 75.1971 278.888 150.654 285.028 194.508C291.277 238.252 271.134 255.085 242.306 277.258C194.876 313.738 125.197 307.731 90.147 259.234C57.5293 214.102 75.4084 162.653 108.439 117.822Z" />
<path d="M284.533 194.577L284.533 194.579C287.644 216.356 284.181 231.376 276.398 243.705C268.595 256.065 256.427 265.766 242.001 276.861C194.766 313.192 125.417 307.182 90.5522 258.941C58.138 214.091 75.8409 162.909 108.841 118.119C124.313 97.1196 141.701 78.3496 161.412 66.7636C181.105 55.1883 203.116 50.7815 227.892 58.4982C255.219 67.0093 267.858 89.9553 274.427 116.381C277.711 129.591 279.47 143.642 280.791 157.145C281.213 161.452 281.59 165.707 281.958 169.86C282.743 178.712 283.487 187.106 284.533 194.577Z" stroke="#5A00DB"/>
</g>
<defs>
<filter id="filter0_d" x="0.427734" y="0.861328" width="376.232" height="376.232" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="5"/>
<feGaussianBlur stdDeviation="12.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0 0 0 0 0 0.290196 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`,
};
export const BtnBlob = ({ children, text, theme, blob }) => (
  <TouchRipple>
    <Button color={text.color2}>
      {children}
      {text}
      <InlineIcon icon={blobs[blob]} />
      <div dangerouslySetInnerHTML={{ __html: blobs[blob] }} />
    </Button>
  </TouchRipple>
);
