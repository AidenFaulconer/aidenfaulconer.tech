import * as React from "react"
import Layout from "../layout/layout"
import { BlogGrid, CardCarousel } from "../components/custom/cards"
// import Services from "../components/services"
// import Reviews from "../components/reviews"
// import HeroHeader from "../components/heroHeader"
// import AboutUs from "../components/aboutUs"
// import QuoteCalculator from "../components/quoteCalculator"

//services
// import treeCuttingImage from "../../static/images/tree-cutting.jpeg"
// import stumpRemovalImage from "../../static/images/stump-removal.jpeg"
// import trimmingImage from "../../static/images/trimming.jpeg"

//other services
// import mulchImage from "../../static/images/mulch.jpg"
// import firewoodImage from "../../static/images/firewood.jpeg"
// import emergencyImage from "../../static/images/emergency-services.jpg"
// import conservationImage from "../../static/images/conservation.jpg"
// import hedgeRemovalImage from "../../static/images/hedge-removal.jpg"
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({

  underlay: {
    position: "relative",
    // top: '-400px',
    content: '',
    margin: theme.spacing(3),
    padding: theme.spacing(12),
    paddingTop: 'unset',
    pointerEvents: 'all',
    overflow: 'hidden',
    boxShadow: theme.shadows.brandBig,
    background: "linear-gradient(180deg, #324308 15.49%, #8BAD6B 68.98%, #AAC882 103.74%)",
    borderRadius: theme.shape.brandBorderRadius3,
  },
  sectionCurve: {
    borderRadius: "100%",
    margin: 'auto',
    width: "100%",
    left: '0px',
    fill: "#324308",
    marginTop: '-43px',
    borderRadius: '100%',
    // fill: theme.palette.background.default,
  },
}))

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>

{
  /**mailchimp integration
      <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js");</script>
      */
}
const IndexPage = React.memo(
  (
    {
      //returned from pageQuery as props
      // data: {
      //   allMarkdownRemark: { edges },
      // },
    }
  ) => {

    const marginAmount = "175px"
    const classes = useStyles()

    return (
      <Layout>
        <HeroHeader id="back-to-top-anchor" />

        <Container maxWidth="xl">

          {/* underlay */}
          {/* <div> */}

          <div className={classes.underlay}>
            {/* <svg height="90" v viewBox="0 0 3135 181" className={classes.sectionCurve} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 180.987C0 180.987 953.896 180.958 1566.76 180.987C2180.2 181.016 3135 180.987 3135 180.987V115.207C3135 103.903 3126.98 94.4973 3115.73 93.4056C2977.74 80.015 2129.29 -0.0320126 1566.76 8.10623e-06C1004.78 0.0319973 157.196 80.0182 19.273 93.405C8.02259 94.497 0 103.903 0 115.206V180.987Z" />
          </svg> */}

            <CardCarousel
              title="SERVICES"
              id="#services"
              style={{ marginBottom: marginAmount }}
              carouselData={servicesData}
            />

            <CardCarousel
              title="WHAT OUR CLIENTS HAVE TO SAY"
              id="#ratings"
              reviews
              carouselData={reviewsData} />
          </div>
          {/* </div> */}
          {/* <QuoteCalculator /> */}
          <BlogGrid id="#blogPosts" title="AJ's Gardening Tips" blogData={blogPosts} />
        </Container>

      </Layout>
    );
  }
);

export default IndexPage;

//autorun at gatsby rebuild-cycle
// export const pageQuery = graphql`
//   query indexPageQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             thumbnail_
//           }
//         }
//       }
//     }
//   }
// `;
