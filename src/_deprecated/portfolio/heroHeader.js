// import React, { useState, useEffect, useContext } from "react";
// import { StaticQuery, graphql, Link, useStaticQuery } from "gatsby";

// //styles / animation
// import { TransitionGroup } from "react-transition-group";

// //ui
// import { TypeWriter } from "../util/typewriter";
// import { BtnPrimary, BtnSecondary, Btn } from "../buttons.js";

// //threejs experience
// import ThreePortfolio from "../threejs/three-portfolio-page";
// import { portfolioGraphic } from "../../static/assets/svg/hardcoded-svgs";

// //context
// import { GlobalStore } from "../../layout/layout";

// const HeroHeader = styled.section`
//   max-height: 35vh;
//   z-index: 0;
// `;




// //makestyles for material ui
// const useStyles = makeStyles(theme => ({
//   threeWrapper: {
//     position: 'absolute',
//     margin: 'auto',
//     width: '100%',
//     height: '100vh',
//     left: '0px',
//     marginTop: '-250px',

//     "& #three-portfolio": {
//       background: 'transparent',
//       position: 'absolute',
//       height: '100vh',
//       width: '100vw',
//       zIndex: 0,
//       bottom: '0px',
//     }
//   },
//   typography: {
//     color: theme.palette.text.secondary,
//     position: 'relative',
//     marginBottom: theme.spacing(4),
//     zIndex: 2,
//   },
//   heroCutout: {
//     position: 'absolute',
//     bottom: "-75px",
//     left: "0px",
//     margin: 'auto',
//     width: '100vw',
//   },
//   heroUnderlay: {
//     marginTop: '-80px',
//     marginBottom: "20px",
//     paddingTop: '50px',
//     paddingBottom: '20px',
//     height: "150%",
//     width: "100vw",
//     zIndex: 0,
//     position: 'relative !important',

//     "&::before": {
//       content: '""',
//       position: 'absolute',
//       top: '0',
//       left: '0',
//       right: '0',
//       bottom: '0',
//       background: '#334409',
//       zIndex: -1,
//       height: '100%',
//       width: '100%',
//     }
//   },
//   heroBg: {
//     width: '100vw',
//     height: '103%',
//     objectFit: 'cover',
//     position: 'absolute',
//     zIndex: -1,
//     top: '0px',
//   },
//   heroGraphic: {
//     overflow: 'hidden',
//     width: '100%',
//     //make dissapear on mobile
//     [theme.breakpoints.down('xs')]: {
//     },
//   },
//   inputCta: {
//     border: theme.shape.brandBorderSecondary,
//     borderRadius: theme.shape.brandBorderRadius2,
//     boxShadow: theme.shadows.brand,
//     background: theme.palette.background.default,
//     padding: theme.spacing(1),
//     paddingBottom: theme.spacing(2),
//     paddingTop: theme.spacing(0),
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   heroHeadline: {
//     [theme.breakpoints.down('md')]: {
//       textAlign: 'center',
//     },
//   },
//   heroContainer: {
//     padding: '90px 0px',
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     margin: 'auto'
//   },
// }))

// //prettier-ignore
// export default React.memo(({ context, headerGraphic, headline, headlineDescription }) => {
//   //prettier-ignore
//   const { site: { siteMetadata: { title, description } } } = useStaticQuery(pageQuery);

//   //configure what section is in view
//   const [inProp, setInProp] = useState(false);
//   useEffect(() => {
//     setInProp(true);
//   }, []);
//   const theme = useTheme();

//   return (
//     <div className="row">
//       <title>
//         {title}
//         {/* Beautiful<br />
//                 Scalable<br />
//                 Software<br /> */}
//       </title>
//       <div>{description}</div>
//       <div className="buttons">
//         <a href="#Contact" className="button -primary">
//           <BtnSecondary
//             color="white"
//             padding="12.5px 30px"
//             text="Let's Connect"
//           />
//         </a>
//         <a href="#Contact" className="button -primary">
//           <BtnSecondary
//             bg="transparent"
//             padding="12.5px 30px"
//             color="transparan  t"
//             text="Start project"
//           />
//         </a>
//       </div>
//     </div>
//   );
// }
// );

// export const pageQuery = graphql`
//   query heroHeaderQuery {
//     site {
//       siteMetadata {
//         title
//         description
//       }
//     }
//   }
// `;
