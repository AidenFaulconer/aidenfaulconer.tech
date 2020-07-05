import React, { useState, useEffect, useCallback, useRef } from "react";
import { Row, Col, Pagination, Media } from "react-bootstrap";
import styled from "@emotion/styled";

import stickybits from "stickybits";
import { Icon, InlineIcon } from "@iconify/react";
import projectsIcon from "@iconify/icons-ic/baseline-work";
import skillsIcon from "@iconify/icons-fa-solid/clipboard-list";
import experienceIcon from "@iconify/icons-fa-solid/road";
import backgroundIcon from "@iconify/icons-ic/sharp-person-pin";
import contactIcon from "@iconify/icons-bx/bxs-contact";
import * as ConicGradient from "conic-gradient";

import { StaticQuery, graphql } from "gatsby";

// #region svg icons
import filterIcon from "@iconify/icons-mdi/filter-variant";
import { Btn, BtnPrimary, BtnSecondary } from "./buttons";
// #endregion svg icons

// #region blog card
export const Projects = ({ sectionName }) => {
  const [selected, selectProject] = useState(0);

  return <> </>;
};
// #endregion blog card

// #region section builder
// keys must be Capitalized for react to render them
const sections = {
  Projects: React.memo(Projects),
  Test: React.memo(Projects),
  Test1: React.memo(Projects),
  Test2: React.memo(Projects)
};
const sectionIcons = {
  Projects: projectsIcon,
  Test: projectsIcon,
  Test1: projectsIcon,
  Test2: projectsIcon
};
// must exist outside component
const ContentNavigation = styled.nav`
  z-index: 100;
  position: sticky;
  visibility: visible;
  ${props => props.theme.transitions.primary("all")};

  & .heading {
  }

  & .navigation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    top: 0px;
    height: auto;
    overflow: hidden;
    z-index: -1;
    padding: 12.5px;
    border-radius: ${props => props.theme.corners.borderRadius2};
    background: ${props => props.theme.colors.contentColor};
    box-shadow: ${props => props.theme.shadows.primary};

    & .navigation-header {
      margin: auto;
      position: relative;
      width: 100%;
      height: 100px;
      margin-bottom: 25px;

      & img {
        position: absolute;
        top: 0px;
        border-radius: ${props => props.theme.corners.borderRadius100};
        width: 75px;
        height: 75px;
      }

      & p {
        position: absolute;
        top: 12.5px;
        margin: auto;
        left: 100px;
        border-radius: ${props => props.theme.corners.borderRadius100};
      }

      & * {
        fill: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.textColor};
      }

      & svg {
        background: ${props => props.theme.colors.innerContentColor};
        position: relative;
        ${props => props.theme.animations.blob};
        top: -50px;
        left: -200px;
        width: 750px;
        height: 150px;
      }
    }

    & button {
      display: flex;
      background: none;
      flex-direction: row;
      justify-content: space-between;
      border-radius: ${props => props.theme.corners.borderRadius4};
      padding: 12.25px;
      border: none;
      width: 100%;
      z-index: 2;
      color: ${props => props.theme.colors.textColor};

      & p {
        margin: auto;
        font-size: ${props => props.theme.text.sizes.small};
        visibility: hidden;
        display: none;

        ${props =>
          props.theme.breakpoints.xl(`
          margin-right: 10px;
          visibility: visible;
          display:block;
      `)}
      }

      & svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        margin-left: 10px;
        fill: ${props => props.theme.colors.textColor};
      }

      &.active {
        fill: white;
        font-weight: bolder;
        background: ${props => props.theme.colors.primary};
        ${props => props.theme.transitions.primary("background")};
      }
    }
  }
`;
// wrap all styled components in useCallback so they do not incur render overhead
const ContentContainer = styled.section`
  position: relative;
  z-index: 1;
  padding: 25px;
  color: ${props => props.theme.colors.textColor};

  & *[class*="col"] {//add gutters
         row-gap: 25px;
         column-gap: 25px;
         margin-top: 25px;
    }

    & .section-card {
      padding: 25px;
      position:relative;
      padding-top: 82px;//offset the heading
      max-height: 1000px;
      width: 100%;
      display: flex;
      background: ${props => props.theme.colors.contentColor};
      border-radius: ${props => props.theme.corners.borderRadius2};
      box-shadow: ${props => props.theme.shadows.primary};


    & .header {
      width:100%;
      color: ${props => props.theme.colors.textColor};
      background: ${props => props.theme.colors.innerContentColor};
      border-radius: 10px 10px 0px 0px;
      position: absolute;
      top:1px;
      left:0px;
      padding: 12.5px;
      padding-bottom: 3.125px;
      z-index: 1;
      overflow: hidden;

      &:before {
        content: "";
        ${props => props.theme.animations.blob};
        position:absolute;
        left:-125px;
        top:-30px;
        z-index: -1;
        height: 250%;
        width: 50%;
        opacity: .6;
        background: ${props => props.theme.colors.primary};
      }
      &:after {
        content: "";
        ${props => props.theme.animations.blob};
        position:absolute;
        left: -10%;
        top:-60px;
        z-index: -1;
        height: 450%;
        width: 80%;
        opacity: .3;
        background: ${props => props.theme.colors.primary};
      }

      & p {
        position: relative;
        display:inline-block;
        width: 50%;
        margin-top:-3px;
      }

      & svg {
        margin-right: 6.25px;
      }
    }
   }

    ${props =>
      props.theme.breakpoints.lg(`
      `)}
    //customize the responsiveness of each section card
      & #Projects {
    }
    & #Skills {
    display: flex;
    flex-direction: row;
    }
    & #Experience {
      flex-direction: column;
      justify-content: space-evenly;
    }
    & #Background {
      flex-direction: row;
    }
    & #Contact {
      flex-direction: row;
    }
  }
  & *[class*="row"] {
  }
`;
const SectionBreak = styled.hr`
  z-index: 2;
  position: relative;
  top: 0px;
`;

export const waveSvg = `
  <svg width="368" height="152" viewBox="0 0 368 152" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M-69.8227 16.0676C-70.7273 18.4623 -70.6095 21.0937 -70.8727 23.6401C-72.6875 41.2015 -78.5837 114.079 -53.7778 132.62C2.76013 174.879 78.7487 129.624 163.538 132.62C226.9 134.858 301.436 166.673 325.48 142.629C441.108 27.0013 373.16 -4.16308 355.957 -9.81157C353.556 -10.6003 351.194 -11.4559 348.798 -12.2629C337.535 -16.0571 295.145 -26.1846 163.538 -26.1846C-36.3323 -26.1845 -65.6777 5.09382 -69.8227 16.0676Z" fill="none"/>
  </svg>
  `;

const FilterBar = styled.div`
border-radius: ${props => props.theme.corners.borderRadius2};
background: ${props => props.theme.colors.textPrimary};
flex-direction: row:
display:relative;
margin-bottom: 75px;
color: ${props => props.theme.colors.contentForeground};
display:flex;

& svg {
border-right: 1px solid currentColor;
height: 100%;
padding: 6.125px;
min-width: 50px;
};

& p {
margin: 12.5px 25px;
font-weight: bolder;
text-transform: capitalize;
}

`;

const Header = styled.div`
  margin-top: 125px;
  margin-bottom: 12.5px;
  font-size: ${props => props.theme.text.sizes.title};
  color: ${props => props.theme.colors.textPrimary};
  font-weight: bolder;
  font-family: "brown-bold";
`;

export const catagories = ["technology", "design", "workflow", "discovery"];

export default React.memo(({ theme }) => {
  const sectionMeasurements = [];
  const [currentSection, setCurrentSection] = useState("Projects");
  const currentSectionRef = useRef(); // allow usecallbacks to access the current state when they fire
  const [scrollPos, setScrollPos] = useState(
    document.body.getBoundingClientRect().y
  );
  const positionRef = useRef(); // allow usecallbacks to access the current state when they fire
  const sectionRefs = useRef(null);
  const scrollToSection = useCallback(elem => {
    if (typeof window !== "undefined") {
      window.scrollBy(0, -115);
    } // adjust scrolling with negative value
    sectionRefs.current[elem].scrollIntoView({ behavior: "smooth" });
    setCurrentSection(elem);
  });
  const watchScroll = useCallback(() => {
    const currentScrollPos = document.body.getBoundingClientRect().y; // return size of body element relative to clients viewport (width/height) *padding/border calculated only in body
    setScrollPos(currentScrollPos);

    Object.keys(sectionRefs.current).map(section => {
      console.log(section.__yOffset);
      if (section.__yOffset > Math.abs(currentScrollPos)) {
        setCurrentSection(section.name);
        // scrollToSection(section.name);
      }
    });
  });

  const measureSections = useCallback(() => {
    const sectionRefKeys = Object.keys(sectionRefs.current);

    // adds a __yOffset value to each element
    sectionRefKeys
      .map(elementName => sectionRefs.current[elementName].clientHeight) // get all the heights (in backward order)
      .reduce((accumulatedHeight, nextSectionHeight, i) => {
        sectionRefs.current[sectionRefKeys[i]].__yOffset = accumulatedHeight; // create a new property on the object
        return accumulatedHeight + nextSectionHeight;
      });
  });

  useEffect(() => {
    stickybits("#sticky", { useStickyClasses: true });
    if (typeof window !== "undefined") {
      window.addEventListener("resize", measureSections);
      window.addEventListener("scroll", watchScroll);
    }
  }, []);

  useEffect(() => {
    // measureSections();
  }, [sectionRefs.current]);

  positionRef.current = scrollPos;
  currentSectionRef.current = currentSection;
  sectionRefs.current = {};

  return (
    <StaticQuery
      //       //       query={graphql`
      query={blogPageQuery}
      render={data => {

        const catagoryMappings = {};
        console.log(data);

        return (
          <>
            <Row noGutters>
              <Col
                xl={1}
                lg={1}
                md={1}
                className="d-sm-none d-md-none d-lg-block"
              />

              <Col xl lg md>
                <ContentContainer>
                  <Header>BLOG</Header>
                  <FilterBar>
                    <Icon icon={filterIcon} />
                    {catagories.map(catagory => (
                      <p>{catagory}</p>
                    ))}
                  </FilterBar>
                  <Row>
                    {Object.keys(sections).map((sectionName, i) => {
                      const RenderSection = sections[sectionName];
                      return (
                        <Col
                          className="content"
                          xl={5}
                          lg={5}
                          md={6}
                          sm={12}
                          xs={12}
                        >
                          <div
                            className="section-card"
                            key={sectionName}
                            id={sectionName}
                            ref={ref => {
                              sectionRefs.current[sectionName] = ref;
                            }}
                          >
                            <div className="header">
                              <InlineIcon icon={sectionIcons[sectionName]} />
                              <p>{sectionName}</p>
                            </div>
                            <RenderSection sectionName={sectionName} />
                          </div>
                        </Col>
                      );
                    })}

                    <Col
                      xl={2}
                      lg={2}
                      style={{ marginTop: "0px" }}
                      className="d-xs-none d-sm-none d-md-none d-lg-block "
                    >
                      <ContentNavigation id="sticky">
                        <div className="navigation-container">
                          <div className="navigation-header">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: waveSvg
                              }}
                            />
                            <img imgSrc="./assets/svg/profile.png" />
                            <p>portfolio</p>
                          </div>
                          {Object.keys(sections).map(sectionName => (
                            <button
                              className={
                                currentSection === sectionName ? "active" : ""
                              }
                              type="submit"
                              onClick={() => {
                                setCurrentSection(sectionName);
                                scrollToSection(sectionName);
                              }}
                            >
                              <Icon icon={sectionIcons[sectionName]} />
                              <p>{sectionName}</p>
                            </button>
                          ))}
                        </div>
                      </ContentNavigation>
                    </Col>
                  </Row>
                </ContentContainer>
              </Col>

              <Col
                xl={1}
                lg={1}
                md={1}
                className="d-sm-none d-md-none d-lg-block"
              />
            </Row>
          </>
        );
      }}
    />
  );
});
// #endregion section builder

export const blogPageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
            metaDescription
          }
        }
      }
    }
  }
`;

//       render={data => {
//         const catagoryMappings = {}; // holds all the catagories as per the PATH mappings in each blog post fetched

//         (() =>
//           data.allMarkdownRemark.edges.map(edge => {
//             const thisCatagory = edge.node.frontmatter.path.split("/")[2];
//             if (catagoryMappings[thisCatagory])
//               // push edge to array
//               catagoryMappings[thisCatagory].push(edge);
//             else catagoryMappings[thisCatagory] = []; // empty arrwy
//           }))();
//         console.log(catagoryMappings);
//         // get catagories from path of blog, use those catagoreis to correspond to a component to handle it, iterate on all the posts of that catagory passing it to that component
//         return Object.keys(catagoryMappings).map((catagory, i) => {
//           // get posts
//           const SectionComponent = sections[catagory]; // get tangible reference for react to dynamically generate a component from
//           return (
//             <section
//               id={catagory}
//               key={catagory + i}
//               style={sectionStyles[catagory]} // customize styling locally for each catagory oficially mapped out
//             >
//                 {catagory.toUpperCase()}
//               </div>
//               <div className="blog__wrapper" id="blog__wrapper">
//                 {/** You can filter your posts based on some criteria */}
//                 {catagoryMappings[catagory]
//                   .filter(edge => !!edge.node.frontmatter.date)
//                   .map(edge => (
//                     <CSSTransition
//                       in={inProp}
//                       timeout={1000}
//                       classNames="left-transition"
//                     >
//                       <SectionComponent key={edge.node.id} post={edge.node} />
//                     </CSSTransition>
//                   ))}
//               </div>
//             </section>
//           );
//         });
//       }}
//     />
//   );
// });

// {
//   "groupName": "languages",
//   "skills": [
//     [
//       {
//         "name": "languages",
//         "skillName": "",
//         "icon": "import link to require",
//         "description": ""
//       },
//       {
//         "name": "languages",
//         "skillName": "",
//         "icon": "import link to require",
//         "description": ""
//       },
//     ]
//   },
// ],
// "group": {
//   "groupName": "languages",
//   "skills": [
//     "group": {
//       "groupName": "languages",
//       "skills": [
//         {
//           "name": "languages",
//           "skillName": "",
//           "icon": "import link to require",
//           "description": "",
//         },
//         {
//           "name": "languages",
//           "skillName": "",
//           "icon": "import link to require",
//           "description": "",
//         ],
//       ]
//     },
//   },
// },
// export const experienceData = {
//   australianwarmemorial: {
//     description: `I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled`,
//     location: "canberra",
//     employer: "Australian War Memorial",
//     imgSrc: "./assets/image-2.jpg",
//     date: "april 2020",
//     role: "developer"
//   },
//   yum: {
//     description: `I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled`,
//     employer: "Australian War Memorial",
//     location: "canberra",
//     imgSrc: "./assets/image-3.jpg",
//     date: "december 2020",
//     role: "developer"
//   },
//   icn: {
//     description: ``,
//     employer: "Australian War Memorial",
//     location: "",
//     imgSrc: "./assets/image-2.jpg",
//     date: "",
//     role: ""
//   },
//   larchegenesaret: {
//     description: ``,
//     employer: "Australian War Memorial",
//     location: "",
//     imgSrc: "./assets/image-2.jpg",
//     date: "",
//     role: ""
//   }
// };
// use arrays, the logic handling this uses .map which wont work on objects
// module.exports = {
//   portfolio: [
//     {
//       model: false,
//       title: "VR Movement Recognition",
//       mediaUrl: "https://i.imgur.com/t55NQ7m.mp4",
//       catagory: "VR Application",
//       description:
//         "Scores users movement against pre-recorded movement. Providing an extensible solution for training, used here in the context of Tai Chi",
//       blog: {
//         about: "",
//         objectives: "",
//         results: ""
//       }
//     },
//     {
//       model: false,
//       title: "On Closer Inspection",
//       mediaUrl: "https://i.imgur.com/2acj61h.mp4",
//       catagory: "Fullstack Application",
//       description:
//         "A project I was involved in during my time at the Australian War Memorial, a configurable VR experience for virtual exhibits",
//       blog: {
//         about: "",
//         objectives: "",
//         results: ""
//       }
//     },
//     {
//       model: false,
//       title: "OpenGL Game engine",
//       mediaUrl: "https://i.imgur.com/RO4eieT.mp4",
//       catagory: "Graphics Programming",
//       description: "Minimal viable game engine coded in c++ on top of openGL",
//       blog: {
//         about: "",
//         objectives: "",
//         results: ""
//       }
//     },
//     {
//       model: false,
//       title: "Python apps",
//       mediaUrl: "https://i.imgur.com/jaP2kH5.mp4",
//       catagory: "Desktop Application",
//       description: "Simple console/GUI apps made in python",
//       blog: {
//         about: "",
//         objectives: "",
//         results: ""
//       }
//     }
//     //   {
//     //     "model": true,
//     //     "title": "3d character",
//     //     "mediaUrl": "https://sketchfab.com/models/64f06381ab2f47139c09875ec0c7b254/embed",
//     //     "catagory": "3d Model",
//     //     "description": "Rigged game charecter for an upcoming vfx show reel"
//     //   },
//     //   {
//     //     "model": true,
//     //     "title": "Mech Bust",
//     //     "mediaUrl": "https://sketchfab.com/models/ea71b4a0e59443529d5cfb082953059b/embed",
//     //     "catagory": "3d Model",
//     //     "description": "3d mech bust made in z-brush"
//     // }
//   ],
//   about: [
//     {
//       title: "BACKGROUND",
//       description: `Before graduating University I was contracted for the Australian War Memorial. I created 3D/VR experiences for the 1.14 million visitors to Nations Capital.
//     <pre></pre>
//     Currently I am the lead software developer/designer for Mentoras, where I am creating a marketplace for consultants and mentors
//     <pre></pre>
//     In my free time i’m a freelance designer and software developer. And a vfx artist currently assembling a show-reel`,
//       mediaUrl: ""
//     },
//     {
//       title: "photo of me",
//       description: "photo of me",
//       mediaUrl: "https://i.imgur.com/9oRAGBj.jpg"
//     }
//   ],
//   description: [
//     `
//     Let’s build and design the future.<br>
//     Any programming language.<br>
//     Any technology.<br>
//     Any design.
//     `
//     // "UX designer",
//     // "UI developer",
//     // "3D designer",
//     // "Software Developer"
//   ],
//   footer: [
//     {
//       title: "phone",
//       value: "+61 0475565709"
//     },
//     {
//       title: "email",
//       value: "aidenf09@yahoo.com"
//     }
//   ],
// };
