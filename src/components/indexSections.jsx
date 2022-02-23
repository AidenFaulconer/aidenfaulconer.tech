// import {
//   makeStyles,
//   Grid,
//   Typography,
//   Box,
//   Card,
//   useTheme,
// } from '@mui/material';
// import * as React from 'react';
// import { useBreakpoints } from 'react-use-breakpoints';
// import { navigate, useStaticQuery } from 'gatsby';
// import CircleType from 'circletype';
// import GraphemeSplitter from 'grapheme-splitter';
// import LinesEllipsis from 'react-lines-ellipsis';
// import { AccessibilityNewRounded } from '@mui/icons-material';
// import {
//   RegularButton,
//   SecondaryButton,
//   SelectionButton,
//   ThirdButton,
// } from './custom/buttons';
// import { CardCarousel } from './custom/cards';

// import {
//   hexToAlpha,
//   pxToRem,
//   SCROLL_PROPS,
//   svgEncodeBaseSixtyFour,
//   threeDHoverKeyframes,
//   transition,
// } from '../store/theme';

// // ========================================================================== //
// // Images
// // ========================================================================== //
// import aboutImage from '../../static/assets/portfolio/clouds.png';

// // ========================================================================== //
// // Shifting type
// // ========================================================================== //
// const useSlidingText = makeStyles((theme) => ({
//   '@keyframes animatedType': {
//     from: {
//       backgroundPosition: '0 0',
//     },
//     to: {
//       backgroundPosition: '100% 0',
//     },
//   },
//   movingType: {
//     position: 'absolute',
//     display: 'flex',
//     // justifyContent: 'space-evenly',
//     // flexDirection: 'column',
//     // minHeight: '90vh',
//     margin: 'auto',
//     // opacity: 0.3,
//     minWidth: '200vw',
//     width: '200%',
//     left: '-50%',
//     opacity: 0.5,
//     height: '70%',
//     zIndex: '10 !important',
//   },
//   type: {
//     display: 'inline-block',
//     height: '100%',
//     fill: theme.palette.text.primary,
//     // backgroundColor: theme.palette.text.primary,
//     // height: '100%',
//     width: '100%',
//     animation: '$animatedType 24s linear infinite alternate',
//     // tilt look
//     margin: 'auto',
//     // transform: 'rotate3d(116, -17, 28, 58deg)',
//     transform: 'rotate3d(31, -17, 28, 58deg)',
//     backgroundImage: ({ svg }) => svgEncodeBaseSixtyFour(`${svg}`),
//   },
// }));

// export const MovingType = ({ svg }) => {
//   const classes = useSlidingText({ svg });
//   return (
//     <div className={classes.movingType}>
//       <span className={classes.type} />
//     </div>
//   );
// };

// // ========================================================================== //
// //  Index page styles
// // ========================================================================== //
// const useStyles = makeStyles((theme) => {
//   const common = {
//     background: ({ bgAlt }) => (bgAlt ? theme.palette.text.primary : theme.palette.text.secondary),
//     borderRadius: theme.custom.borders.brandBorderRadius,
//   };
//   const sectionDimensions = {
//     minHeight: '90vh',
//     maxHeight: '90vh',
//     height: '90vh',
//     position: 'relative',
//     // scrollSnapAlign: 'start',
//   };
//   return {
//     section: {
//       overflow: 'hidden',
//       // may want bg later
//       ...sectionDimensions,
//       // borderTop: 0,
//       borderLeft: theme.custom.borders.brandBorder,
//       borderRight: theme.custom.borders.brandBorder,
//       borderTop: theme.custom.borders.brandBorder,
//     },
//     carouselSection: {
//       // overflow: 'hidden',
//       // border: theme.custom.borders.brandBorder,
//       borderRight: theme.custom.borders.brandBorder,
//       height: '100%',
//       color: theme.palette.text.primary,
//       ...sectionDimensions,
//       '& .carousel-container': {
//         position: 'relative',
//         height: '100%',
//         overflowY: 'hidden',
//         // background: `linear-gradient(45deg, ${hexToAlpha(theme.palette.text.secondary, 0.3)}, ${hexToAlpha(theme.palette.text.primary, 1)})`,
//         // background: theme.palette.text.primary,
//       },
//     },
//     selectionMenu: {
//       position: 'relative',
//       border: theme.custom.borders.brandBorder,
//       padding: theme.spacing(4, 0),

//       flexDirection: 'row',
//       overflowY: 'scroll',
//       [theme.breakpoints.down('sm')]: {
//         padding: theme.spacing(0, 4, 4, 4),
//       },
//     },
//     selectionOptions: {
//       display: 'inline-flex',
//       gap: theme.spacing(4),
//       width: '100%',
//       overflowX: 'scroll',
//       padding: theme.spacing(0, 4, 4, 4),
//       flexDirection: 'column',

//       flexWrap: 'nowrap',
//       [theme.breakpoints.down('md')]: {
//         flexDirection: 'row !important',
//         padding: theme.spacing(4, 4, 4, 0),
//       },
//       [theme.breakpoints.down('xs')]: {
//         flexDirection: 'row !important',
//         padding: theme.spacing(4),
//       },
//     },
//     container: {
//       // padding: theme.spacing(3, 0),
//     },
//     graphic: {
//       // border: theme.custom.borders.brandBorder,
//       // [theme.breakpoints.down('sm')]: {
//       //   display: 'none',
//       //   visibility: 'none',
//       //   borderLeft: 0,
//       // },
//       borderRadius: theme.custom.borders.brandBorderRadius,
//       // borderLeft: 'none',
//       zIndex: 20,
//       width: '100%',
//       transform: 'scale(.8)',
//       marginBottom: theme.spacing(12),
//       position: ({ absolute }) => (absolute ? 'absolute' : 'relative'),
//       display: 'inline',
//     },
//     descriptor: {
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       position: 'relative',
//       borderLeft: 0,
//       borderRight: 0,
//       // alignContent: 'end',
//       alignContent: 'flex-end',
//       '& h1': {
//         textTransform: 'capitalize',
//         textAlign: 'center',
//       },
//     },
//     typography: {
//       color: ({ bgAlt }) => (bgAlt === 2
//         ? theme.palette.background.button
//         : bgAlt === 1
//           ? theme.palette.text.primary
//           : theme.palette.text.secondary),
//     },
//     blogContainer: {
//       // background: theme.palette.primary.main,
//       // color: theme.palette.secondary.main,
//       overflow: 'hidden',
//       paddingBottom: theme.spacing(12),
//     },
//     whatDoYouNeed: {
//       // marginTop: theme.spacing(6),
//       // marginLeft: `${-23}px !important`,
//       // marginRight: `${-23}px !important`,
//       background: theme.palette.text.primary,
//     },
//     offerContainer: {
//       overflow: 'hidden',
//     },
//     serviceCard: {
//       // width: 300,
//       // height: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       alignContent: 'stretch',
//       maxHeight: 850,
//       margin: theme.spacing(3),
//       transform: `scale(${0.85})`,
//       padding: theme.spacing(3),
//       position: 'relative',
//       border: theme.custom.borders.brandBorderSecondary,
//       borderRadius: theme.custom.borders.brandBorderRadius,
//       background: ({ bgColor }) => `linear-gradient(180deg, ${bgColor} 100%, rgba(17, 159, 116, 0) 100%)`,
//       '& ul': {
//         borderBottom: theme.custom.borders.brandBorderSecondary,
//         borderTop: theme.custom.borders.brandBorderSecondary,
//         '& li': {
//           borderBottom: theme.custom.borders.brandBorderSecondary,
//           borderTop: theme.custom.borders.brandBorderSecondary,
//           paddingLeft: 10,
//           paddingBottom: 10,
//           paddingTop: 10,
//           listStyle: 'upper-roman',
//           listStylePosition: 'outside',
//           '&::marker': {
//             fontWeight: 'bolder',
//             fontFamily: 'cursive',
//           },
//         },
//       },
//       '& .media': {
//         position: 'relative',
//         maxWidth: '100%',
//         height: '100%',
//         maxHeight: '25%',
//         display: 'block',
//         minWidth: 0,
//         objectFit: 'cover',
//         boxShadow: theme.custom.shadows.brandBig,
//         border: theme.custom.borders.brandBorder,
//         minHeight: 200,
//         marginTop: theme.spacing(3),
//         marginBottom: theme.spacing(6),
//         transform: 'rotate3d(0, 0, 0, 0)',
//         transition: 'transform 0.5s ease-in-out',
//         '&:hover': {
//           transition: 'transform 0.5s ease-in-out',
//           transform: 'rotate3d(30, -7, 18, 62.58deg) scale(.85)',
//         },
//       },
//     },
//     whatDoYouNeedPoints: {
//       marginTop: theme.spacing(5),
//       paddingLeft: 0,
//       textAlign: 'left',
//       // listSyle: "none",
//       listStyle: 'circle',
//       '& li': {
//         margin: theme.spacing(1, 0),
//         // listStyleImage: `url(${listStyleImage})`,
//       },
//     },

//     descriptorDescription: {
//       paddingRight: theme.spacing(3),
//       height: '100%',
//     },
//     introContainer: {
//       color: theme.palette.text.primary,
//       overflow: 'hidden',
//       maxHeight: 400,
//       padding: theme.spacing(4),
//       // border: theme.custom.borders.brandBorderSecondary,
//       backgroundRepeat: '160%',
//       display: 'flex',
//       gap: theme.spacing(2),
//       flexDirection: 'row',
//       flexWrap: 'no-wrap',
//       overflowX: 'scroll',
//     },
//   };
// });

// // ========================================================================== //
// // descriptor
// // ========================================================================== //
// const Descriptor = ({ styleData, children }) => {
//   const {
//     title = '',
//     description = '',
//     ctas = [],
//     altButtons = 0,
//     bgAlt = false,
//     border = false,
//     rounded = false,
//     svg,
//   } = styleData;
//   const classes = useStyles({ bgAlt, border, rounded });
//   const { breakpoint } = useBreakpoints();
//   const theme = useTheme();

//   return (
//     <>
//       <Grid
//         container
//         className={classes.descriptor}
//         alignContent="space-between"
//       >
//         {/* shifting type and graphic */}
//         {/* splits to a relative title, with absolute bg text */}
//         {children}

//         {/* description */}
//         <Grid
//           item
//           container
//           alignContent="flex-end"
//           style={{
//             // display: 'inline-block',
//             // background: theme.palette.text.secondary,
//             borderTop: theme.custom.borders.brandBorder,
//             // borderBottom: '86px solid',
//             borderLeft: 0,
//             borderRight: 0,
//             padding: theme.spacing(3, 3),
//             zIndex: 11,
//             textAlign: 'left',
//             color: theme.palette.text.primary,
//             marginBottom: -4,
//             width: '101%',
//             overflow: 'hidden',
//             position: 'relative',
//           }}
//         >
//           <Typography color="inherit" variant="h3" align="left" gutterBottom>
//             How?
//           </Typography>
//           <Grid
//             item
//             xs={12}
//             style={{
//               alignContent: 'center',
//               display: 'grid',
//               height: 311.5,
//               maxHeight: 311.5,
//             }}
//           >
//             <Typography
//               color="inherit"
//               variant="body1"
//               align="left"
//               gutterBottom
//             >
//               {description || ''}
//             </Typography>
//           </Grid>
//           {/* CTA */}
//           <Grid
//             item
//             container
//             justify="space-between"
//             alignContent="center"
//             xs={12}
//             style={{ marginTop: theme.spacing(2) }}
//           >
//             {ctas[0]
//               && ((altButtons === 0 && (
//                 <RegularButton size="large">{ctas[0]}</RegularButton>
//               ))
//                 || (altButtons === 1 && (
//                   <SecondaryButton size="large">{ctas[0]}</SecondaryButton>
//                 )) || <ThirdButton color="textPrimary">{ctas[0]}</ThirdButton>)}
//             {ctas[1]
//               && ((altButtons === 0 && (
//                 <RegularButton size="large">{ctas[1]}</RegularButton>
//               ))
//                 || (altButtons === 1 && (
//                   <SecondaryButton size="large">{ctas[1]}</SecondaryButton>
//                 )) || <ThirdButton color="textPrimary">{ctas[1]}</ThirdButton>)}
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// // export const splitter = new GraphemeSplitter();

// // ========================================================================== //
// // ABOUT
// // ========================================================================== //
// const About = (props) => {
//   const classes = useStyles();
//   const { id } = props;
//   const styleData = {
//     bgAlt: 0,
//     altButtons: 0,
//     rounded: true,
//     ctas: ['Read More', 'Book Online'],
//     description:
//       'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs',
//   };
//   return (
//     <article id={id} className={classes.section}>
//       <Descriptor styleData={styleData}>
//         <Graphic
//           src={aboutImage}
//           title={(
//             <>
//               CREATIVE
//               <br />
//               ADAPTIVE
//               <br />
//               DIVERSIFIED
//             </>
//           )}
//           slidingText={creativeAdaptiveDiversifiedSlidingText}
//           spinText="CREATE OUTSIDE THE BOX ✍"
//         />
//       </Descriptor>
//     </article>
//   );
// };

// // ========================================================================== //
// // Blog Posts
// // ========================================================================== //
// const projectsData = [
//   {
//     title: 'Blog 1',
//     src: vrImage,
//     alt: 'JavaScript',
//     description: '',
//     icon: '',
//     color: '#119F74',
//   },
//   {
//     title: 'Blog 1',
//     src: vrImage,
//     alt: 'Blog 1',
//     description: '',
//     icon: '',
//     color: '#B314CD',
//   },
//   {
//     title: 'Blog 1',
//     src: vrImage,
//     alt: 'Blog 1',
//     description: '',
//     icon: '',
//     color: '#2E00FF',
//   },
//   {
//     title: 'Blog 1',
//     src: vrImage,
//     alt: 'Blog 1',
//     description: '',
//     icon: '',
//     color: '#A4AF1D',
//   },
//   {
//     title: 'Blog 1',
//     src: vrImage,
//     alt: 'Blog 1',
//     description: '',
//     icon: '',
//     color: '#DF650D',
//   },
//   {
//     title: 'Blog 1',
//     src: vrImage,
//     alt: 'Blog 1',
//     description: '',
//     icon: '',
//     color: '#C71073',
//   },
// ];
// const BlogPosts = React.memo(
//   React.forwardRef((props, ref) => {
//     const classes = useStyles();
//     const { id, posts } = props;

//     return (
//       <section
//         ref={ref}
//         id={id}
//         className={(classes.section, classes.blogContainer)}
//       >
//         <Grid container>
//           <Grid item xs={1} />
//           <Grid item xs={11}>
//             <CardCarousel
//               {...SCROLL_PROPS}
//               title="Languages"
//               key="languages"
//               carouselData={posts}
//               alt
//               cardHeight={310}
//               cardWidth={310}
//             />
//           </Grid>
//         </Grid>
//       </section>
//     );
//   }),
// );

// // ========================================================================== //
// // Contact
// // ========================================================================== //
// const Contact = React.forwardRef((props, ref) => {
//   const classes = useStyles();
//   return (
//     <section ref={ref} className={classes.section}>
//       <Grid container spacing={3}>
//         <Grid item xs={contentColSpacing} sm={6} />
//         <Grid item xs={5} sm={6} />
//       </Grid>
//     </section>
//   );
// });

// export {
//   About,
//   BlogPosts,
//   Contact,
//   Descriptor,
// };
