import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import Layout from "../components/layout";


export default ({otherBlogs}) => {

  return (
   <Container>
   {otherBlogs.foreach((post)=>{
   return(<>
   <img/>
   <h2></h2>
   <p></p>
   </>)

   })}
   </Container>
  );
}


const Container = styled.section`
  display: flex;
  flex: 2 1 1;

  & post {
   border-radius: ${props=>props.theme.corners.borderRadius1};
   width: 100%;
   height: 300px;

   & img {}
   & p {}
  }
`;

const Post = styled.article`
  margin-top: 7vw;
  color: ${props => props.theme.colors.textSecondary};
  padding: 100px 0vw;
  display: flex;
  flex-direction: row;
  order: 0;

  & .post-details {
    flex: auto;
    padding: 25px;

    & .post-title {
      ${props=>props.theme.breakpoints.md(`font-size: 3em;`)}
      color: ${props => props.theme.colors.textSecondary};
      text-transform: capitalcase;
      margin-bottom: 6.125px;
      font-weight: bolder;
      text-align: center;
      font-size: 1.75em;
      font-weight: bold;
      z-index: 3;
    }

    & .post-meta {
      text-align: center;
      font-family: "brown";
      color: ${props => props.theme.colors.textSecondary};
    }
  }

  & .post-thumbnail {
    position: absolute;
    order: 1;
    left: 0px;
    opacity: .25;
    top:0px;
    z-index: -1;
    height: 60vh;
    width: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
