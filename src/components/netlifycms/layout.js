import React from "react";
import { graphql } from "gatsby";

import Layout from "@/components/Layout";
import SectionsGenerator from "@/components/SectionsGenerator";

import SEO from "@/components/SEO/Seo";

const SectionPageTemplate = ({ data }) => {
  const sections = data.frontmatter.sections;
  return (
    <>
      <SectionsGenerator sections={sections} />
    </>
  );
};

const LandingPage = ({ data }) => {
  return (
    <Layout hideNav={true}>
      <SEO data={data.page.frontmatter.seo} />
      <SectionPageTemplate data={data.page} />
    </Layout>
  );
};

export default SectionPage;

export const sectionsPageQuery = graphql`
  query SectionPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      html
      frontmatter {
        title
        ...Sections
        ...SEO
      }
    }
  }
`;
