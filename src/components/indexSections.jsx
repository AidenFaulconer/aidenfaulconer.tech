import {
  makeStyles, Grid, Typography, Box, Card,
} from '@material-ui/core';
import * as React from 'react';
import { useBreakpoints } from 'react-use-breakpoints';
import { useStaticQuery } from 'gatsby';
import {
  RegularButton,
  SecondaryButton,
  ThirdButton,
} from './custom/customButton';
import { CardCarousel } from './custom/customCards';

import { hexToAlpha, SCROLL_PROPS, transition } from '../store/theme';

// ========================================================================== //
// Images
// ========================================================================== //
import aboutImage from '../../static/assets/portfolio/about.png';
import languagesImage from '../../static/assets/portfolio/languages.png';

// ========================================================================== //
// services
// ========================================================================== //
import websiteImage from '../../static/assets/portfolio/website.png';
import vrImage from '../../static/assets/portfolio/vr.png';
import designImage from '../../static/assets/portfolio/lots.png';
import appsImage from '../../static/assets/portfolio/apps.png';
import uiuxImage from '../../static/assets/portfolio/uiux.png';
import brandingImage from '../../static/assets/portfolio/branding.jpg';

// ========================================================================== //
// Experience images
// ========================================================================== //
import awmImage from '../../static/assets/portfolio/Frame 593.png';
import rvrImage from '../../static/assets/portfolio/Frame 594.png';
import rgImage from '../../static/assets/portfolio/Frame 595.png';
import afImage from '../../static/assets/portfolio/Frame 596.png';
import lgImage from '../../static/assets/portfolio/Frame 597.png';
import xprtImage from '../../static/assets/portfolio/Frame 598.png';
import ajImage from '../../static/assets/portfolio/Frame 599.png';

import ThreeWrapper from './threejs/three-wrapper';
import { ThreeDCarousel } from './custom/threeDCarousel';

// const contentHeight = 550
const useStyles = makeStyles((theme) => {
  const common = {
    background: ({ bgAlt }) => (bgAlt ? theme.palette.text.primary : theme.palette.text.secondary),
    borderRadius: theme.custom.borders.brandBorderRadius,
  };
  const altCommon = {
    background: ({ bgAlt }) => (bgAlt ? theme.palette.text.secondary : theme.palette.text.primary),
    borderRadius: theme.custom.borders.brandBorderRadius,
  };
  const buttonCommon = {
    color: ({ bgAlt }) => (bgAlt ? theme.palette.text.secondary : theme.palette.text.primary),
    background: ({ bgAlt }) => (bgAlt === 2
      ? theme.palette.background.button
      : bgAlt === 1
        ? theme.palette.text.primary
        : theme.palette.background.default),
  };
  return {
    section: {
      overflow: 'hidden',
      // may want bg later
    },
    carouselSection: {
      paddingTop: theme.spacing(6),
      overflow: 'hidden',
      border: theme.custom.borders.brandBorderSecondary,
      color: theme.palette.text.primary,
    },
    container: {
      // padding: theme.spacing(3, 0),

    },
    graphic: {
      height: '100%',
      // background: theme.palette.text.primary,
      '& img': {
        height: '100%',
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        // background: theme.palette.text.secondary,
        background: 'none',
        // border: theme.custom.borders.brandBorderSecondary,
        marginTop: theme.spacing(0),
        // transition,
        // '&:hover': {
        //   transition,
        //   marginTop: -theme.spacing(10),
        // },
      },
      borderRight: `${theme.spacing(0)}px solid`,
      // [theme.breakpoints.down('sm')]: {
      //   display: 'none',
      //   visibility: 'none',
      //   borderLeft: 0,
      // },
    },
    descriptor: {
      height: '100%',
      width: '100%',
      position: 'relative',
      // paddingBottom: theme.spacing(12),
      overflow: 'hidden',
      padding: theme.spacing(6, 0, 6, 3),
      // minHeight: '80vh',
      // marginTop: theme.spacing(12),
      '& h1': {
        textTransform: 'capitalize',
        textAlign: 'left',
      },

      // border: ({ border }) => (border ? theme.custom.borders.brandBorderSecondary : null),
      border: theme.custom.borders.brandBorderSecondary,
      // ...buttonCommon,
      // may want bg later

    },
    typography: {
      color: ({ bgAlt }) => (bgAlt === 2
        ? theme.palette.background.button
        : bgAlt === 1
          ? theme.palette.text.primary
          : theme.palette.text.secondary),
    },
    experienceContainer: {
      // background: theme.palette.primary.main,
      // color: theme.palette.secondary.main,
      overflow: 'hidden',
    },
    whatDoYouNeed: {
      // marginTop: theme.spacing(6),
      // marginLeft: `${-23}px !important`,
      // marginRight: `${-23}px !important`,
      padding: theme.spacing(3, 3),
      borderRadius: theme.custom.borders.brandBorderRadius,
      background: theme.palette.text.primary,
    },
    offerContainer: {
      overflow: 'hidden',
    },
    serviceCard: {
      width: 300,
      margin: theme.spacing(2),
      borderRadius: theme.custom.borders.brandBorderRadius,
      background: ({ bgColor }) => (`linear-gradient(180deg, ${bgColor} 50%, rgba(17, 159, 116, 0) 100%)`),
      border: theme.custom.borders.brandBorder,
      '& img': {
        width: '100%',
        margin: 0,
        height: '100%',
        display: 'block',
        border: theme.custom.borders.brandBorderSecondary,
        minWidth: 0,
        minHeight: 200,
        marginTop: theme.spacing(2),
        '&:hover': {
          transition,
          marginTop: -theme.spacing(3),
        }, // height: '100%',
        // width: '100%',
        // position: 'relative',
        // objectFit: 'cover',
        // minWidth: 400,
        // // maxWidth: 400,
        // minHeight: 400,
        // // maxHeight: 200,
        // overflow: 'hidden',
        // marginTop: theme.spacing(3),
        // boxShadow: theme.custom.shadows.brand,
        // borderRadius: theme.custom.borders.brandBorderRadius,
        // border: theme.custom.borders.brandBorderSecondary,
        // zIndex: 0,
        // transition,
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
    ctaArea: {
      padding: theme.spacing(2, 0),
    },
    descriptorDescription: {
      paddingRight: theme.spacing(6),
      height: '100%',
    },
  };
});

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
// Cta text arrangement
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
  } = styleData;
  const classes = useStyles({ bgAlt, border, rounded });
  const { breakpoint } = useBreakpoints();

  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      justify="center"
      className={classes.descriptor}
    >
      <Grid item container xs={12} justify="space-between">

        {/* description */}
        <Grid item container xs={5} justify="left" alignContent="center" alignItems="center">

          {/* title */}
          <Typography
            color="inherit"
            gutterBottom
            align="left"
            {...SCROLL_PROPS}
            variant="h1"
          >
            {title || ''}
          </Typography>
          <Grid item container>
            <Typography
              color="inherit"
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
            className={classes.ctaArea}
            alignContent="center"
          >
            <Grid item style={{ marginRight: 10 }}>
              {ctas[0]
                && ((altButtons === 0 && (
                  <RegularButton size="small">{ctas[0]}</RegularButton>
                ))
                  || (altButtons === 1 && (
                    <SecondaryButton size="small">{ctas[0]}</SecondaryButton>
                  )) || (
                    <ThirdButton color="textPrimary">{ctas[0]}</ThirdButton>
                ))}
            </Grid>
            <Grid item>
              {ctas[1]
                && ((altButtons === 0 && (
                  <RegularButton size="small">{ctas[1]}</RegularButton>
                ))
                  || (altButtons === 1 && (
                    <SecondaryButton size="small">{ctas[1]}</SecondaryButton>
                  )) || (
                    <ThirdButton color="textPrimary">{ctas[1]}</ThirdButton>
                ))}
            </Grid>
          </Grid>
        </Grid>

        {/* image */}
        {children}
      </Grid>

      <svg
        style={{
          position: 'absolute', bottom: '10%', left: -150, zIndex: -1, opacity: 0.25,
        }}
        width="486"
        height="638"
        viewBox="0 0 486 638"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.3" cx="167" cy="319" r="319" fill="#2E00FF" />
      </svg>
      <svg
        style={{
          position: 'absolute', top: '25%', right: -150, transform: 'rotate(180deg)', zIndex: -1, opacity: 0.25,
        }}
        width="486"
        height="638"
        viewBox="0 0 486 638"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.3" cx="167" cy="319" r="319" fill="#2E00FF" />
      </svg>
    </Grid>
  );
};

// ========================================================================== //
// Cta image
// ========================================================================== //
const Graphic = (props) => {
  const {
    src, alt, bgAlt = false, border,
  } = props;
  const classes = useStyles({ bgAlt, border });
  return (
    <Grid item className={classes.graphic} md={7} sm={7}>
      <img alt={alt} src={src} />
    </Grid>
  );
};

// ========================================================================== //
// ABOUT
// ========================================================================== //
const About = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { id } = props;
  const styleData = {
    bgAlt: 0,
    altButtons: 0,
    rounded: true,
    ctas: ['Read More', 'Book Online'],
    description:
      'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs',
    title: 'Creative Adaptive Diversified',
  };
  return (
    <section id={id} ref={ref} className={classes.section}>
      <Descriptor styleData={styleData}>
        <Graphic src={aboutImage} />
      </Descriptor>
    </section>
  );
});

// ========================================================================== //
// Languages
// ========================================================================== //
const languageData = [
  {
    title: 'JavaScript',
    image: awmImage,
    alt: 'JavaScript',
    description: '',
    icon: '',
  },
  {
    title: 'C#',
    image: awmImage,
    alt: 'C#',
    description: '',
    icon: '',
  },
  {
    title: 'Python',
    image: awmImage,
    alt: 'Python',
    description: '',
    icon: '',
  },
  {
    title: 'Front-End',
    image: awmImage,
    alt: 'Front-End',
    description: '',
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
    description: '',
    icon: '',
  },
  {
    title: 'Interpersonal',
    image: awmImage,
    alt: 'Interpersonal',
    description: '',
    icon: '',
  },
];

const Languages = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles();
    const styleData = {
      title: 'Any Language, Any Framework',
      bgAlt: 0,
      altButtons: 0,
      rounded: true,
      ctas: ['Read More', 'Book Online'],
      description:
        'I’ve taken all roles in the creation of software products, meaning I am ccapable of delivering a full software product, from its database, communicating brand and intention in design, and building a fast and intuitive client facing application spanning its needs',
    };
    return (
      <section ref={ref} className={classes.section}>
        <Descriptor styleData={styleData}>
          <Graphic src={languagesImage} />
        </Descriptor>
      </section>
    );
  }),
);

// ========================================================================== //
// Experience
// ========================================================================== //
const experienceData = [
  {
    title: 'Australian War Memorial',
    image: awmImage,
    alt: 'JavaScript',
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
    description: `
    • Use C#, typescript, javascript, with a back-end firebase/graphql and frontend vue development 
    • Built mini-games, and create on both web and mobile unity apps 
    • Programmed frontend application to deliver configurable vr experiences 
    • Web interface for full remote-control of Virtual Reality experiences  
    • developed CI/CD pipelines for back-end and front-end development operations in Gitlab 
    • Perform auto-scaling and load-balancing via Kubernetes and Docker through GitLab pipelines and hosting services provided by Google Cloud Platform 
    • Extending the apollo platform to develop a versatile and clean backend API with GraphQL 
    • UI/UX balanced and designed iteratively with changing clients needs
    `,
    icon: '',
  },
  {
    title: 'Freelance',
    image: afImage,
    alt: 'JavaScript',
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
const Experience = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles();
    return (
      <>
        <section
          ref={ref}
          className={(classes.carouselSection)}
        >
          {/* title */}
          <Typography
            color="inherit"
            align="center"
        // {...SCROLL_PROPS}
            variant="h1"
          >
            Experience
          </Typography>
          <ThreeDCarousel
            alt
            id="skills"
            title="Languages"
            key="languages"
            carouselData={experienceData}
            cardHeight={300}
            cardWidth={300}
          />
        </section>

        <section
          ref={ref}
          className={(classes.carouselSection)}
        >
          {/* title */}
          <Typography
            color="inherit"
            align="center"
        // {...SCROLL_PROPS}
            variant="h1"
          >
            Skills
          </Typography>
          <ThreeDCarousel
            title="Languages"
            key="languages"
            carouselData={languageData}
            cardHeight={150}
            cardWidth={150}
            alt
            special
          />
        </section>
      </>
    );
  }),
);
// ========================================================================== //
// Projects
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
    const { id } = props;
    // const projectData = useStaticQuery(graphql`
    //   query {
    //     allMarkdownRemark(
    //       filter: { frontmatter: { templateKey: { eq: "project" } } }
    //     )
    //     nodes {
    //       frontmatter {
    //         title
    //       }
    //       tableOfContents
    //     }
    //   }
    // `)

    return (
      <section
        ref={ref}
        id={id}
        className={(classes.section, classes.experienceContainer)}
      >
        <Grid container justify="space-between">
          <CardCarousel
            title="Languages"
            key="languages"
            carouselData={projectsData}
            alt
            cardHeight={300}
            cardWidth={300}
          />
        </Grid>
      </section>
    );
  }),
);

// ========================================================================== //
// Contact
// ========================================================================== //
const Contact = React.memo(
  React.forwardRef((props, ref) => {
    const classes = useStyles();
    return (
      <section ref={ref} className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={7} sm={6} />
          <Grid item xs={5} sm={6} />
        </Grid>
      </section>
    );
  }),
);

// ========================================================================== //
// WhatDoYouNeed
// ========================================================================== //

const servicesData = [
  {
    title: 'Websites',
    src: websiteImage,
    description: '',
    priceRange: '$300-$3000',
    color: '#119F74',
    ctas: [
      {
        title: 'Learn More',
        href: '#',
      },
    ],
  },
  {
    title: 'Design',
    src: designImage,
    description: '',
    priceRange: '$300-$3000',
    color: '#B314CD',
    ctas: [
      {
        title: 'Learn More',
        href: '#',
      },
    ],
  },
  {
    title: 'Apps',
    src: appsImage,
    description: '',
    priceRange: '$300-$3000',
    color: '#DF650D',
    ctas: [
      {
        title: 'Learn More',
        href: '#',
      },
    ],
  },
  {
    title: 'UI/UX',
    src: uiuxImage,
    description: '',
    priceRange: '$300-$3000',
    color: '#2E00FF',
    ctas: [
      {
        title: 'Learn More',
        href: '#',
      },
    ],
  },
  {
    title: 'VR',
    src: vrImage,
    description: '',
    priceRange: '$300-$3000',
    color: '#C71073',
    ctas: [
      {
        title: 'Learn More',
        href: '#',
      },
    ],
  },
  {
    title: 'Branding',
    src: brandingImage,
    description: '',
    priceRange: '$300-$3000',
    color: '#A4AF1D',
    ctas: [
      {
        title: 'Learn More',
        href: '#',
      },
    ],
  },
];
  // const websiteDescription = (
  //     <ul className={classes.whatDoYouNeedPoints}>
  //       <li>
  //         Your current website is outdated or is not meeting your business goals
  //       </li>
  //       <li>
  //         Your current website is hard to manage, has security problems or is
  //         slow
  //       </li>
  //       <li>
  //         You need a new website to promote your product or business to users,
  //         stakeholders, or investors
  //       </li>
  //     </ul>
  //   );
  //   const designDescription = (
  //     <ul className={classes.whatDoYouNeedPoints}>
  //       <li>You want new branding that captivates your audiences attention</li>
  //       <li>
  //         You want a website or app design that builds user trust and usability
  //       </li>
  //       <li>
  //         You want to build a image that communicates your companys purpose
  //       </li>
  //     </ul>
  //   );
const WhatDoYouNeedCard = ({ data }) => {
  const { breakpoint } = useBreakpoints();
  const {
    src, title, priceRange, color = '#C71073', ctas,
  } = data;
  const classes = useStyles({ bgColor: color });
  return (
    <>
      <Grid
        item
        lg={3}
        sm={5}
        xs={12}
      >
        <Card className={classes.serviceCard}>
          {/* Typography */}
          <Typography
            color="inherit"
            variant="h1"
            align="left"
            className={classes.typography}
          >
            {title}
          </Typography>
          <Typography
            color="inherit"
            variant="h4"
            align="left"
            className={classes.typography}
          >
            {priceRange}
          </Typography>
          <Grid item style={{ paddingBottom: 20 }}>
            <img
              alt="What Do You Need Graphic"
              className={classes.servicesImage}
              src={src}
            />
            <Typography
              color="secondary"
              gutterBottom
              align="center"
              component="div"
            />
          </Grid>
        </Card>
        {/* CTA */}
      </Grid>
    </>
  );
};
const WhatDoYouNeed = React.memo(
  React.forwardRef((props, ref) => {
    const bgAlt = 0;
    const { id } = props;
    const classes = useStyles({ bgAlt });

    return (
      <section
        id={id}
        ref={ref}
        className={(classes.section, classes.whatDoYouNeed)}
      >
        <Grid
          container
          justify="space-evenly"
          alignContent="center"
          xs={12}
          style={{ paddingBottom: 20, margin: 'auto' }}
          className={classes.typography}
          // style={{ marginBottom: '105px' }}
        >
          {servicesData.map((service, index) => (
            <WhatDoYouNeedCard
              key={index}
              data={service}
            />
          ))}
        </Grid>

      </section>
    );
  }),
);

export {
  About,
  BlogPosts,
  Languages,
  Contact,
  Descriptor,
  Experience,
  WhatDoYouNeed,
};
