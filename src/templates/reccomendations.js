// determine order of other blogs

export default ({ data }) => {
  return (
    <Row>
      {data.map(post => {
        return (
          <Col xl={data.length / 12}>
            <Reccomendation />
          </Col>
        );
      })}
    </Row>
  );
};

const Reccomendation = styled.div``;

export const ReccomendationQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail_
      }
    }
  }
`;
