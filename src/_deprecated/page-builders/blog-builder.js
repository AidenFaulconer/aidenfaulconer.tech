// import React, { useState, useEffect, useCallback, useRef } from "react";
// import styled from "@emotion/styled";

// import stickybits from "stickybits";
// import { Icon, InlineIcon } from "@iconify/react";
// import projectsIcon from "@iconify/icons-ic/baseline-work";
// import skillsIcon from "@iconify/icons-fa-solid/clipboard-list";
// import experienceIcon from "@iconify/icons-fa-solid/road";
// import backgroundIcon from "@iconify/icons-ic/sharp-person-pin";
// import contactIcon from "@iconify/icons-bx/bxs-contact";

// import { StaticQuery, graphql, Link } from "gatsby";

// import filterIcon from "@iconify/icons-mdi/filter-variant";
// import { useTheme } from "emotion-theming";
// import { Btn, BtnPrimary, BtnSecondary } from "../buttons";

// import { blogGraphic } from "../../static/assets/svg/hardcoded-svgs.js";
// // #region blog card
// export const BlogCard = ({ data }) => {
//   const [selected, selectProject] = useState(0);

//   return <div>{JSON.stringify(data)}</div>;
// };
// // #endregion blog card

// // #region section builder
// // keys must be Capitalized for react to render them

// const sectionIcons = {
//   Projects: projectsIcon,
//   Test: projectsIcon,
//   Test1: projectsIcon,
// };

// const mockData = [
//   {
//     mediaSrc: "./assets/becca-tapert-sY5RjMB1KkE-unsplash.jpg",
//     title: "title",
//     catagory: "technology",
//     description: "description",
//   },
// ];

// export const catagories = ["technology", "design", "workflow", "discovery"];

// export default React.memo(() => {
//   const [featuredBlog, setFeaturedBlog] = useState(0);
//   const [filteredBlogs, setFilteredBlogs] = useState([0, 1, 2, 3, 4]);
//   const theme = useTheme();

//   const [selectedFilters, selectFilters] = useState({
//     design: true,
//     technology: true,
//   }); // toggle filters by default

//   const filterBlogs = useCallback((data, filters) => {
//     return data.filter((current, i) => filters.includes(current));
//   });
//   // https://www.npmjs.com/package/react-intersection-observer#polyfill

//   // handle a section coming into view
//   useEffect(() => {}, [filteredBlogs]);

//   function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   }

//   useEffect(() => {}, [selectedFilters]);

//   return (
//     <StaticQuery
//       //       //       query={graphql`
//       query={blogPageQuery}
//       render={(data) => {
//         const catagoryMappings = {};
//         // alert(JSON.stringify(data));
//         const rawBlogData = data.allMarkdownRemark.edges;
//         const featuredBlog = rawBlogData[0].node.frontmatter;
//         return (
//           <Test>
//             <div className="row" noGutters style={{ paddingTop: "0px" }}>
//               <div
//                 xl={1}
//                 lg={1}
//                 md={1}
//                 className="col d-sm-none d-md-block d-lg-block"
//               />

//               <div
//                 className="col"
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   flexWrap: "wrap",
//                   justifyContent: "center",
//                   border: "2px solid transparent",
//                 }}
//               >
//                 <div className="d-none d-xs-none d-sm-block col col-xl-6 col-lg-6 col-md-11 col-sm-11">
//                   <Link to={featuredBlog.path}>
//                     <FeaturedBlog src={featuredBlog.thumbnail_}>
//                       <img src={featuredBlog.thumbnail_} />
//                       <div className="featured-content">
//                         <h3>{featuredBlog.title}</h3>
//                         <p>{featuredBlog.metaDescription}</p>
//                         <div className="cta">read more</div>
//                       </div>
//                     </FeaturedBlog>
//                   </Link>
//                 </div>

//                 <div className="col col-xl-4 col-md-10 col-sm-10 col-xs-10">
//                   <OtherBlogs>
//                     {rawBlogData.map((blog, i) => {
//                       const blogData = blog.node.frontmatter;
//                       return (
//                         <Link to={blogData.path} key={`${blog.title}-${i}`}>
//                           <div className="card">
//                             <img src={blogData.thumbnail_} />
//                             <p>{blogData.title}</p>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </OtherBlogs>
//                 </div>

//                 <div className="col col-xl-2 col-lg-2 d-none d-xs-none d-sm-none d-md-none d-lg-block d-xl-block ">
//                   <Graphic>
//                     <div
//                       style={{ fill: theme.colors.secondary }}
//                       dangerouslySetInnerHTML={{ __html: blogGraphic }}
//                     />
//                   </Graphic>
//                 </div>
//               </div>

//               <div className="col d-sm-none d-md-block d-lg-block" />
//             </div>
//           </Test>
//         );
//       }}
//     />
//   );
// });
// // #endregion section builder
// const Test = styled.div``;

// export const Graphic = styled.div`
//   position: relative;
//   bottom: -12.5%;

//   & svg {
//     width: 100%;

//     & #dark-blue {
//       fill: ${(props) => props.theme.colors.textSecondary};
//     }

//     & #blue {
//       fill: ${(props) => props.theme.colors.primary};
//     }

//     & #white {
//       fill: ${(props) => props.theme.colors.foreground};
//     }
//   }
// `;

// const FeaturedBlog = styled.article`
//   position: relative;
//   height: 484px;
//   width: 100%;
//   z-index: 2;
//   background: ${(props) => props.theme.colors.primary};
//   color: ${(props) => props.theme.colors.textPrimary};
//   border-radius: ${(props) => props.theme.corners.borderRadius1};
//   overflow: hidden;
//   ${(props) => props.theme.transitions.primary("transform")};

//   & img {
//     object-fit: fit;
//     position: relative;
//     top: 0px;
//     left: 0px;
//     height: 100%;
//     width: 35%;
//   }

//   &:hover {
//     cursor: pointer;
//     box-shadow: ${(props) => props.theme.shadows.primary};
//   }

//   &:hover {
//     cursor: pointer;
//     box-shadow: ${(props) => props.theme.shadows.primary};
//     ${(props) => props.theme.transitions.primary("transform")};
//     transform: scale(1.025);
//   }

//   & .featured-content {
//     padding: 25px;
//     z-index: 2;
//     position: absolute;
//     content: "";
//     width: 65%;
//     height: 100%;
//     object-fit: cover;
//     right: 0px;
//     top: 0px;
//     z-index: 0;
//     background: ${(props) => props.theme.colors.primary};
//     & h3 {
//       position: relative;
//       font-weight: bolder;
//       font-size: 2em;
//       top: 0px;
//       left: 0px;
//     }
//     & p {
//       top: 0px;
//       right: 0px;
//       margin-top: 25px;
//       position: relative;
//     }
//     & .cta {
//       bottom: 0px;
//       left: 0px;
//       margin: 25px;
//       position: absolute;
//       text-transform: capitalize;
//     }
//   }
// `;

// const OtherBlogs = styled.div`
//   display: grid;
//   position: relative;
//   z-index: 2;
//   grid-template-columns: 1fr;
//   justify-content: space-evenly;
//   margin-bottom: 175px;

//   ${(props) =>
//     props.theme.breakpoints.sm(`
//   margin-bottom: 0px;
//   padding: 25px 0px;
//   grid-template-columns: 1fr 1fr 1fr;
//   `)}

//   ${(props) =>
//     props.theme.breakpoints.lg(`
//   padding: 0px 25px;
//   margin-bottom: 200px;
//   grid-template-columns: 1fr;
//   `)}

//   & .card {
//     border-radius: ${(props) => props.theme.corners.borderRadius1};
//     ${(props) => props.theme.transitions.primary("all")};
//     color: ${(props) => props.theme.colors.textPrimary};
//     justiyf-self: center;
//     align-self: center;
//     postiion: relative;
//     overflow: hidden;
//     height: 150px;
//     z-index: 200;
//     // width: 200px;
//     border: none;
//     margin: 6px;

//     &:hover {
//       & img {
//         ${(props) => props.theme.transitions.primary("opacity")};
//         opacity: 0.6;
//       }

//       & p {
//         bottom: 50%;
//         background: ${(props) => props.theme.colors.primary};
//         ${(props) => props.theme.transitions.primary("bottom")};
//       }
//     }

//     & img {
//       width: 115%;
//       height: 100%;
//       margin-left: -2px;
//       background: ${(props) => props.theme.colors.primary};
//       ${(props) => props.theme.transitions.primary("opacity")};
//     }

//     &:hover {
//       cursor: pointer;
//       ${(props) => props.theme.mixins.transform3dPrimary};
//       box-shadow: ${(props) => props.theme.shadows.primary};
//       ${(props) => props.theme.transitions.primary("all")};
//     }
//   }

//   & p {
//     position: relative;
//     text-align: left;
//     vertical-align: middle;
//     padding: 12.5px;
//     overflow: hidden;
//     height: 100%;
//     bottom: 0%;
//     width: 100%;
//     ${(props) => props.theme.transitions.primary("bottom")};
//   }
// `;

// const Header = styled.div`
//   margin-top: 125px;
//   margin-bottom: 12.5px;
//   font-size: ${(props) => props.theme.text.sizes.title};
//   color: ${(props) => props.theme.colors.textPrimary};
//   font-weight: bolder;
//   font-family: "brown-bold";
// `;
// export const blogPageQuery = graphql`
//   query BlogQuery {
//     allMarkdownRemark(
//       filter: { frontmatter: { catagory: { regex: "/(B|blog)|(P|project)/" } } }
//       limit: 3
//       sort: { fields: frontmatter___date }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             catagory
//             thumbnail_
//             title
//             date(formatString: "DD MMMM YYYY")
//             metaDescription
//             path
//           }
//         }
//       }
//     }
//   }
// `;
