// import React from "react";
// import Helmet from "react-helmet";
// import styled from "@emotion/styled";
// import { graphql } from "gatsby";
// import { Row } from "react-bootstrap";
// import Layout from "../components/layout";
// import PostLink from "../components/post-link";
// import HeroHeader from "../components/heroHeader";
// import VisualisationsBuilder from "../components/visualisations-builder";
// import Transition from "../components/transition";


// const Spacer = styled.div`
//   margin-top: 60vh;
// `;

// const GraphicWave = styled.div`
//   position: fixed;
//   top: 0px;
//   left: 0px;
//   opacity: 0;
//   z-index: -1;
// `;

// const StickyForeground = styled.div`
//   z-index: -2;
//   height: 100%;
//   width: 100%;
//   left: 0px;
//   top: 0px;
//   position: sticky;
//   background: ${props => props.theme.colors.primary};
// `;
// const PageContent = styled.main`
//   margin: 0px;
//   z-index: 1;
//   position: relative;
//   width: 100%;
//   height: 100%;
//   pointer-events: none; //this element overlaps the heroheader interactables, so we disable events on this element, and enable them for all child elements
//   & * {
//     pointer-events: auto;
//   } //enable for all child elements

//   padding-top: 200px;
//   background: linear-gradient(
//     0deg,
//     ${props => props.theme.colors.contentForeground} 50%,
//     ${props => props.theme.colors.contentColor} 80%,
//     rgba(0, 0, 0, 0) 80%
//   );
// `;
// // &:after {
// //   content: "";
// //   width: 400%;
// //   height: 100%;
// //   position: absolute;
// //   top: 30%;
// //   right: 50%;
// //   ${props => props.theme.animations.blob};
// //   background: ${props => props.theme.colors.contentColor};
// //   box-shadow: ${props => props.theme.colors.primary};
// // }
// // &:before {
// //   content: "";
// //   width: 400%;
// //   height: 50%;
// //   position: absolute;
// //   top: 10%;
// //   left: 50%;
// //   ${props => props.theme.animations.blob};
// //   background: ${props => props.theme.colors.contentColor};
// //   box-shadow: ${props => props.theme.colors.primary};
// // }

// const visualisationsPage = React.memo(
//   ({
//     data: {
//       site,
//       allMarkdownRemark: { edges }
//     }
//   }) => {
//     const Posts = edges
//       .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
//       .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

//     return (
//       <Layout>
//         <script src="https://cdn.rawgit.com/LeaVerou/conic-gradient/609dc5f4/conic-gradient.js" />

//         <Helmet>
//           <title>{site.siteMetadata.title}</title>
//           <meta name="description" content={site.siteMetadata.description} />
//         </Helmet>

//         <HeroHeader
//           headerGraphic="./assets/svg/visualisations-graphic.png"
//           headlineDescription="I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled"
//           headline={
//             <>
//               SEEING
//               <br />
//               is BELEIVING
//             </>
//           }
//         />

// <Transition/>
//         <PageContent>
//           <VisualisationsBuilder />
//         </PageContent>

//         <StickyForeground />
//       </Layout>
//     );
//   }
// );
// // {Posts}

// export default visualisationsPage;
// export const pageQuery = graphql`
//   query visualisationsPageQuery {
//     site {
//       siteMetadata {
//         title
//         description
//       }
//     }
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             thumbnail
//           }
//         }
//       }
//     }
//   }
// `;
