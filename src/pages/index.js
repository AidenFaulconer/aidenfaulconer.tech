import React, { useState, useEffect, useMemo } from "react";
import Layout, { GlobalStore } from "../layout/layout";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import HeroHeader from "../components/portfolio/heroHeader";
import Pitch from "../components/portfolio/pitch";
import Experience from "../components/portfolio/experience";
import Skills from "../components/portfolio/skills";
import Contact from "../components/portfolio/contact";

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>

{
  /**mailchimp integration
      <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js");</script>
      */
}
const IndexPage = React.memo(
  ({
    //returned from pageQuery as props
    data: {
      allMarkdownRemark: { edges },
    },
  }) => {
    return (
      <Layout>
        <HeroHeader
          headerGraphic="./assets/svg/portfolio-graphic.png"
          headlineDescription="I create software applications for online businesses like you, so you can focus on getting your users needs fulfilled"
          headline={
            <>
              Beautiful, scalable
              <br />
              software.
            </>
          }
        />
        <Pitch />
        <Experience />
        <Skills />
        <Contact />
      </Layout>
    );
  }
);

export default IndexPage;

//autorun at gatsby rebuild-cycle
export const pageQuery = graphql`
  query portfolioPageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail_
          }
        }
      }
    }
  }
`;
