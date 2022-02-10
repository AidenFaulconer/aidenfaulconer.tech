import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Card,
  useTheme,
} from '@material-ui/core';
import * as React from 'react';
import { useBreakpoints } from 'react-use-breakpoints';
import { useStaticQuery } from 'gatsby';
import CircleType from 'circletype';
import GraphemeSplitter from 'grapheme-splitter';
import LinesEllipsis from 'react-lines-ellipsis';
import {
  RegularButton,
  SecondaryButton,
  SelectionButton,
  ThirdButton,
} from './custom/buttons';
import { CardCarousel } from './custom/cards';

import {
  hexToAlpha,
  pxToRem,
  SCROLL_PROPS,
  svgEncodeBaseSixtyFour,
  threeDHoverKeyframes,
  transition,
} from '../store/theme';

// ========================================================================== //
// Images
// ========================================================================== //
import aboutImage from '../../static/assets/portfolio/about.png';
import _ from '../../static/assets/portfolio/cad.png';
import languagesImage from '../../static/assets/portfolio/languages.png';

// ========================================================================== //
// services
// ========================================================================== //
import websiteImage from '../../static/assets/portfolio/website.png';
import vrImage from '../../static/assets/portfolio/vr.mp4';
import designImage from '../../static/assets/portfolio/lots.png';
import appsImage from '../../static/assets/portfolio/apps.png';
import uiuxImage from '../../static/assets/portfolio/uiux.png';
import brandingImage from '../../static/assets/portfolio/branding.jpg';

// ========================================================================== //
// Experience images
// ========================================================================== //
import awmImage from '../../static/assets/blog/awm.png';
import rvrImage from '../../static/assets/blog/rvr.png';
import rgImage from '../../static/assets/blog/railgun.png';
import afImage from '../../static/assets/blog/me.png';
import lgImage from '../../static/assets/blog/uc.png';
import xprtImage from '../../static/assets/blog/xperthubb.png';
import ajImage from '../../static/assets/blog/aj.png';

import ThreeWrapper from './threejs/three-wrapper';
import { ThreeDCarousel } from './custom/threeDCarousel';

import introImage from '../../static/assets/portfolio/intro.png';

import resume from '../../static/assets/portfolio/resume.pdf';
import { embroidery } from './custom/illustrations';

import services_image from '../../static/assets/portfolio/service-web.png';

// ========================================================================== //
// SVGS
// ========================================================================== //
export const createOutsideTheBoxSpinText = '';

export const creativeAdaptiveDiversifiedSlidingText = `
<svg xmlns="http://www.w3.org/2000/svg" width="1124" height="97" fill="none" viewBox="0 0 1124 97">
  <defs/>
  <path stroke="#000064" stroke-width=".5" d="M46.64 66.296h12.24c2.448 0 3.864-.216 4.248-.648 2.304-2.256 3.456-5.448 3.456-9.576v-32.4h10.224v26.064c0 5.328-2.208 10.224-6.624 14.688-2.976 3.024-6.192 5.376-9.648 7.056-3.408 1.632-6.816 2.448-10.224 2.448H45.2V67.52c-4.848 3.84-9.816 5.952-14.904 6.336v.072H20V23.672H30.296V66.296h6.984c2.448 0 3.864-.216 4.248-.648 2.256-2.256 3.384-5.448 3.384-9.576v-32.4H55.208v26.064c0 5.376-2.208 10.272-6.624 14.688a23.716 23.716 0 01-1.944 1.872zm43.351-19.44v2.88c0 4.512 1.632 8.4 4.896 11.664 3.168 3.264 6.936 4.896 11.304 4.896h-.216.216c2.496 0 3.936-.216 4.32-.648 2.256-2.256 3.384-5.448 3.384-9.576v-8.208c0-4.56-1.608-8.472-4.824-11.736-3.216-3.216-7.008-4.824-11.376-4.824h.216-.216c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v5.4zm34.2-6.12v9c0 5.376-2.208 10.272-6.624 14.688-2.976 3.024-6.192 5.376-9.648 7.056-3.408 1.632-6.816 2.448-10.224 2.448l4.248-3.816-4.248 3.816c-5.04 0-9.312-1.752-12.816-5.256a17.9 17.9 0 01-3.672-5.328 17.763 17.763 0 01-1.512-6.48V46.856h.072c.288-4.992 2.496-9.576 6.624-13.752 2.976-2.976 6.168-5.28 9.576-6.912 3.408-1.68 6.816-2.52 10.224-2.52l-4.248 3.816 4.248-3.816c5.04 0 9.312 1.752 12.816 5.256 3.264 3.264 4.992 7.2 5.184 11.808zM167.046 70.4l2.88 3.528h-10.512l-12.888-16.056c-1.2.24-2.4.36-3.6.36h-5.544v15.696H127.086V23.672H137.382v.144c2.592-.096 5.136-.144 7.632-.144h6.48c4.032 0 7.416 1.392 10.152 4.176 2.736 2.688 4.104 5.976 4.104 9.864v.072l-5.112 3.168 5.112-3.168c0 4.32-1.848 8.352-5.544 12.096a33.262 33.262 0 01-5.832 4.68l12.672 15.84zm-29.664-19.872c1.056.048 3.6.072 7.632.072h6.48l.36.072H153.222c.24-.048.408-.12.504-.216 1.152-1.536 1.728-3.624 1.728-6.264v-.072.072-.072c0-3.504-1.248-6.528-3.744-9.072-2.496-2.496-5.424-3.744-8.784-3.744h-5.544v19.224zm79.687 23.328l-.072.072h-17.064l-12.24-12.312c-2.304-2.256-3.84-4.968-4.608-8.136v20.448H172.789V23.672H183.085v21.024c.96-3.792 2.976-7.248 6.048-10.368l10.656-10.656H205.621l-3.672 3.672-5.76 5.76c-2.256 2.256-3.384 5.448-3.384 9.576 0 4.56 1.608 8.472 4.824 11.736l15.768 15.84 3.672 3.6zm58.845-28.872h13.032c3.216 0 5.952 1.104 8.208 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.584 6.912-4.752 10.08-4.992 5.04-10.08 7.56-15.264 7.56h-24.48v-7.632h33.552c.432-.96.648-2.184.648-3.672 0-2.736-.984-5.088-2.952-7.056-1.92-1.968-4.176-2.952-6.768-2.952h-13.032c-3.216 0-5.952-1.104-8.208-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.584-6.936 4.752-10.152 5.04-4.992 10.128-7.488 15.264-7.488h24.48v7.632h-33.048-.216a.306.306 0 00-.288 0c-.432.96-.648 2.184-.648 3.672 0 2.736.984 5.088 2.952 7.056 1.92 1.968 4.176 2.952 6.768 2.952zm57.473-13.68h-12.168c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v32.472H303.219V47.864c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h5.184v6.408c4.848-3.84 9.816-5.976 14.904-6.408h10.224v50.256h-10.224V31.304h-6.984c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v32.472H324.819V47.864c0-5.376 2.232-10.296 6.696-14.76a22.791 22.791 0 011.872-1.8zm65.239-7.272l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632H373.93l-2.952 7.632h-8.064l.504-1.224 17.784-42.624 2.664-6.408H398.482l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zM459.054 70.4l2.88 3.528h-10.512l-12.888-16.056c-1.2.24-2.4.36-3.6.36h-5.544v15.696H419.094V23.672H429.39v.144c2.592-.096 5.136-.144 7.632-.144h6.48c4.032 0 7.416 1.392 10.152 4.176 2.736 2.688 4.104 5.976 4.104 9.864v.072l-5.112 3.168 5.112-3.168c0 4.32-1.848 8.352-5.544 12.096a33.262 33.262 0 01-5.832 4.68l12.672 15.84zM429.39 50.528c1.056.048 3.6.072 7.632.072h6.48l.36.072H445.23c.24-.048.408-.12.504-.216 1.152-1.536 1.728-3.624 1.728-6.264v-.072.072-.072c0-3.504-1.248-6.528-3.744-9.072-2.496-2.496-5.424-3.744-8.784-3.744h-5.544v19.224zm61.255 23.4h.864V31.304h16.488v-7.632h-43.2v7.632h16.488v42.624h9.36zm51.744-42.696h-13.608c-2.448 0-3.888.216-4.32.648-2.256 2.256-3.384 5.448-3.384 9.576v3.456h24.408v7.704h-24.408v13.608h31.608v7.704h-41.904V47.792c0-5.328 2.232-10.248 6.696-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h15.336v7.632h-10.296zM595.46 70.4l2.88 3.528h-10.512L574.94 57.872c-1.2.24-2.4.36-3.6.36h-5.544v15.696H555.5V23.672H565.796v.144c2.592-.096 5.136-.144 7.632-.144h6.48c4.032 0 7.416 1.392 10.152 4.176 2.736 2.688 4.104 5.976 4.104 9.864v.072l-5.112 3.168 5.112-3.168c0 4.32-1.848 8.352-5.544 12.096a33.262 33.262 0 01-5.832 4.68L595.46 70.4zm-29.664-19.872c1.056.048 3.6.072 7.632.072h6.48l.36.072H581.636c.24-.048.408-.12.504-.216 1.152-1.536 1.728-3.624 1.728-6.264v-.072.072-.072c0-3.504-1.248-6.528-3.744-9.072-2.496-2.496-5.424-3.744-8.784-3.744h-5.544v19.224zm80.839 23.4h.864V35.624l21.888 31.896 4.464 6.408h10.224V23.672h-10.224v38.88l-21.456-31.248-4.896-7.416v-.216h-10.296V73.928h9.432zm50.645-27.072v2.88c0 4.512 1.632 8.4 4.896 11.664 3.168 3.264 6.936 4.896 11.304 4.896h-.216.216c2.496 0 3.936-.216 4.32-.648 2.256-2.256 3.384-5.448 3.384-9.576v-8.208c0-4.56-1.608-8.472-4.824-11.736-3.216-3.216-7.008-4.824-11.376-4.824h.216-.216c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v5.4zm34.2-6.12v9c0 5.376-2.208 10.272-6.624 14.688-2.976 3.024-6.192 5.376-9.648 7.056-3.408 1.632-6.816 2.448-10.224 2.448l4.248-3.816-4.248 3.816c-5.04 0-9.312-1.752-12.816-5.256a17.9 17.9 0 01-3.672-5.328 17.763 17.763 0 01-1.512-6.48V46.856h.072c.288-4.992 2.496-9.576 6.624-13.752 2.976-2.976 6.168-5.28 9.576-6.912 3.408-1.68 6.816-2.52 10.224-2.52l-4.248 3.816 4.248-3.816c5.04 0 9.312 1.752 12.816 5.256 3.264 3.264 4.992 7.2 5.184 11.808zm28.743 33.192h.864V31.304h16.488v-7.632h-43.2v7.632h16.488v42.624h9.36zm91.2 0h-.864V52.616h-23.904V73.928H816.359V23.672H826.655V44.984h23.904V23.672H860.855V73.928h-9.432zm47.969-49.896l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632h-26.928l-2.952 7.632h-8.064l.504-1.224 17.784-42.624 2.664-6.408H899.248l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zM959.819 70.4l2.88 3.528h-10.512l-12.888-16.056c-1.2.24-2.4.36-3.6.36h-5.544v15.696H919.859V23.672H930.155v.144c2.592-.096 5.136-.144 7.632-.144h6.48c4.032 0 7.416 1.392 10.152 4.176 2.736 2.688 4.104 5.976 4.104 9.864v.072l-5.112 3.168 5.112-3.168c0 4.32-1.848 8.352-5.544 12.096a33.262 33.262 0 01-5.832 4.68l12.672 15.84zm-29.664-19.872c1.056.048 3.6.072 7.632.072h6.48l.36.072H945.995c.24-.048.408-.12.504-.216 1.152-1.536 1.728-3.624 1.728-6.264v-.072.072-.072c0-3.504-1.248-6.528-3.744-9.072-2.496-2.496-5.424-3.744-8.784-3.744h-5.544v19.224zm53.407 15.768h-7.703V31.304h16.2c2.448 0 3.888.216 4.32.648 2.256 2.256 3.384 5.424 3.384 9.504v8.28c0 4.56-1.608 8.448-4.824 11.664-3.216 3.264-7.008 4.896-11.377 4.896zm-8.567 7.632h17.064c5.04 0 9.311-1.752 12.811-5.256 3.46-3.456 5.19-7.656 5.19-12.6v-8.208c0-5.376-2.23-10.296-6.7-14.76-2.93-2.976-6.117-5.28-9.573-6.912-3.408-1.68-6.816-2.52-10.225-2.52h-18V73.928h9.433zm69.495-42.696h-13.61c-2.45 0-3.89.216-4.32.648-2.25 2.256-3.38 5.448-3.38 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.91V47.792c0-5.328 2.23-10.248 6.7-14.76 2.97-2.976 6.17-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52h15.34v7.632h-10.3zm53.07 39.168l2.88 3.528h-10.51l-12.89-16.056c-1.2.24-2.4.36-3.6.36h-5.54v15.696H1057.6V23.672H1067.9v.144c2.59-.096 5.13-.144 7.63-.144h6.48c4.03 0 7.42 1.392 10.15 4.176 2.74 2.688 4.11 5.976 4.11 9.864v.072l-5.12 3.168 5.12-3.168c0 4.32-1.85 8.352-5.55 12.096a33.25 33.25 0 01-5.83 4.68l12.67 15.84zm-29.66-19.872c1.05.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.41-.12.5-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.74-9.072-2.5-2.496-5.43-3.744-8.79-3.744h-5.54v19.224z"/>
</svg>

`;

export const anyLanguageAnyFrameworkSlidingText = `
<svg xmlns="http://www.w3.org/2000/svg" width="1297" height="97" fill="none" viewBox="0 0 1297 97">
<defs/>
<path stroke="#000064" stroke-width=".5" d="M55.712 24.032L70.76 66.656l2.52 7.272H60.464l-2.52-7.632H31.016l-2.952 7.632H20l.504-1.224L38.288 30.08l2.664-6.408H55.568l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zm30.404 15.336h.864V35.624l21.888 31.896 4.464 6.408h10.224V23.672h-10.224v38.88L91.372 31.304l-4.896-7.416v-.216H76.18V73.928h9.432zm72.893-42.624l5.04-7.632h8.136l-.864 1.152L155.625 47l-1.008 1.44v25.488H144.321V48.872l-13.104-18-5.256-7.2h12.816l5.4 7.632c.336.48 1.416 1.968 3.24 4.464a376.56 376.56 0 014.176 5.688l6.912-10.152zm85.884 42.624h-33.912V23.672H220.773V66.296h23.616v7.632zm38.573-49.896l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632h-26.928l -2.952 7.632h-8.064l.504-1.224 17.784-42.624 2.664-6.408H282.818l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zm30.404 15.336h.864V35.624l21.888 31.896 4.464 6.408h10.224V23.672h-10.224v38.88l-21.456-31.248-4.896-7.416v-.216H303.43V73.928h9.432zm66.845-50.256h18v7.632H371.211c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v8.28c0 4.512 1.608 8.4 4.824 11.664 3.216 3.264 7.008 4.896 11.376 4.896h7.704V44.984h10.296V73.928H371.211c-5.04 0-9.312-1.752-12.816-5.256-3.456-3.456-5.184-7.656-5.184-12.6v-8.208c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52zm31.12 23.184v2.88c0 4.56 1.608 8.448 4.824 11.664 3.216 3.264 7.008 4.896 11.376 4.896h-.216.216c2.448 0 3.888-.216 4.32-.648 2.256-2.256 3.384-5.448 3.384-9.576v-32.4h10.296v27.36h-.072c-.336 4.896-2.544 9.36-6.624 13.392-2.928 3.024-6.12 5.376-9.576 7.056-3.408 1.632-6.816 2.448-10.224 2.448l4.248-3.816-4.248 3.816c-5.04 0-9.312-1.752-12.816-5.256-3.456-3.456-5.184-7.656-5.184-12.6V23.672h10.296v23.184zm72.737-22.824l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632h-26.928l-2.952 7.632h-8.064l.504-1.224L466.14 30.08l2.664-6.408H483.42l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zm47.467-34.92h18v7.632H522.031c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v8.28c0 4.512 1.608 8.4 4.824 11.664 3.216 3.264 7.008 4.896 11.376 4.896h7.704V44.984h10.296V73.928H522.031c-5.04 0-9.312-1.752-12.816-5.256-3.456-3.456-5.184-7.656-5.184-12.6v-8.208c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52zm52.433 7.56h-13.608c-2.448 0-3.888.216-4.32.648-2.256 2.256-3.384 5.448-3.384 9.576v3.456h24.408v7.704h-24.408v13.608h31.608v7.704h-41.904V47.792c0-5.328 2.232-10.248 6.696-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h15.336v7.632H582.96zm84.822-7.2l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632h-26.928l-2.952 7.632h-8.064l.504-1.224 17.784-42.624 2.664-6.408H667.638l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zm30.404 15.336h.864V35.624l21.888 31.896 4.464 6.408h10.224V23.672h-10.224v38.88l-21.456-31.248-4.896-7.416v-.216H688.25V73.928h9.432zm72.893-42.624l5.04-7.632h8.136l-.864 1.152L767.695 47l-1.008 1.44v25.488H756.391V48.872l-13.104-18-5.256-7.2h12.816l5.4 7.632c.336.48 1.416 1.968 3.24 4.464a376.56 376.56 0 014.176 5.688l6.912-10.152zm86.172 0h-16.2c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v3.528h27.072v7.632h-27.072V73.928H822.547V47.864c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h18v7.632h-10.296zm53.08 39.096l2.88 3.528h-10.512l-12.888-16.056c-1.2.24-2.4.36-3.6.36h-5.544v15.696H869.867V23.672H880.163v.144c2.592-.096 5.136-.144 7.632-.144h6.48c4.032 0 7.416 1.392 10.152 4.176 2.736 2.688 4.104 5.976 4.104 9.864v.072l-5.112 3.168 5.112-3.168c0 4.32-1.848 8.352-5.544 12.096a33.262 33.262 0 01-5.832 4.68l12.672 15.84zm-29.664-19.872c1.056.048 3.6.072 7.632.072h6.48l.36.072H896.003c.24-.048.408-.12.504-.216 1.152-1.536 1.728-3.624 1.728-6.264v-.072.072-.072c0-3.504-1.248-6.528-3.744-9.072-2.496-2.496-5.424-3.744-8.784-3.744h-5.544v19.224zm71.119-26.496l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632h-26.928l-2.952 7.632h-8.064l.504-1.224 17.784-42.624 2.664-6.408H951.138l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zm51.142-27.288h-12.17c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v32.472H971.75V47.864c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h5.184v6.408c4.85-3.84 9.82-5.976 14.9-6.408h10.23v50.256H1018.33V31.304h-6.98c-2.5 0-3.94.216-4.32.648-2.26 2.256-3.38 5.424-3.38 9.504v32.472h-10.3V47.864c0-5.376 2.232-10.296 6.7-14.76.52-.576 1.15-1.176 1.87-1.8zm61.13-.072h-13.6c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.39 5.448-3.39 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.9V47.792c0-5.328 2.23-10.248 6.69-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.45-1.68 6.89-2.52 10.29-2.52h15.34v7.632h-10.3zm39.75 35.064h12.24c2.45 0 3.87-.216 4.25-.648 2.31-2.256 3.46-5.448 3.46-9.576v-32.4H1132.97v26.064c0 5.328-2.21 10.224-6.62 14.688-2.98 3.024-6.19 5.376-9.65 7.056-3.41 1.632-6.82 2.448-10.22 2.448h-5.12V67.52c-4.84 3.84-9.81 5.952-14.9 6.336v.072h-10.3V23.672H1086.46V66.296h6.98c2.45 0 3.87-.216 4.25-.648 2.26-2.256 3.39-5.448 3.39-9.576v-32.4h10.29v26.064c0 5.376-2.21 10.272-6.62 14.688-.63.672-1.27 1.296-1.95 1.872zm43.36-19.44v2.88c0 4.512 1.63 8.4 4.89 11.664 3.17 3.264 6.94 4.896 11.31 4.896h-.22.22c2.49 0 3.93-.216 4.32-.648 2.25-2.256 3.38-5.448 3.38-9.576v-8.208c0-4.56-1.61-8.472-4.82-11.736-3.22-3.216-7.01-4.824-11.38-4.824h.22-.22c-2.5 0-3.94.216-4.32.648-2.26 2.256-3.38 5.424-3.38 9.504v5.4zm34.2-6.12v9c0 5.376-2.21 10.272-6.63 14.688-2.97 3.024-6.19 5.376-9.65 7.056-3.4 1.632-6.81 2.448-10.22 2.448l4.25-3.816-4.25 3.816c-5.04 0-9.31-1.752-12.82-5.256a17.968 17.968 0 01-3.67-5.328 17.883 17.883 0 01-1.51-6.48V46.856h.07c.29-4.992 2.5-9.576 6.63-13.752 2.97-2.976 6.16-5.28 9.57-6.912 3.41-1.68 6.82-2.52 10.23-2.52l-4.25 3.816 4.25-3.816c5.04 0 9.31 1.752 12.81 5.256 3.27 3.264 4.99 7.2 5.19 11.808zm42.85 29.664l2.88 3.528h-10.51l-12.89-16.056c-1.2.24-2.4.36-3.6.36h-5.54v15.696H1183.25V23.672H1193.55v.144c2.59-.096 5.13-.144 7.63-.144h6.48c4.03 0 7.41 1.392 10.15 4.176 2.74 2.688 4.1 5.976 4.1 9.864v.072l-5.11 3.168 5.11-3.168c0 4.32-1.84 8.352-5.54 12.096a33.25 33.25 0 01-5.83 4.68l12.67 15.84zm-29.66-19.872c1.05.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.4-.12.5-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.75-9.072-2.49-2.496-5.42-3.744-8.78-3.744h-5.54v19.224zm79.68 23.328l-.07.072h-17.06l-12.24-12.312c-2.31-2.256-3.84-4.968-4.61-8.136v20.448H1228.95V23.672H1239.25v21.024c.96-3.792 2.98-7.248 6.05-10.368l10.65-10.656h5.84l-3.68 3.672-5.76 5.76c-2.25 2.256-3.38 5.448-3.38 9.576 0 4.56 1.61 8.472 4.82 11.736l15.77 15.84 3.67 3.6z"/>
</svg>

`;
export const anyLanguageAnyFrameworkSpinText = `

`;

// ========================================================================== //
// Shifting type
// ========================================================================== //
const useSlidingText = makeStyles((theme) => ({
  '@keyframes animatedType': {
    from: {
      backgroundPosition: '0 0',
    },
    to: {
      backgroundPosition: '100% 0',
    },
  },
  movingType: {
    position: 'absolute',
    display: 'flex',
    // justifyContent: 'space-evenly',
    // flexDirection: 'column',
    // minHeight: '90vh',
    margin: 'auto',
    // opacity: 0.3,
    minWidth: '200vw',
    width: '200%',
    left: '-50%',
    opacity: 0.5,
    height: '70%',
    zIndex: '10 !important',
  },
  type: {
    display: 'inline-block',
    height: '100%',
    fill: theme.palette.text.primary,
    // backgroundColor: theme.palette.text.primary,
    // height: '100%',
    width: '100%',
    animation: '$animatedType 24s linear infinite alternate',
    // tilt look
    margin: 'auto',
    // transform: 'rotate3d(116, -17, 28, 58deg)',
    transform: 'rotate3d(31, -17, 28, 58deg)',
    backgroundImage: ({ svg }) => svgEncodeBaseSixtyFour(`${svg}`),
  },
}));

export const MovingType = ({ svg }) => {
  const classes = useSlidingText({ svg });
  return (
    <div className={classes.movingType}>
      <span className={classes.type} />
    </div>
  );
};

// ========================================================================== //
//  Index page styles
// ========================================================================== //
const useStyles = makeStyles((theme) => {
  const common = {
    background: ({ bgAlt }) => (bgAlt ? theme.palette.text.primary : theme.palette.text.secondary),
    borderRadius: theme.custom.borders.brandBorderRadius,
  };
  const sectionDimensions = {
    minHeight: '90vh',
    maxHeight: '90vh',
    height: '90vh',
    position: 'relative',
    // scrollSnapAlign: 'start',

  };
  return {
    section: {
      overflow: 'hidden',
      // may want bg later
      ...sectionDimensions,
      // borderTop: 0,
      borderLeft: theme.custom.borders.brandBorder,
      borderRight: theme.custom.borders.brandBorder,
      borderTop: theme.custom.borders.brandBorder,
    },
    carouselSection: {
      // overflow: 'hidden',
      // border: theme.custom.borders.brandBorder,
      borderRight: theme.custom.borders.brandBorder,
      height: '100%',
      color: theme.palette.text.primary,
      ...sectionDimensions,
      '& .carousel-container': {
        position: 'relative',
        height: '100%',
        overflowY: 'hidden',
        // background: `linear-gradient(45deg, ${hexToAlpha(theme.palette.text.secondary, 0.3)}, ${hexToAlpha(theme.palette.text.primary, 1)})`,
        // background: theme.palette.text.primary,
      },
    },
    selectionMenu: {
      minHeight: 600,
      position: 'relative',
      border: theme.custom.borders.brandBorder,
      flexDirection: 'row',
      // display: 'flex',
      // alignItems: 'flex-start',
      // flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    selectionOptions: {
      display: 'inline-flex',
      gap: theme.spacing(4),
      width: '100%',
      overflowX: 'scroll',
      padding: theme.spacing(8, 8),
      flexDirection: 'column',
      background: theme.palette.text.secondary,
      border: theme.custom.borders.brandBorder,

      flexWrap: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row !important',
      },
      '& * > ul': {
        width: '100%',
      },
    },
    container: {
      // padding: theme.spacing(3, 0),
    },
    graphic: {
      // border: theme.custom.borders.brandBorder,
      // [theme.breakpoints.down('sm')]: {
      //   display: 'none',
      //   visibility: 'none',
      //   borderLeft: 0,
      // },
      borderRadius: theme.custom.borders.brandBorderRadius,
      // borderLeft: 'none',
      zIndex: 20,
      width: '100%',
      transform: 'scale(.8)',
      marginBottom: theme.spacing(12),
      position: ({ absolute }) => (absolute ? 'absolute' : 'relative'),
      display: 'inline',
    },
    descriptor: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      borderLeft: 0,
      borderRight: 0,
      // alignContent: 'end',
      alignContent: 'flex-end',
      '& h1': {
        textTransform: 'capitalize',
        textAlign: 'center',
      },
    },
    typography: {
      color: ({ bgAlt }) => (bgAlt === 2
        ? theme.palette.background.button
        : bgAlt === 1
          ? theme.palette.text.primary
          : theme.palette.text.secondary),
    },
    blogContainer: {
      // background: theme.palette.primary.main,
      // color: theme.palette.secondary.main,
      overflow: 'hidden',
      paddingBottom: theme.spacing(12),
    },
    whatDoYouNeed: {
      // marginTop: theme.spacing(6),
      // marginLeft: `${-23}px !important`,
      // marginRight: `${-23}px !important`,
      background: theme.palette.text.primary,
    },
    offerContainer: {
      overflow: 'hidden',
    },
    serviceCard: {
      // width: 300,
      // height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'stretch',
      maxHeight: 850,
      margin: theme.spacing(3),
      transform: `scale(${0.85})`,
      padding: theme.spacing(3),
      position: 'relative',
      border: theme.custom.borders.brandBorderSecondary,
      borderRadius: theme.custom.borders.brandBorderRadius,
      background: ({ bgColor }) => `linear-gradient(180deg, ${bgColor} 100%, rgba(17, 159, 116, 0) 100%)`,
      '& ul': {
        borderBottom: theme.custom.borders.brandBorderSecondary,
        borderTop: theme.custom.borders.brandBorderSecondary,
        '& li': {
          borderBottom: theme.custom.borders.brandBorderSecondary,
          borderTop: theme.custom.borders.brandBorderSecondary,
          paddingLeft: 10,
          paddingBottom: 10,
          paddingTop: 10,
          listStyle: 'upper-roman',
          listStylePosition: 'outside',
          '&::marker': {
            fontWeight: 'bolder',
            fontFamily: 'cursive',
          },
        },
      },
      '& .media': {
        position: 'relative',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '25%',
        display: 'block',
        minWidth: 0,
        objectFit: 'cover',
        boxShadow: theme.custom.shadows.brandBig,
        border: theme.custom.borders.brandBorder,
        minHeight: 200,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(6),
        transform: 'rotate3d(0, 0, 0, 0)',
        transition: 'transform 0.5s ease-in-out',
        '&:hover': {
          transition: 'transform 0.5s ease-in-out',
          transform: 'rotate3d(30, -7, 18, 62.58deg) scale(.85)',
        },
      },
    },
    whatDoYouNeedPoints: {
      marginTop: theme.spacing(5),
      paddingLeft: 0,
      textAlign: 'left',
      // listSyle: "none",
      listStyle: 'circle',
      '& li': {
        margin: theme.spacing(1, 0),
        // listStyleImage: `url(${listStyleImage})`,
      },
    },
    scaledTypography: {
      resize: 'both',
      margin: 0,
      padding: 0,
      height: '200px',
      width: '100%',
      overflow: 'hidden',
    },
    descriptorDescription: {
      paddingRight: theme.spacing(3),
      height: '100%',
    },
    introContainer: {
      color: theme.palette.text.primary,
      overflow: 'hidden',
      maxHeight: 400,
      border: theme.custom.borders.brandBorderSecondary,
      // background: theme.palette.background.secondary,
      // background: svgEncodeBaseSixtyFour(embroidery),
      background: '#B7CAFF',
      backgroundRepeat: '160%',
      '& #brandImage': {
        // 3d animation
      },
      '& > img': {
        objectFit: 'contain',
      },
    },
  };
});

// ========================================================================== //
// Content padding
// ========================================================================== //

const contentColSpacing = 12;

export const scaledTypography = (text) => {
  const classes = useStyles();
  return (
    <div className={classes.scaledTypography}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 200"
        preserveAspectRatio="xMinYMin meet"
      >
        <foreignObject
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/1999/xhtml"
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style="background-color:lightgreen;"
          >
            <h1>heading</h1>
            <p>Resize the blue box.</p>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};
// ========================================================================== //
// INTRO
// ========================================================================== //
export const Intro = React.forwardRef((props, ref) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <Grid
      item
      container
      alignContent="stretch"
      xs={12}
      md={12}
      className={styles.introContainer}
    >
      {/* Left */}
      <Grid
        item
        container
        xs={5}
        style={{
          borderRight: theme.custom.borders.brandBorderSecondary,
          padding: theme.spacing(3),
        }}
      >
        {/* Qualification */}
        <Grid item>
          <Typography color="inherit" variant="h3" align="left" gutterBottom>
            QUALIFICATIONS
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: theme.spacing(2), borderTop: theme.custom.borders.brandBorderSecondary }}>
          <Typography color="inherit" variant="body2" align="left" gutterBottom>
            Certificate IV Business
          </Typography>
          <Typography color="inherit" variant="body1" align="left" gutterBottom>
            Navitas Professional
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: theme.spacing(2), borderTop: theme.custom.borders.brandBorderSecondary }}>
          <Typography color="inherit" variant="body2" align="left" gutterBottom>
            Bachelor Of Software Engineering
          </Typography>
          <Typography color="inherit" variant="body1" align="left" gutterBottom>
            University of Canberra
          </Typography>
        </Grid>
      </Grid>

      {/* Middle */}
      <Grid
        item
        container
        sm={4}
        xs={7}
        justify="center"
        alignItems="center"
        style={{
          padding: theme.spacing(4),
          margin: 'auto',
        }}
      >
        <div style={{ alignSelf: 'center' }}>
          {/* Resume */}
          <Typography color="inherit" variant="h3" align="left" gutterBottom>
            Download my CV
          </Typography>
          <Grid item container>
            <img
              src={introImage}
              id="introImage"
              style={{
                borderRadius: theme.custom.borders.brandBorderRadius,
                objectFit: 'cover',
                height: '100%',
                width: '100%',
                maxHeight: 200,
                minWidth: 360,
                transformStyle: 'preserve-3d',
                transform: 'rotate3d(0, 0, 0, 0)',
              }}
              alt="intro"
            />
            {/* download a file onclick */}
            <ThirdButton
              size="small"
              onClick={() => {
              // write code to download a file in javascript
              // window.location.href = "https://www.google.com";

              }}
            >
              Download CV
            </ThirdButton>
          </Grid>
        </div>
      </Grid>

    </Grid>
  );
});

// ========================================================================== //
// descriptor
// ========================================================================== //
const Descriptor = ({ styleData, children }) => {
  const {
    title = '',
    description = '',
    ctas = [],
    altButtons = 0,
    bgAlt = false,
    border = false,
    rounded = false,
    svg,
  } = styleData;
  const classes = useStyles({ bgAlt, border, rounded });
  const { breakpoint } = useBreakpoints();
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        className={classes.descriptor}
        alignContent="space-between"
      >
        {/* shifting type and graphic */}
        {/* splits to a relative title, with absolute bg text */}
        {children}

        {/* description */}
        <Grid
          item
          container
          alignContent="flex-end"
          style={{
            // display: 'inline-block',
            // background: theme.palette.text.secondary,
            borderTop: theme.custom.borders.brandBorder,
            // borderBottom: '86px solid',
            borderLeft: 0,
            borderRight: 0,
            padding: theme.spacing(3, 3),
            zIndex: 11,
            textAlign: 'left',
            color: theme.palette.text.primary,
            marginBottom: -4,
            width: '101%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Typography color="inherit" variant="h3" align="left" gutterBottom>
            How?
          </Typography>
          <Grid
            item
            xs={12}
            style={{
              alignContent: 'center',
              display: 'grid',
              height: 311.5,
              maxHeight: 311.5,
            }}
          >
            <Typography
              color="inherit"
              variant="body1"
              align="left"
              gutterBottom
            >
              {description || ''}
            </Typography>
          </Grid>
          {/* CTA */}
          <Grid
            item
            container
            justify="space-between"
            alignContent="center"
            xs={12}
            style={{ marginTop: theme.spacing(2) }}
          >
            {ctas[0]
              && ((altButtons === 0 && (
                <RegularButton size="large">{ctas[0]}</RegularButton>
              ))
                || (altButtons === 1 && (
                  <SecondaryButton size="large">{ctas[0]}</SecondaryButton>
                )) || <ThirdButton color="textPrimary">{ctas[0]}</ThirdButton>)}
            {ctas[1]
              && ((altButtons === 0 && (
                <RegularButton size="large">{ctas[1]}</RegularButton>
              ))
                || (altButtons === 1 && (
                  <SecondaryButton size="large">{ctas[1]}</SecondaryButton>
                )) || <ThirdButton color="textPrimary">{ctas[1]}</ThirdButton>)}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// export const splitter = new GraphemeSplitter();
// ========================================================================== //
// GRAPHIC
// ========================================================================== //
const Graphic = (props) => {
  const {
    src,
    alt,
    bgAlt = false,
    border,
    slidingText,
    spinText,
    title,
    scale = 1,
    absolute = false,
  } = props;
  const classes = useStyles({ bgAlt, border, absolute });
  const theme = useTheme();

  // curve text
  // const ref = React.useRef(null);
  // let circleType = null;
  // React.useEffect(() => {
  //   circleType = new CircleType(ref?.current,
  //     splitter.splitGraphemes.bind(splitter), // bind to this circletype method to automatically split the elements content text
  //   );
  // }, [ref.current]);

  return (
    <>
      <MovingType svg={slidingText} />
      <div
        className={classes.graphic}
        style={{ transform: `scale(${scale})` }}
      >
        {/* create graphic image */}
        {/* define circular text with emojis, get a htmlelement ref from react so it can be used with circleType */}
        {/* title */}

        <Typography
          color="inherit"
          gutterBottom
          align="center"
          variant="h2"
          style={{
            margin: theme.spacing(24, 0),
            transform: 'scale(1)',
            // copied from theme for H1
            [theme.breakpoints.down('xl')]: {
              transform: 'scale(1)',
            },
            [theme.breakpoints.down('lg')]: {
              transform: 'scale(.75)',
            },
            [theme.breakpoints.down('md')]: {
              transform: 'scale(.25)',
            },
            [theme.breakpoints.down('sm')]: {
              transform: 'scale(.25)',
            },
          }}
        >
          {title || ''}
        </Typography>
        {/* <div className="spin-container">
          <h1 ref={ref} id="spinText">
            {spinText}
          </h1>
        </div> */}
      </div>
    </>
  );
};

// ========================================================================== //
// ABOUT
// ========================================================================== //
const About = (props) => {
  const classes = useStyles();
  const { id } = props;
  const styleData = {
    bgAlt: 0,
    altButtons: 0,
    rounded: true,
    ctas: ['Read More', 'Book Online'],
    description:
      'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs',
  };
  return (
    <article id={id} className={classes.section}>
      <Descriptor styleData={styleData}>
        <Graphic
          src={aboutImage}
          title={(
            <>
              CREATIVE
              <br />
              ADAPTIVE
              <br />
              DIVERSIFIED
            </>
          )}
          slidingText={creativeAdaptiveDiversifiedSlidingText}
          spinText="CREATE OUTSIDE THE BOX ✍"
        />
      </Descriptor>
    </article>
  );
};

// ========================================================================== //
// Languages
// ========================================================================== //
const languageData = [
  {
    title: 'JavaScript',
    image: awmImage,
    alt: 'JavaScript',
    description: `
    I consider javascript my child, it is where I have spent most of my career developing in, its extremely fast and easy to use especially with modern frameworks such as React, Vue, and more advanced frameworks like Gatsby.js and Quasar.js which can take a codebase and reform it into an ideal web platform, or even compiled down into platform agnostic applications.
    `,
    icon: '',
  },
  {
    title: 'C#',
    image: awmImage,
    alt: 'C#',
    description: `
    In my experience making Virtual Reality appliccations,
    I have heavily relied upon and never been dissapointed by C# in platforms such as Unity,
    or services such as the .NET Core framework for enabling networking within Unity.
    Examples of such applications are data driven game experiences, and data-driven customizable
    interfaces for developers to build from.
    `,
    icon: '',
  },
  {
    title: 'Typescript',
    image: awmImage,
    alt: 'Typescript',
    description: `
    Typescript has become the happy medium between javascript and C#, where javascript can now be typed enabling transparency and better
    debugging and testing capabilities which are important for any large scale javascript driven applications.
    I love Typescript because it is much more readable and maintainable in the long run, because of featues such as type inferencing, and type checking.
    `,
    icon: '',
  },
  {
    title: 'C++',
    image: awmImage,
    alt: 'C++',
    description: `
    C++ Was my first language, and gave me the foundation to learn any language, because C++ covers virtually every aspect of programming on a low level, building a platform to understand any further abstractions present in modern high level languages or low level languages.
    I am knowledgable in advanced C++ concepts such as Generits, Templating, Smart Pointers, Delegations,
    Memory management, and advanced inheritance ie: abstract, virtual, and polymorphism.
    My favourite C++ features are the ability to use templates, and the ability to use smart pointers from the STL.
    `,
    icon: '',
  },
  {
    title: 'Back-End',
    image: awmImage,
    alt: 'Express',
    frameworks: ['Express', 'Node.js', 'IIS', 'ASP.NET', 'ASP.NET Core'],
    description: `
    A complete and extensible backend service is a key part of any web application,
    APIS and services drive revenue and growth and make results measurable,
    and also hold your companies data and make it easy to use. I have created back end applications using ExpressJs,
    MongoDB, SQL, Docker, DJango, PHP, NodeJs, and ASP.NET Core. Further extending backend capabilities with techniques such as Server Side Rendering, Database Fragmenting, and Webpack.
    `,
    icon: '',
  },
  {
    title: 'Python',
    image: awmImage,
    alt: 'Python',
    description: `
    The grandchild of modern day programming languages, Python is a powerful language that has a beautiful community
    and suite of libraries which use very fast code modules written in lower level languages such as C++, Pythons
    power comes from its abiliy to use modules written in other languages, and reduce the amount of code written
    greatly, we see developments in the field of  Machine Learning exploding due to its ability to use Python as
    a scripting language.

    `,
    icon: '',
  },
  {
    title: 'Front-End',
    image: awmImage,
    alt: 'Front-End',
    description: `
    Where I specialise the most, I create full front-end applications using a full process of planning,
    ideating, iterating, procurement, and deployment of a web applications using the software development life cycle and design thinking process in harmony.
    I've become accustomed to many frameworks, preparing me for anything that comes next, because I want my applications to be as prepared for the future as you do.
    Some frameworks i've become very accustomed to through my career are React, Vue, Quasar,
    Gatsby, AngularJS, Django, Next.js, and ASP.NET, where they have been expanded upon
    at scales both large and small, and addressing the scalability proportionally in code.

    Lets create some wacky, user friendly, and interactive applications together. 🥳
    `,
    icon: '',
  },
  {
    title: 'Office',
    image: awmImage,
    alt: 'Office',
    description: '',
    icon: '',
  },
  {
    title: 'Business accumen',
    image: awmImage,
    alt: 'Business accumen',
    description: `
    The biggest challenges I see in the IT and Design industries are 
    the unpredictible scheduling involved, and lack of business focus, I provide detailed plans with enough contingincy time to
    allow for a realistic and predictible timeline for your end product, involving you wherever you
    wish to, so you can have measured results, and plenty of room for collaboration. Alongside this, I document the entire process both in code, and through documentation.

    Businessses today may find it harder to understand and manage the expectations of there users, I've had enough expereince to know how to prototype, do user testing, and turn there ideas into reality taking into account your visions, business processes, and goals.

    Lets create some milestones together. 🤠
    `,
    icon: '',
  },
];

const Languages = (props) => {
  const classes = useStyles();
  const styleData = {
    slidingText: anyLanguageAnyFrameworkSlidingText,
    spinText: anyLanguageAnyFrameworkSpinText,
    bgAlt: 0,
    altButtons: 0,
    // rounded: true,
    ctas: ['Read More', 'Book Online'],
    description:
      'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs',
  };
  return (
    <article className={classes.section}>
      <Descriptor styleData={styleData}>
        <Graphic
          src={languagesImage}
          title={(
            <>
              Any Language
              <br />
              Any Framework
            </>
          )}
          slidingText={anyLanguageAnyFrameworkSlidingText}
          spinText="WORK SMARTER NOT HARDER 🤓"
        />
      </Descriptor>
    </article>
  );
};

// ========================================================================== //
// Experience
// ========================================================================== //
const experienceData = [
  {
    title: 'Australian War Memorial',
    image: awmImage,
    alt: 'JavaScript',
    category: 'Full-Stack Developer',
    description: `
    • Used C#, JavaScript, JSON, REST, back-end & frontend developed 
    • developed in Drupal, React, React360, Unity, JavaScript, & C# 
    • Researching & solving complex front-end & back-end software problems 
    • Team collaboration to deliver VR experiences 
    • Consistent learning & documentation supplying up-to-date technical skills; such as C#, React, & Unity development 
    `,
    icon: '',
  },
  {
    title: 'Recovery VR',
    image: rvrImage,
    alt: 'JavaScript',
    category: 'Full-Stack Developer',
    description: (
      <>
        Use C#, typescript, javascript, with a back-end firebase/graphql and
        frontend vue development
        <br />
        <br />
        Built mini-games, and create on both web and mobile unity apps
        <br />
        <br />
        Programmed frontend application to deliver configurable vr experiences
        <br />
        <br />
        Web interface for full remote-control of Virtual Reality experiences
        <br />
        <br />
        developed CI/CD pipelines for back-end and front-end development
        operations in Gitlab
        <br />
        <br />
        Perform auto-scaling and load-balancing via Kubernetes and Docker
        through GitLab pipelines and hosting services provided by Google Cloud
        Platform
        <br />
        <br />
        Extending the apollo platform to develop a versatile and clean backend
        API with GraphQL
        <br />
        <br />
        UI/UX balanced and designed iteratively with changing clients needs
        <br />
        <br />
      </>
    ),
    icon: '',
  },
  {
    title: 'Freelance',
    image: afImage,
    alt: 'JavaScript',
    category: 'Graphic Design, Full-Stack Development',
    description: `
    • Designing and iterating through logos to match the desired image of a given brand 
    • Website design, including interactions prototyped through framer 
    • Designing websites for friends/acquaintances/family members 
    • Developing shopfronts with Shopify, and Big-commerce 
    • Utilising WordPress to enable easy content management in given websites 
    • Facilitating work through React, Vue, Framer, Figma, and various cloud storage providers 
    `,
    icon: '',
  },
  {
    title: 'XpertHubb',
    image: xprtImage,
    alt: 'JavaScript',
    category: 'Full-Stack Developer',
    description: `
    • Working in a very high-paced startup environment, networking and managing through startup school and IACT community engagement 
    • Development through Javascript, React, and back-end development through express and MongoDB 
    • Developing a software platform through the cloud services via AWS(IAAS), MongoDB(DAAS), and Stripe(SAAS) 
    • Researching & solving problems in the world of mentor-ships 
    • Engagement with clients and management to create a product they want 
    `,
    icon: '',
  },
  {
    title: 'Railgun',
    image: rgImage,
    alt: 'JavaScript',
    category: 'Full-Stack Developer',
    description: `
    • Typescript, vue, quasar, frontend development with blockchain api’s 
    • Design and brand consultation for communicating the wallet and brands purpose 
    • Developing a secure crypto wallet utilising ethereum smart-contracts 
    • Full UI/UX design and development for the desired application 
    `,
    icon: '',
  },
  {
    title: "L'arche Genesaret",
    image: lgImage,
    alt: 'JavaScript',
    category: 'Disability support worker',
    description: `
    • Creating harmony and wellbeing amongst different individuals in a shared space  
    • Identifying emotional and social pressure points and alleviating them 
    • Conflict resolution taking into consideration wildly different conflicting goals/needs 
    • Compassionate and empathetic social developmental support  
    • Administrative NDIS documentation and reporting  
    • Medication handling and medical practitioner liaise 
    `,
    icon: '',
  },
  {
    title: 'AJ Gardencare',
    image: ajImage,
    alt: 'JavaScript',
    category: 'Full-Stack Developer',
    description: `
    • Creating harmony and wellbeing amongst different individuals in a shared space  
    • Identifying emotional and social pressure points and alleviating them 
    • Conflict resolution taking into consideration wildly different conflicting goals/needs 
    • Compassionate and empathetic social developmental support  
    • Administrative NDIS documentation and reporting  
    • Medication handling and medical practitioner liaise 
    `,
    icon: '',
  },
  {
    title: 'You',
    image: ajImage,
    alt: 'JavaScript',
    category: 'Lets find out together',
    description: `
    • Creating harmony and wellbeing amongst different individuals in a shared space  
    • Identifying emotional and social pressure points and alleviating them 
    • Conflict resolution taking into consideration wildly different conflicting goals/needs 
    • Compassionate and empathetic social developmental support  
    • Administrative NDIS documentation and reporting  
    • Medication handling and medical practitioner liaise 
    `,
    icon: '',
  },
  {
    title: 'ICN',
    image: ajImage,
    alt: 'JavaScript',
    category: 'Consulting',
    description: `
    • Creating harmony and wellbeing amongst different individuals in a shared space  
    • Identifying emotional and social pressure points and alleviating them 
    • Conflict resolution taking into consideration wildly different conflicting goals/needs 
    • Compassionate and empathetic social developmental support  
    • Administrative NDIS documentation and reporting  
    • Medication handling and medical practitioner liaise 
    `,
    icon: '',
  },
];
const Experience = (props) => {
  const classes = useStyles();
  return (
    <>
      <article className={classes.carouselSection}>
        {/* title */}
        {/* <Typography
            color="inherit"
            align="center"
            // {...SCROLL_PROPS}
            variant="h1"
          >
            Experience
          </Typography> */}
        <Grid
          item
          container
          className="carousel-container"
          xs={contentColSpacing}
        >
          <ThreeDCarousel
            alt
            id="skills"
            title="Languages"
            key="languages"
            carouselData={experienceData}
            cardHeight={300}
            cardWidth={600}
          />
        </Grid>
      </article>
    </>
  );
};
const Skills = (props) => {
  const classes = useStyles();
  return (
    <>
      <article className={classes.carouselSection}>
        {/* title */}
        {/* <Typography
            color="inherit"
            align="center"
            // {...SCROLL_PROPS}
            variant="h1"
          >
            Skills
          </Typography> */}
        <Grid
          item
          container
          className="carousel-container"
          xs={contentColSpacing}
        >
          <ThreeDCarousel
            title="Languages"
            key="languages"
            carouselData={languageData}
            cardHeight={150}
            cardWidth={600}
            alt
            special
          />
        </Grid>
      </article>
    </>
  );
};
// ========================================================================== //
// Blog Posts
// ========================================================================== //
const projectsData = [
  {
    title: 'Blog 1',
    src: vrImage,
    alt: 'JavaScript',
    description: '',
    icon: '',
    color: '#119F74',
  },
  {
    title: 'Blog 1',
    src: vrImage,
    alt: 'Blog 1',
    description: '',
    icon: '',
    color: '#B314CD',
  },
  {
    title: 'Blog 1',
    src: vrImage,
    alt: 'Blog 1',
    description: '',
    icon: '',
    color: '#2E00FF',
  },
  {
    title: 'Blog 1',
    src: vrImage,
    alt: 'Blog 1',
    description: '',
    icon: '',
    color: '#A4AF1D',
  },
  {
    title: 'Blog 1',
    src: vrImage,
    alt: 'Blog 1',
    description: '',
    icon: '',
    color: '#DF650D',
  },
  {
    title: 'Blog 1',
    src: vrImage,
    alt: 'Blog 1',
    description: '',
    icon: '',
    color: '#C71073',
  },
];
const BlogPosts = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles();
    const { id, posts } = props;

    return (
      <section
        ref={ref}
        id={id}
        className={(classes.section, classes.blogContainer)}
      >
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={11}>
            <CardCarousel
              {...SCROLL_PROPS}
              title="Languages"
              key="languages"
              carouselData={posts}
              alt
              cardHeight={310}
              cardWidth={310}
            />
          </Grid>
        </Grid>
      </section>
    );
  }),
);

// ========================================================================== //
// Contact
// ========================================================================== //
const Contact = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <section ref={ref} className={classes.section}>
      <Grid container spacing={3}>
        <Grid item xs={contentColSpacing} sm={6} />
        <Grid item xs={5} sm={6} />
      </Grid>
    </section>
  );
});

// ========================================================================== //
// WhatDoYouNeed
// ========================================================================== //

const servicesData = [
  {
    title: 'Websites',
    src: websiteImage,
    priceRange: '$300-$3000',
    color: '#119F74',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>to maintain a new or current website?</li>
          <li>faster SEO, and better performance on your user metrics?</li>
          <li>to integrate your digital transformation strategy effectively</li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'Design',
    src: designImage,
    priceRange: '$300-$3000',
    color: '#B314CD',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'Apps',
    src: appsImage,
    priceRange: '$300-$3000',
    color: '#DF650D',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'UI/UX',
    src: uiuxImage,
    priceRange: '$300-$3000',
    color: '#2E00FF',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'VR',
    src: vrImage,
    color: '#C71073',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'Branding',
    src: brandingImage,
    priceRange: '$300-$3000',
    color: '#A4AF1D',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
];

const WhatDoYouNeedCard = ({ data, index }) => {
  const { breakpoint } = useBreakpoints();
  const {
    src, title, priceRange, color = '#C71073', ctas, description,
  } = data;
  const theme = useTheme();
  const classes = useStyles({ bgColor: color });
  return (
    <>
      <Grid
        item
        lg={Math.ceil(12 / (index % 3 === 0 ? 3 : 4))}
        sm={Math.ceil(12 / (index % 2 === 0 ? 2 : 3))}
        style={{
          border: theme.custom.borders.brandBorder,
        }}
        xs={12}
      >
        <Card
          {...SCROLL_PROPS}
          className={classes.serviceCard}
          style={{ zIndex: 1, marginTop: index % 2 === 0 ? 200 : 0 }}
        >
          {/* Typography */}
          <Typography
            color="inherit"
            component="h2"
            align="left"
            className={classes.typography}
          >
            {title}
          </Typography>
          <Typography
            color="inherit"
            component="h4"
            align="left"
            className={classes.typography}
          >
            {priceRange}
          </Typography>

          {src.includes('mp4') ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="media"
              {...SCROLL_PROPS}
              src={src}
            />
          ) : (
            <img
              alt="What Do You Need Graphic"
              className="media"
              {...SCROLL_PROPS}
              src={src}
            />
          )}
          {/* <LinesEllipsis
            maxLine="6"
            trimRight
            text={description}
            ellipsis=" ..."
            basedOn="letters"
            style={{
              minHeight: 340,
              maxHeight: 340,
              width: '100%',
              textAlign: 'left',
            }}
          > */}
          <Typography
            color="secondary"
            align="left"
            component="body1"
          >
            {description}
          </Typography>
          {/* </LinesEllipsis> */}
          <Grid item>
            <RegularButton size="large">{ctas[0]}</RegularButton>
          </Grid>
        </Card>
        {/* CTA */}
      </Grid>
    </>
  );
};

const WhatDoYouNeed = React.forwardRef((props, ref) => {
  const bgAlt = 0;
  const { id } = props;
  const classes = useStyles({ bgAlt });

  return (
    <section
      id={id}
      ref={ref}
      className={(classes.section, classes.whatDoYouNeed)}
    >
      <SelectionMenu />
    </section>
  );
});
// ========================================================================== //
// Selection Menu
// ========================================================================== //
const SelectionMenu = React.forwardRef((props, red) => {
  const [selections, setSelections] = React.useState({
    websites: {
      title: 'Websites',
      costRange: '400$-5000$',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: services_image,
      name: 'Websites',
    },
    design: {
      title: 'Design',
      costRange: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: services_image,
      name: 'Design',
    },
    vr: {
      title: 'Virtual Reality',
      costRange: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: services_image,
      name: 'Virtual Reality',
    },
    branding: {
      title: 'Branding',
      costRange: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: services_image,
      name: 'Branding',
    },
    other: {
      title: 'Other',
      costRange: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: services_image,
      name: 'Other',
    },
  });
  const [selected, setSelected] = React.useState(selections.websites);
  const classes = useStyles();
  const theme = useTheme();
  return (
    // container
    <Grid container xs={12} className={classes.selectionMenu}>
      {/* menu of services to scroll and select through */}
      <Grid
        item
        xs={12}
        md={3}
        className={classes.selectionOptions}
      >
        {Object.keys(selections).map((key) => {
          const item = selections[key];
          return (
            <SelectionButton selected={item.name === selected.name} onClick={() => setSelected(selections[key])}>{item.name}</SelectionButton>
          );
        })}
      </Grid>

      {/* description of service */}
      <Grid
        item
        xs={6}
        md={5}
        style={{
          display: 'inline-flex',
          gap: theme.spacing(4),
          height: 600,
          flexDirection: 'column',
          background: theme.palette.text.secondary,
          color: theme.palette.text.primary,
          padding: theme.spacing(4),
          border: theme.custom.borders.brandBorder,
        }}
      >
        {/* {JSON.stringify(selected, null, 2)} */}
        <Typography align="left" variant="h2" component="h2" color="primary">
          {selected.title}
        </Typography>

        <Typography align="left" variant="h3" gutterBottom component="h3" color="primary" style={{ height: 300, fontWeight: 'regular !important' }}>
          {selected.costRange}
        </Typography>

        <Typography align="left" variant="body1" component="body1" color="primary">
          {selected.description}
        </Typography>

        <div style={{
          display: 'inline-flex',
          gap: theme.spacing(4),
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}
        >
          <RegularButton onClick={() => {}}>
            Start
            {' '}
            {selected.name}
            {' '}
            project
          </RegularButton>
          <SecondaryButton onClick={() => {}}>
            Contact me
          </SecondaryButton>
        </div>
      </Grid>

      {/* Image representing service */}
      <Grid
        item
        xs={2}
        md={4}
      >
        <img
          src={selected.image}
          style={{
            objectFit: 'fill', height: '100%', width: '100%', position: 'relative',
          }}
        />
      </Grid>

    </Grid>
  );
});

export {
  About,
  BlogPosts,
  Languages,
  Contact,
  Descriptor,
  Experience,
  WhatDoYouNeed,
  Skills,
};
