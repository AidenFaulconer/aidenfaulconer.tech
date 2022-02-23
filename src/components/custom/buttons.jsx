import React, { useState, useEffect, useContext } from 'react';

import {
  Box,
  Button, createSvgIcon, Icon, SvgIcon,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import {
  patternHover, patternHoverKeyframes,
} from '../../store/theme';

// ========================================================================== //
// Button styles
// ========================================================================== //
const PREFIX = 'Buttons';
const classes = {
  root: `${PREFIX}-root`,
  dropDownButton: `${PREFIX}-dropDownButton`,
  inputButton: `${PREFIX}-inputButton`,
  socialMediaPopup: `${PREFIX}-socialMediaPopup`,
};
const Root = styled('div')((theme, selected) => {
  const buttonReuse = {
    height: 40,
    display: 'inline-flex',
    lineHeight: '100%',
    alignItems: 'center',
  };
  return ({
    // ========================================================================== //
    //     define animation names at top level
    // ========================================================================== //
    ...patternHoverKeyframes, // these can only be referenced in one spot in the app, either locally or globally **so here**
    [`& .${classes.root}`]: {
      background: theme.custom.shadows.brand,
    },
    // dark (in default theme)
    [`& .${classes.regularButton}`]: {
      ...patternHover,
      ...buttonReuse,
      height: 40,
      display: 'inline-flex',
      alignItems: 'center',
      // background: ({ color }) => (color || theme.palette.primary.main),
      background: theme.palette.background.primary,
      color: theme.palette.text.secondary,
    },
    // light (in default theme)
    [`& .${classes.secondaryButton}`]: {
      ...buttonReuse,
      ...patternHover,
      background: theme.palette.background.secondary,
      color: theme.palette.text.primary,
      border: theme.custom.borders.brandBorderSecondary,
    },
    [`& .${classes.thirdButton}`]: {
      ...buttonReuse,
      ...patternHover,
      background: theme.palette.background.default,
      border: theme.custom.borders.brandBorderSecondary,
      color: theme.palette.text.primary.main,
    },
    [`& .${classes.dropDownButton}`]: {

      // effect
      transition: theme.transitions.create(
        ['color', 'box-shadow', 'background', 'margin', 'border'],
        { duration: '0.3s', easing: 'ease-in-out' },
      ),

      // effect
      marginLeft: -theme.spacing(1),
      marginBottom: -theme.spacing(1),

      // theme styles
      whiteSpace: 'nowrap',
      display: 'inline',
      color: theme.palette.text.primary,
      background: theme.palette.background.default,
      boxShadow: theme.custom.shadows.brandInset,
      borderRadius: theme.custom.borders.brandBorderRadius,
      padding: '7px',
    },
    [`& .${classes.inputButton}`]: {

      transition: theme.transitions.create(
        ['color', 'box-shadow', 'background', 'margin', 'border'],
        { duration: '0.3s', easing: 'ease-in-out' },
      ),

      whiteSpace: 'nowrap',

      // effect
      marginLeft: -theme.spacing(1),
      marginBottom: -theme.spacing(1),
      display: 'inline',

      // theme styles
      color: theme.palette.text.primary,
      background: theme.palette.background.default,
      boxShadow: theme.custom.shadows.brandInset,
      borderRadius: theme.custom.borders.brandBorderRadius,
      padding: '7px',
    },
  });
});

// ========================================================================== //
// Icon library
// ========================================================================== //
const iconLibrary = {
  arrow: () => (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.72936 1.27355L12.6231 5.26003L2.62792 9.69012L6.02032 5.55524L6.29326 5.22256L6.00496 4.9031L2.72936 1.27355Z" fill="#D4DDF6" />
    </svg>
  ),
  item: () => (
    <svg width="20" height="23" viewBox="0 0 20 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.216506" y="0.375" width="10.4693" height="10.4693" rx="0.25" transform="matrix(0.866025 0.5 -2.20305e-08 1 0.841995 5.9073)" strokeWidth="0.5" />
      <rect x="-0.216506" y="0.375" width="10.4693" height="10.4693" rx="0.25" transform="matrix(-0.866025 0.5 2.20305e-08 1 19.408 6.1238)" strokeWidth="0.5" />
      <rect x="-0.216506" y="0.375" width="10.4693" height="10.4693" rx="0.25" transform="matrix(-0.866025 0.5 2.20305e-08 1 9.90923 0.638969)" strokeWidth="0.5" />
      <rect x="-1.49012e-08" y="0.25" width="10.4693" height="10.4693" rx="0.25" transform="matrix(0.866025 0.5 -0.866025 0.5 10.5297 0.655716)" strokeWidth="0.5" />
      <rect x="-1.49012e-08" y="0.25" width="10.4693" height="10.4693" rx="0.25" transform="matrix(0.866025 0.5 -0.866025 0.5 10.5297 11.625)" strokeWidth="0.5" />
      <rect x="-0.216506" y="-0.375" width="10.4693" height="10.4693" rx="0.25" transform="matrix(-0.866025 -0.5 2.20305e-08 -1 19.408 16.1262)" strokeWidth="0.5" />
    </svg>
  ),
  time: () => (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.313 1.39119C5.73005 1.39119 1.20418 5.91706 1.20418 11.5C1.20418 17.0829 5.73005 21.6088 11.313 21.6088C16.8959 21.6088 21.4218 17.0829 21.4218 11.5C21.4218 5.91706 16.8959 1.39119 11.313 1.39119ZM0.312988 11.5C0.312988 5.42487 5.23786 0.5 11.313 0.5C17.3881 0.5 22.313 5.42487 22.313 11.5C22.313 17.5751 17.3881 22.5 11.313 22.5C5.23786 22.5 0.312988 17.5751 0.312988 11.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5999 2.44364C10.8352 2.42535 11.073 2.41605 11.3129 2.41605C11.5529 2.41605 11.7907 2.42535 12.026 2.44364L12.337 2.4678L12.2887 3.08976L11.9777 3.0656C11.7584 3.04856 11.5367 3.03988 11.3129 3.03988C11.0892 3.03988 10.8675 3.04856 10.6482 3.0656L10.3372 3.08976L10.2889 2.4678L10.5999 2.44364ZM8.36273 3.56223L8.0746 3.68172C6.83308 4.19655 5.74032 4.99877 4.87957 6.00563L4.67689 6.24272L4.20271 5.83735L4.40539 5.60026C5.32905 4.51981 6.50201 3.65849 7.83564 3.10546L8.12376 2.98598L8.36273 3.56223ZM16.9756 4.38975L17.2127 4.59243C18.2931 5.51609 19.1544 6.68905 19.7075 8.02268L19.8269 8.31081L19.2507 8.54977L19.1312 8.26164C18.6164 7.02012 17.8142 5.92736 16.8073 5.06661L16.5702 4.86393L16.9756 4.38975ZM2.90272 10.5242L2.87856 10.8352C2.86152 11.0545 2.85284 11.2762 2.85284 11.5C2.85284 11.7238 2.86152 11.9455 2.87856 12.1647L2.90272 12.4757L2.28076 12.524L2.2566 12.2131C2.23831 11.9777 2.229 11.7399 2.229 11.5C2.229 11.2601 2.23831 11.0222 2.2566 10.7869L2.28076 10.4759L2.90272 10.5242ZM20.3451 10.4759L20.3693 10.7869C20.3876 11.0222 20.3969 11.2601 20.3969 11.5C20.3969 11.7399 20.3876 11.9777 20.3693 12.2131L20.3451 12.524L19.7232 12.4757L19.7473 12.1648C19.7644 11.9455 19.773 11.7238 19.773 11.5C19.773 11.2762 19.7644 11.0545 19.7473 10.8352L19.7232 10.5242L20.3451 10.4759ZM3.37519 14.4502L3.49467 14.7383C4.00951 15.9798 4.81173 17.0726 5.81859 17.9334L6.05568 18.136L5.65031 18.6102L5.41322 18.4075C4.33277 17.4839 3.47145 16.3109 2.91842 14.9773L2.79894 14.6892L3.37519 14.4502ZM18.4232 17.1626L18.2205 17.3997C17.2968 18.4802 16.1239 19.3415 14.7902 19.8945L14.5021 20.014L14.2632 19.4377L14.5513 19.3183C15.7928 18.8034 16.8856 18.0012 17.7463 16.9943L17.949 16.7572L18.4232 17.1626ZM10.3372 19.9102L10.6482 19.9344C10.8675 19.9514 11.0892 19.9601 11.3129 19.9601C11.5367 19.9601 11.7584 19.9514 11.9777 19.9344L12.2887 19.9102L12.337 20.5322L12.026 20.5563C11.7907 20.5746 11.5529 20.5839 11.3129 20.5839C11.073 20.5839 10.8352 20.5746 10.5999 20.5563L10.2889 20.5322L10.3372 19.9102Z" />
      <path d="M16.493 6.45767L14.9676 10.2682L14.9676 8.55424L12.7777 11.0235C12.896 11.2302 12.9636 11.4697 12.9636 11.7249C12.9636 12.5061 12.3304 13.1393 11.5492 13.1393C10.768 13.1393 10.1348 12.5061 10.1348 11.7249C10.1348 10.9437 10.768 10.3105 11.5492 10.3105C11.799 10.3105 12.0336 10.3752 12.2373 10.4888L14.4082 8.041L12.7074 7.95198L16.493 6.45767Z" />
    </svg>
  ),
  lightTheme: () => (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.92153 4.40842C9.77357 2.73088 9.6869 1.21356 9.6869 0.908096C9.6869 0.292123 10.0681 0 10.313 0C10.5553 0 10.9363 0.290732 10.9376 0.90851C10.9376 1.21489 10.8507 2.7315 10.7027 4.40829C10.5732 4.39867 10.4432 4.394 10.313 4.39433L10.3145 4.39434L9.92153 4.40842Z" />
      <path d="M6.70142 5.88526C6.60991 5.9768 6.52206 6.07166 6.43804 6.1696C5.11439 5.05985 3.94397 4.01528 3.72538 3.79669C3.28985 3.36116 3.3523 2.88178 3.52354 2.71055C3.69441 2.53968 4.17369 2.47784 4.60825 2.91239C4.82656 3.13015 5.87185 4.30092 6.98207 5.62489C6.88543 5.70801 6.79181 5.79485 6.70142 5.88526Z" />
      <path d="M14.1878 6.17017C15.5115 5.06021 16.682 4.01531 16.9006 3.79669C17.3361 3.36116 17.2737 2.88178 17.1024 2.71055C16.9319 2.53999 16.4527 2.47749 16.0164 2.9137C15.7973 3.13351 14.7532 4.30312 13.644 5.62546C13.7405 5.70844 13.8339 5.79514 13.9241 5.88541C14.0157 5.97708 14.1037 6.07208 14.1878 6.17017Z" />
      <path d="M5.22522 9.11072C5.2158 9.23914 5.21125 9.36806 5.21162 9.49722C5.21129 9.62837 5.21603 9.75928 5.22578 9.88966C3.54586 10.0378 2.02545 10.1247 1.71965 10.1247C1.1035 10.1247 0.812988 9.74475 0.812988 9.5C0.812988 9.25631 1.10396 8.87534 1.71965 8.87534C2.02537 8.87534 3.54546 8.96241 5.22522 9.11072Z" />
      <path d="M9.92344 14.5832C10.0529 14.5928 10.1829 14.5974 10.3131 14.5971C10.4431 14.5974 10.5728 14.5927 10.7021 14.5832C10.8505 16.2628 10.9376 17.7832 10.9376 18.089C10.9376 18.7069 10.5549 19 10.313 19C10.0683 19 9.68721 18.7061 9.68833 18.089C9.68833 17.7832 9.77522 16.2628 9.92344 14.5832Z" />
      <path d="M15.4129 9.49731C15.4133 9.62849 15.4085 9.75943 15.3987 9.88985C17.0767 10.0379 18.5949 10.1247 18.9006 10.1247C19.5197 10.1247 19.813 9.74241 19.813 9.5C19.813 9.25866 19.5192 8.87534 18.9006 8.87534C18.595 8.87534 17.0771 8.96234 15.3994 9.11052C15.4088 9.23904 15.4133 9.36806 15.4129 9.49731Z" />
      <path d="M13.923 13.1071C14.0135 13.0166 14.1004 12.9229 14.1835 12.8262C15.5083 13.9369 16.6803 14.9831 16.8992 15.2019C17.3373 15.6401 17.2738 16.1186 17.103 16.2889C16.9309 16.4605 16.4527 16.5222 16.0168 16.0852C15.7985 15.8669 14.7513 14.6943 13.6399 13.3695C13.7374 13.2858 13.8318 13.1983 13.923 13.1071Z" />
      <path d="M6.9861 13.3708C6.88829 13.2868 6.79355 13.1991 6.70213 13.1077C6.61212 13.0177 6.52565 12.9245 6.44288 12.8284C5.11756 13.9401 3.94532 14.9871 3.72728 15.2057L3.72634 15.2066C3.28957 15.6423 3.35262 16.1185 3.52354 16.2895C3.69506 16.461 4.17309 16.5242 4.60968 16.0876C4.8285 15.8688 5.87504 14.6961 6.9861 13.3708Z" />
      <path d="M10.3131 13.6869C12.6255 13.6869 14.5 11.8123 14.5 9.49997C14.5 7.18762 12.6255 5.31309 10.3131 5.31309C8.00077 5.31309 6.12624 7.18762 6.12624 9.49997C6.12624 11.8123 8.00077 13.6869 10.3131 13.6869Z" />
    </svg>
  ),
  close: () => (
    <svg width="20" height="13" viewBox="0 0 20 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.3247 6.49004L19.132 1.95039C19.3708 1.81158 19.4518 1.50554 19.313 1.26682C19.1742 1.0281 18.8681 0.947101 18.6294 1.08591L10.313 5.92156L1.99653 1.08591C1.75781 0.947101 1.45176 1.0281 1.31296 1.26682C1.17415 1.50554 1.25515 1.81158 1.49387 1.95039L9.30122 6.49004L1.50721 10.82C1.26582 10.9542 1.17885 11.2586 1.31296 11.4999C1.44706 11.7413 1.75147 11.8283 1.99286 11.6942L10.313 7.07192L18.6331 11.6942C18.8745 11.8283 19.1789 11.7413 19.313 11.4999C19.4471 11.2586 19.3601 10.9542 19.1187 10.82L11.3247 6.49004Z" />
    </svg>
  ),
  location: () => (
    <svg width="15" height="27" viewBox="0 0 15 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.00175 26.1377L1.35032 11.3808C0.780794 9.89367 0.395318 8.29245 0.722695 6.73399C1.43131 3.36068 3.60326 1.87216 5.19482 1.22373C6.35182 0.752342 7.64395 0.752523 8.82355 1.1641C10.5499 1.76644 13.0022 3.19328 13.8575 6.52412C14.2895 8.20645 13.8186 9.95578 13.1443 11.5565L7.00175 26.1377ZM7.3273 10.8604C9.12581 10.8604 10.5838 9.40241 10.5838 7.6039C10.5838 5.8054 9.12581 4.34742 7.3273 4.34742C5.5288 4.34742 4.07082 5.8054 4.07082 7.6039C4.07082 9.40241 5.5288 10.8604 7.3273 10.8604Z" strokeWidth="0.5" />
    </svg>
  ),
  instagram: () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4974 7.33205C8.75305 7.33205 7.32949 8.75561 7.32949 10.5C7.32949 12.2444 8.75305 13.668 10.4974 13.668C12.2418 13.668 13.6654 12.2444 13.6654 10.5C13.6654 8.75561 12.2418 7.33205 10.4974 7.33205ZM19.9989 10.5C19.9989 9.18814 20.0108 7.88817 19.9371 6.57868C19.8635 5.05768 19.5165 3.70779 18.4043 2.59556C17.2897 1.48096 15.9421 1.13635 14.4211 1.06268C13.1093 0.989007 11.8093 1.00089 10.4998 1.00089C9.18796 1.00089 7.88798 0.989007 6.5785 1.06268C5.0575 1.13635 3.70761 1.48333 2.59538 2.59556C1.48077 3.71017 1.13617 5.05768 1.0625 6.57868C0.988824 7.89054 1.00071 9.19052 1.00071 10.5C1.00071 11.8095 0.988824 13.1118 1.0625 14.4213C1.13617 15.9423 1.48315 17.2922 2.59538 18.4044C3.70999 19.5191 5.0575 19.8637 6.5785 19.9373C7.89036 20.011 9.19034 19.9991 10.4998 19.9991C11.8117 19.9991 13.1117 20.011 14.4211 19.9373C15.9421 19.8637 17.292 19.5167 18.4043 18.4044C19.5189 17.2898 19.8635 15.9423 19.9371 14.4213C20.0132 13.1118 19.9989 11.8119 19.9989 10.5V10.5ZM10.4974 15.3743C7.80005 15.3743 5.62312 13.1974 5.62312 10.5C5.62312 7.80261 7.80005 5.62568 10.4974 5.62568C13.1948 5.62568 15.3718 7.80261 15.3718 10.5C15.3718 13.1974 13.1948 15.3743 10.4974 15.3743ZM15.5714 6.56442C14.9416 6.56442 14.433 6.05584 14.433 5.42605C14.433 4.79626 14.9416 4.28767 15.5714 4.28767C16.2012 4.28767 16.7098 4.79626 16.7098 5.42605C16.71 5.57559 16.6806 5.72371 16.6235 5.86191C16.5664 6.0001 16.4825 6.12567 16.3768 6.23142C16.271 6.33716 16.1455 6.42101 16.0073 6.47815C15.8691 6.53529 15.721 6.56461 15.5714 6.56442V6.56442Z" />
    </svg>
  ),
  github: () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9549 2.04515C18.2578 1.34807 17.419 1 16.4376 1H4.56244C3.58101 1 2.74223 1.34807 2.04515 2.04515C1.34807 2.74223 1 3.58101 1 4.56244V16.4376C1 17.419 1.34807 18.2578 2.04515 18.9549C2.74223 19.6519 3.58101 20 4.56244 20H7.33365C7.51434 20 7.65033 19.9933 7.74163 19.981C7.84785 19.9597 7.94372 19.903 8.01361 19.8203C8.10396 19.7252 8.14961 19.5873 8.14961 19.4066L8.14295 18.5649C8.13915 18.0286 8.13724 17.6044 8.13724 17.2906L7.85194 17.3401C7.67125 17.3733 7.44302 17.3876 7.16627 17.3838C6.87782 17.3785 6.5903 17.3495 6.30657 17.2973C6.00454 17.2415 5.72021 17.1143 5.4773 16.9264C5.2229 16.7339 5.03316 16.4685 4.93333 16.1656L4.8097 15.8803C4.7055 15.6552 4.57459 15.4435 4.41979 15.2498C4.2429 15.0187 4.06317 14.8627 3.88153 14.78L3.79594 14.7182C3.73625 14.6754 3.68197 14.6256 3.63427 14.5698C3.58871 14.518 3.5512 14.4597 3.523 14.3967C3.49827 14.3387 3.5192 14.2912 3.58481 14.2541C3.65138 14.216 3.77026 14.198 3.94429 14.198L4.19155 14.236C4.35607 14.2683 4.56054 14.3672 4.80304 14.5318C5.04846 14.6991 5.25346 14.919 5.40312 15.1756C5.59332 15.5132 5.82156 15.7709 6.08974 15.9487C6.35793 16.1256 6.62801 16.215 6.89999 16.215C7.17198 16.215 7.40688 16.1941 7.60564 16.1532C7.79784 16.1135 7.98461 16.0509 8.16197 15.9668C8.23615 15.4152 8.43776 14.9892 8.76776 14.6925C8.34016 14.6506 7.91638 14.5762 7.50008 14.4699C7.0938 14.3583 6.70308 14.1964 6.337 13.9878C5.95398 13.7793 5.61568 13.4975 5.34131 13.1585C5.07788 12.8285 4.86105 12.3958 4.69178 11.8604C4.52345 11.324 4.43881 10.7049 4.43881 10.0041C4.43881 9.00646 4.76405 8.15722 5.41549 7.45538C5.11117 6.70599 5.1397 5.86436 5.50203 4.93333C5.74168 4.8582 6.0964 4.91431 6.56619 5.09975C7.03599 5.2852 7.38025 5.44402 7.59898 5.57525C7.81771 5.70839 7.99269 5.81966 8.12488 5.91001C8.89802 5.69485 9.69701 5.58669 10.4995 5.58857C11.3164 5.58857 12.1077 5.69603 12.8751 5.91001L13.3449 5.61329C13.7063 5.39633 14.0874 5.21418 14.4833 5.06932C14.9207 4.90385 15.2536 4.85915 15.4856 4.93333C15.8565 5.86531 15.8888 6.70599 15.5836 7.45633C16.235 8.15722 16.5612 9.00646 16.5612 10.005C16.5612 10.7059 16.4766 11.3269 16.3073 11.8661C16.1389 12.4063 15.9202 12.839 15.652 13.1652C15.3728 13.4998 15.0331 13.7789 14.6506 13.9878C14.2512 14.2103 13.8632 14.371 13.4876 14.4699C13.0713 14.5765 12.6475 14.6512 12.2199 14.6934C12.6478 15.0643 12.8628 15.6492 12.8628 16.449V19.4066C12.8628 19.5464 12.8827 19.6595 12.9246 19.7461C12.9438 19.7878 12.9712 19.8252 13.0052 19.8561C13.0392 19.8869 13.079 19.9107 13.1224 19.9258C13.2137 19.9582 13.2936 19.9791 13.3639 19.9867C13.4343 19.9962 13.5351 19.999 13.6663 19.999H16.4376C17.419 19.999 18.2578 19.651 18.9549 18.9539C19.651 18.2578 20 17.418 20 16.4366V4.56244C20 3.58101 19.651 2.74223 18.9539 2.04515H18.9549Z" />
    </svg>
  ),
  facebook: () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.46929 1C2.54745 1 1 2.54745 1 4.46929V16.5307C1 18.4526 2.54745 20 4.46929 20H11.0065V12.5722H9.04236V9.89795H11.0065V7.6132C11.0065 5.81817 12.167 4.17004 14.8403 4.17004C15.9227 4.17004 16.7231 4.27395 16.7231 4.27395L16.6602 6.77127C16.6602 6.77127 15.8439 6.76355 14.9531 6.76355C13.9891 6.76355 13.8345 7.20774 13.8345 7.94513V9.89797H16.7367L16.6103 12.5722H13.8345V20H16.5307C18.4525 20 20 18.4526 20 16.5308V4.4693C20 2.54747 18.4525 1.00002 16.5307 1.00002H4.46927L4.46929 1Z" />
    </svg>
  ),
  linkedin: () => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.72329 1C2.67577 1 1 2.67573 1 4.72329V16.2773C1 18.3248 2.67573 20 4.72329 20H16.2773C18.3249 20 20 18.3249 20 16.2773V4.72329C20 2.67577 18.3249 1 16.2773 1H4.72329ZM5.65975 4.13538C6.64149 4.13538 7.24621 4.77988 7.26487 5.62706C7.26487 6.45554 6.64146 7.11815 5.64076 7.11815H5.62235C4.65929 7.11815 4.03682 6.45557 4.03682 5.62706C4.03682 4.7799 4.67813 4.13538 5.65973 4.13538H5.65975ZM14.12 8.095C16.008 8.095 17.4234 9.32906 17.4234 11.981V16.9317H14.5541V12.3129C14.5541 11.1523 14.1388 10.3604 13.1004 10.3604C12.3077 10.3604 11.8352 10.8941 11.6277 11.4097C11.5519 11.5942 11.5333 11.8518 11.5333 12.1098V16.9317H8.66392C8.66392 16.9317 8.70158 9.10761 8.66392 8.29748H11.5339V9.52017C11.9152 8.93186 12.5972 8.09498 14.12 8.09498V8.095ZM4.20607 8.29811H7.07543V16.9317H4.20607V8.29811V8.29811Z" />
    </svg>

  ),
};
export const AFIcon = (props) => {
  const {
    type, color, size, customIcon = false,
  } = props;
  const icon = customIcon || React.useCallback(iconLibrary[type](), []);
  return (
    <Box
      style={{ fill: color, color }}
      sx={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'center' }}
    >
      {icon}
    </Box>
  );
};
// ========================================================================== //
// Button variant 2 (Green)
// ========================================================================== //
const buttonTypes = {
  primary: {
    color: (theme) => theme.palette.text.secondary,
    background: (theme) => theme.palette.text.primary,
    border: (theme) => theme.custom.borders.brandBorder,
    '&:hover': {
      background: (theme) => theme.palette.text.secondary,
      color: (theme) => theme.palette.text.primary,
    },
  },
  secondary: {
    color: (theme) => theme.palette.text.primary,
    background: (theme) => theme.palette.text.secondary,
    border: (theme) => theme.custom.borders.brandBorderSecondary,
    '&:hover': {
      background: (theme) => theme.palette.text.primary,
      color: 'text.secondary',
    },
  },
  special: {
    color: 'text.secondary',
    background: 'text.third',
    border: (theme) => theme.custom.borders.brandBorder,
    '&:hover': {
      background: 'text.prmary',
      color: 'text.secondary',
    },
  },
  icon: {
    borderRadius: '100%',
    width: 50,
    maxWidth: 50,
    minWidth: 0,
    height: 50,
    position: 'relative',
    background: (theme) => theme.palette.text.primary,
    border: (theme) => theme.custom.borders.brandBorder,
    '& .MuiButton-endIcon': {
      margin: 0,
    },
    '&:hover': {
      background: (theme) => theme.palette.text.secondary,
      color: (theme) => theme.palette.text.primary,
    },
  },
};
export const RegularButton = (props) => {
  const {
    shadows = false, type = 'primary', icon = { enabled: true, type: 'arrow', color: buttonTypes[type].color }, shadow, children, size = 'large',
  } = props;
  return (
    <Button
      {...props}
      disableRipple
      sx={{
        boxShadow: shadows ? (theme) => (theme.custom.shadows.brand) : 'none',
        height: 40,
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: '100%',
        fontSize: 14,
        ...buttonTypes[type],
      }}
      size={size}
      // variant="contained"
      // variant=""
      centerRipple
      endIcon={icon.enabled && (<AFIcon {...icon} />)}
    >
      {children}
    </Button>
  );
};

// ========================================================================== //
// Selection buttons
// ========================================================================== //
export const SelectionButton = (props) => {
  const {
    Icon,
    shadow,
    children,
    color = {},
    size = 'large',
    selected = false,
  } = props;

  const stateStyles = {
    // not selected
    false: {
      justifyContent: 'flex-start',
      opacity: 0.6,
      border: (theme) => theme.custom.borders.brandBorder,
      color: (theme) => theme.palette.text.primary,
      background: (theme) => theme.palette.text.secondary,
      '&:hover': {
        color: (theme) => theme.palette.text.secondary,
        background: (theme) => theme.palette.text.primary,
      },
      '& > * svg': {
        border: (theme) => theme.custom.borders.brandBorder,
        fill: (theme) => theme.palette.text.secondary,
      },
    },
    // selected
    true: {
      justifyContent: 'flex-start',
      opacity: 1,
      border: (theme) => theme.custom.borders.brandBorder,
      color: (theme) => theme.palette.text.secondary,
      background: (theme) => theme.palette.text.primary,
      '&::hover': {
        color: (theme) => theme.palette.text.primary,
        background: (theme) => theme.palette.text.secondary,
      },
    },
    '& * > svg': {
      border: (theme) => theme.custom.borders.brandBorder,
      fill: (theme) => theme.palette.text.primary,
      background: 'red',
    },
  };

  return (
    <Button
      {...props}
      disableRipple
      sx={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineBreak: 'unset',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        minWidth: 150,
        maxWidth: 150,
        ...stateStyles[selected],
      }}
      // color="sec"
      size={size}
      // variant="contained"
      centerRipple
      style={{ opacity: selected && 1 }}
      startIcon={(
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8.00049"
            cy="8.3396"
            r="7.5"
          />
        </svg>
      )}
    >
      {children}
    </Button>
  );
};

// ========================================================================== //
// Button Group
// ========================================================================== //
export const ButtonGroup = (props) => {
  const {
    Icon,
    shadow,
    children,
    color = {},
    autosize = false,
    buttonClass = 'regularButton',
  } = props;
  return (
    autosize && (
      <ButtonGroup
        {...props}
        fullWidth
        multiline
        className={classes[buttonClass]}
        margin="normal"
        // InputLabelProps={{
        //   shrink: true,
        // }}
        variant="outlined"
      >
        {children}
      </ButtonGroup>
    )
  );
};
