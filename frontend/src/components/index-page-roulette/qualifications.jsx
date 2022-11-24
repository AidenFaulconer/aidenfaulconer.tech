import {
  Grid, Typography, Box, Card, useTheme,
} from '@mui/material';
import * as React from 'react';
import { useBreakpoints } from 'react-use-breakpoints';
import { navigate, useStaticQuery } from 'gatsby';
import CircleType from 'circletype';
// import GraphemeSplitter from 'grapheme-splitter';
import { AccessibilityNewRounded } from '@mui/icons-material';
import {
  RegularButton,
} from '../custom/buttons';
import { CardCarousel } from '../custom/cards';

// ========================================================================== //
// QUALIFICAITONS
// ========================================================================== //
import _cv_ from '../../../static/assets/portfolio/Aiden Faulconer CV.pdf';
import resume_image from '../../../static/assets/portfolio/resume.png';

// const StyledGrid = styled(Grid)((
//   {
//     theme,
//   },
// ) => {
//   const common = {
//     background: ({ bgAlt }) => (bgAlt ? theme.palette.text.primary : theme.palette.text.secondary),
//     borderRadius: theme.custom.borders.brandBorderRadius,
//   };
//   return {
//     [`& .${classes.introContainer}`]: {

//     },
//   };
// });

// ========================================================================== //
// qualification cards / content
// ========================================================================== //
const ItemTag = ({ props, children }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      borderRadius: 30,
      padding: 1,
      background: (theme) => theme.palette.text.primary,
      color: (theme) => theme.palette.text.secondary,
      display: 'inline-flex',
      alignItems: 'center',
      border: (theme) => theme.custom.borders.brandBorder,
      height: 25,
      fontSize: 12,
      '&:hover': {
        background: (theme) => theme.palette.text.secondary,
        color: (theme) => theme.palette.text.primary,
      },
    }}
    >
      {children}
    </Box>
  );
};

const Ability = (props) => {
  const abilities = [
    'Design',
    'Develop',
    'Javascript',
    'C#',
    'C++',
    '.NET',
    'React',
    'Devops',
    'AWS',
    'SQL',
    'MongoDB',
    'Graphql',
    'REST',
    'Nodejs',
    'Vue',
    'Graphic Design',
    'Management',
    'Illustration',
    '3D Modelling',
    'Cloud',
    'UI/UX',
    'Virtual Reality',
    'Web Frameworks',
  ];
  const theme = useTheme();
  const _styles = {
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    row: theme.spacing(1),
    width: '100%',
  };
  return (
    <Box sx={_styles}>
      {abilities.map((ability, index) => (
        <ItemTag key={index}>{ability}</ItemTag>
      ))}
    </Box>
  );
};

export const CertCard = ({ title, subtitle, logo }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        height: 72,
        border: theme.custom.borders.brandBorder,
        borderRadius: theme.custom.borders.brandBorderRadius,
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          height: '100%',
          width: 70,
          color: theme.palette.text.secondary,
          padding: theme.spacing(1),
          border: theme.custom.borders.brandBorder,
        }}
        dangerouslySetInnerHTML={{ __html: logo }}
      />

      <Box sx={{ padding: theme.spacing(1) }}>
        <Typography color="secondary" variant="h4" align="left" gutterBottom>
          {title}
        </Typography>
        <Typography color="secondary" variant="caption" align="left">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export const CV = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // width: 330,
        background: `url(${resume_image})`,
        // objectFit: 'fill',
        backgroundRepeat: 'no-repeat',
        height: 180,
        width: '100%',
        display: 'inline-flex',
        alignitems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        border: (theme) => theme.custom.borders.brandBorder,
      }}
    >
      <RegularButton
        // when clicked downloads resume.pdf from static folder onto user's computer
        onClick={() => {
          const file = new Blob([_cv_], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          // http:// localhost:8000/./static/assets/portfolio/Aiden Faulconer CV.pdf
        }}
      >
        {' '}
        Download CV
      </RegularButton>
    </Box>
  );
};
// ========================================================================== //
// card
// ========================================================================== //
export const QualificationCard = ({ props, children }) => (
  <Box
    item
    sx={{
      height: 300,
      minWidth: 350,
      width: '100%',
      display: 'inline-flex',
      gap: 2,
      padding: 3,
      flexDirection: 'column',
      borderRadius: (theme) => theme.custom.borders.brandBorderRadius,
      border: (theme) => theme.custom.borders.brandBorder,
      background: (theme) => theme.palette.text.primary,
    }}
  >
    <Typography color="secondary" variant="h3" align="left" gutterBottom>
      {props?.title || 'Title'}
    </Typography>
    {children}
  </Box>
);
// ========================================================================== //
// qualifications
// ========================================================================== //
export default (props) => {
  const theme = useTheme();
  return (
    <Grid
      item
      container
      wrap="nowrap"
      alignContent="stretch"
      xs={12}
      md={12}
      sx={{
        // border: theme.custom.borders.brandBorderSecondary,
        color: (theme) => theme.palette.text.primary,
        maxHeight: 400,
        padding: 4,
        backgroundRepeat: '160%',
        display: 'flex',
        gap: 4,
        flexDirection: 'row',
        alignItems: 'stretch',
        flexWrap: 'no-wrap',
        flexGrow: 2,
        width: { md: '100%', xs: '1000px' },
        overflowX: 'scroll',
      }}
    >
      <QualificationCard title="QUALIFICATIONS">
        <CertCard
          title="BACHELOR OF SOFTWARE ENGINEERING"
          subtitle="University Of Canberra"
          logo={`
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 31 30"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.553 13.6977C12.4141 13.4052 13.2049 13.0057 13.9649 12.4672C14.6948 11.9465 15.3186 11.3424 15.8745 10.6195C16.4316 11.3424 17.0659 11.9447 17.7953 12.4625C18.5464 12.9996 19.3486 13.3868 20.2072 13.6761C19.6769 14.418 19.2921 15.2026 19.012 16.0769C18.7326 16.9559 18.6 17.8293 18.5869 18.7513C17.6899 18.4824 16.8096 18.3454 15.8715 18.3454C14.9483 18.3472 14.0561 18.4842 13.1616 18.7565C13.1585 17.8326 13.014 16.9606 12.7338 16.0839C12.4558 15.2082 12.0694 14.4364 11.5524 13.6977H11.553ZM19.4161 10.2478C18.6528 9.7262 17.9863 8.96585 17.6405 8.06436C17.2824 7.14797 17.2805 6.11002 17.9031 5.29825C18.8438 4.08672 20.6603 3.28839 22.1055 3.23959L22.2981 1.30483L18.6695 0.90332C17.6455 1.4448 16.7226 2.06751 15.8756 2.90062C15.0412 2.06926 14.1167 1.4597 13.0926 0.922022L9.4404 1.33288L9.6789 3.27787C11.1093 3.32667 12.9214 4.09578 13.8465 5.30468C14.4827 6.1147 14.4658 7.16668 14.1175 8.0705C13.76 8.98338 13.0948 9.74461 12.3438 10.2688C11.4757 10.8734 10.6357 11.206 9.58967 11.2334C8.63346 11.2714 7.58719 10.9664 6.98066 10.1049C6.11451 8.89133 5.89964 6.94605 6.36301 5.54838L5.99804 3.68229L2.84477 7.97144C3.03935 9.12277 3.33928 10.1993 3.87409 11.2489C2.76194 11.7688 1.796 12.4619 0.862305 13.2763L2.05117 17.3577C2.65464 15.8817 4.13149 14.4385 5.59888 13.9467C6.56538 13.6162 7.56801 13.9023 8.37356 14.4917C9.1691 15.0933 9.74505 15.9878 10.0458 16.9539C10.3585 17.9255 10.3844 19.021 10.0611 20.0066C9.72587 20.9937 9.05486 21.8257 8.05862 22.1252C6.55843 22.5968 4.49284 22.2544 3.18945 21.3546L4.42669 25.6262C5.68533 25.7814 6.90394 25.8019 8.16147 25.5742C8.30907 26.8761 8.6771 28.0461 9.19134 29.2188L13.6997 29.2129L13.5902 28.1118L12.3666 27.6174C11.8184 26.7022 11.4718 25.6444 11.4718 24.6564C11.4718 23.5322 12.1528 22.617 12.9887 22.0504C13.8415 21.4674 14.8716 21.1968 15.8734 21.1968C16.8752 21.1957 17.9054 21.4522 18.7607 22.034C19.6068 22.612 20.2884 23.5135 20.2903 24.64C20.2909 25.6447 19.914 26.7221 19.3586 27.642L18.0777 28.1156L18.0313 29.2141L22.5599 29.2103C23.0733 28.0262 23.4533 26.8533 23.602 25.5517C24.861 25.777 26.0798 25.7548 27.3382 25.5997L28.5613 21.3164C27.2582 22.2135 25.2045 22.5711 23.6915 22.1012C22.7042 21.8029 22.0226 20.971 21.7002 19.9839C21.3658 18.9965 21.4061 17.903 21.7066 16.9331C22.0182 15.9653 22.5958 15.0694 23.3916 14.4648C24.1972 13.8631 25.2015 13.5887 26.1682 13.9052C27.642 14.3926 29.1328 15.8379 29.7337 17.3174L30.9123 13.2123C29.9867 12.3997 29.0105 11.7063 27.8953 11.1911C28.4323 10.1508 28.7333 9.07251 28.9268 7.90715L25.7135 3.64547L25.4086 5.51303C25.8561 6.92297 25.6393 8.85013 24.7728 10.0643C24.1677 10.938 23.1225 11.2349 22.1647 11.2104C21.1195 11.1849 20.2689 10.8565 19.41 10.2498"
                />
              </svg>
            `}
        />
        <CertCard
          title="CERTIFICATE IV BUSINESS"
          subtitle="Navitas Professional"
          logo={`
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 143 67"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M130.276 1.08469C128.865 3.44782 126.701 6.08805 124.026 8.71052C119.663 12.9879 115.03 16.0454 108.788 18.7667C105.639 20.14 102.777 21.131 99.6916 21.917C92.7233 23.6921 86.1406 23.8445 84.0596 22.2787C83.396 21.7794 83.0503 20.7554 83.2718 19.9452C83.3873 19.5228 83.5626 19.2503 84.2176 18.4743C84.8115 17.7708 85.366 16.6859 85.5623 15.8434C86.1413 13.358 84.4957 11.7637 80.8047 11.2341C80.3725 11.1721 79.2148 11.1245 78.1988 11.1269C76.4765 11.1311 75.4579 11.1939 68.1659 11.7456C52.7497 12.9121 34.2193 14.822 14.9244 17.2333C9.48565 17.9129 0.646668 19.0767 0.432364 19.1414C0.217169 19.2063 1.22492 19.1214 5.159 18.7433C18.0782 17.5012 32.8219 16.3995 43.9084 15.8474C51.3912 15.4748 55.8442 15.3542 62.1015 15.3545C68.6708 15.3548 72.8075 15.5294 75.9519 15.939C78.5233 16.2738 80.1967 17.2795 80.8057 18.8561C81.2103 19.9036 81.0944 21.5232 80.5104 22.9815C79.9403 24.4053 79.9733 25.6206 80.6179 26.9367C81.725 29.1971 84.6811 30.8208 88.856 31.4619C91.3074 31.8384 96.8743 31.5325 101.427 30.7712C107.699 29.7225 113.687 27.6536 118.554 24.8538C120.88 23.5156 123.324 21.7353 124.864 20.2579L125.747 19.4107L128.15 10.3142C129.472 5.31109 130.609 1.00701 130.676 0.749454C130.744 0.491897 130.789 0.28125 130.777 0.28125C130.765 0.28125 130.539 0.642792 130.276 1.08469ZM141.514 19.4212C136.023 24.9484 128.888 30.0017 121.497 33.5992C114.454 37.0268 107.683 39.0316 99.9261 39.9856C98.5444 40.1556 97.8682 40.1846 95.2771 40.1851C92.1814 40.1858 91.1924 40.1216 89.079 39.7835C82.9894 38.8091 79.2734 36.1135 78.2376 31.9189C77.9165 30.6184 77.976 28.4671 78.3778 26.8574C78.6416 25.8005 78.6771 25.2012 78.5199 24.4564C77.852 21.2896 73.4572 19.7199 64.0189 19.2771C61.1132 19.1408 43.903 19.1292 39.9398 19.2608C30.3314 19.58 22.7856 19.9265 13.3191 20.483C8.59543 20.7607 2.80094 21.1346 1.63632 21.2368C0.645156 21.3237 1.51477 21.3068 6.45213 21.1429C10.9546 20.9933 24.6182 20.9396 29.7286 21.0512C43.0438 21.3422 53.438 22.0178 62.9041 23.2073C69.138 23.9905 70.6716 24.3269 72.6695 25.3487C74.5729 26.3221 75.9018 27.7916 76.4532 29.5328C76.8025 30.636 76.8193 31.0547 76.561 32.214C76.0677 34.4276 75.9209 36.0055 76.1075 37.0918C76.5193 39.4904 77.7388 41.9339 79.5356 43.96C81.6831 46.3819 84.91 48.2893 88.7683 49.4176C90.7954 50.0104 92.9684 50.4001 95.8122 50.681C97.3487 50.8328 102.144 50.8353 103.749 50.6852C110.35 50.0677 116.369 48.3345 122.433 45.3051C127.166 42.9408 131.04 40.3506 134.706 37.0999L135.631 36.2797L139.244 27.2288C141.231 22.2509 142.844 18.1658 142.829 18.1509C142.815 18.136 142.222 18.7077 141.514 19.4212ZM1.41337 23.5485C1.48694 23.5895 2.40997 23.6492 3.46455 23.681C7.08033 23.7901 13.3881 24.1712 18.4471 24.5863C37.5504 26.1536 53.3678 28.8824 65.487 32.7014C67.3125 33.2766 68.0962 33.5753 69.0854 34.0726C72.2159 35.6466 74.7982 38.6811 76.0251 42.2273C76.2208 42.7927 76.3204 42.999 76.2904 42.7763C76.1285 41.5734 75.9719 39.8312 75.9217 38.674C75.8898 37.9382 75.8093 36.975 75.7427 36.5336C75.1532 32.6236 73.0264 30.28 68.8347 28.921C68.5159 28.8177 67.5126 28.5541 66.6052 28.3353C53.6361 25.2084 32.2548 23.4657 6.94263 23.4724C3.82796 23.4732 1.33979 23.5075 1.41337 23.5485ZM76.8611 45.6992C76.8611 45.9045 77.5818 48.0768 77.9921 49.1082C79.4874 52.867 81.585 56.098 84.3075 58.8358C88.4493 63.0007 93.5492 65.442 99.8845 66.2923C101.816 66.5514 105.459 66.5732 107.227 66.336C112.81 65.5873 117.565 63.6056 121.719 60.2968C123.622 58.7814 125.981 56.2462 127.445 54.143C128.072 53.2421 129.324 51.1089 129.262 51.047C129.241 51.0265 129.006 51.1709 128.74 51.3679C127.492 52.29 125.099 53.7058 123.102 54.7043C117.575 57.4674 111.742 59.0997 105.622 59.5961C103.957 59.7313 99.3107 59.6513 97.7742 59.461C91.1187 58.6368 86.3604 56.8304 82.6579 53.7221C80.2913 51.7354 78.2116 48.9515 77.2127 46.4328C76.9414 45.7488 76.8611 45.5812 76.8611 45.6992Z"
                />
              </svg>
            `}
        />
      </QualificationCard>
      <QualificationCard title="CV">
        <CV />
      </QualificationCard>
      <QualificationCard title="ABILITY">
        <Ability />
      </QualificationCard>
    </Grid>
  );
};
