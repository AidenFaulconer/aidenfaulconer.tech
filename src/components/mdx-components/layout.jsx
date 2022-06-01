import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import ThreeDCarousel from '../custom/threeDCarousel';
import BlogCarousel from './carousel';
import PostHeader from './heading';
import ContentArea from './contentArea';
import InteractiveImage from './interactiveImage';
import ThreeD from './threeDModelPresenter';
import Reccomendations from './reccomendations';

const components = {
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  h4: ({ children }) => <h4>{children}</h4>,
  h5: ({ children }) => <h5>{children}</h5>,
  h6: ({ children }) => <h6>{children}</h6>,
  p: ({ children }) => <p>{children}</p>,
  a: ({ children, href }) => <a href={href}>{children}</a>,
  img: ({ children, src }) => <img src={src} />,
  pre: ({ children }) => <pre>{children}</pre>,
  code: ({ children }) => <code>{children}</code>,
  inlineCode: ({ children }) => <code>{children}</code>,
  ul: ({ children }) => <ul>{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  table: ({ children }) => <table>{children}</table>,
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  td: ({ children }) => <td>{children}</td>,
  th: ({ children }) => <th>{children}</th>,
  hr: () => <hr />,
  br: () => <br />,
  strong: ({ children }) => <strong>{children}</strong>,
  //= ======================================================
  // custom
  //= ======================================================
  Carousel: ({ children, data }) => <BlogCarousel>{children}</BlogCarousel>,
  ContentArea: ({ children, data }) => <ContentArea>{children}</ContentArea>,
  PostHeader: ({ children, data }) => <PostHeader>{children}</PostHeader>,
  Interactive: ({ children, url, data }) => <InteractiveImage>{children}</InteractiveImage>,
  ThreeD: ({ children, model, data }) => <ThreeD>{children}</ThreeD>,
  Reccomendations: ({ children }) => <Reccomendations>{children}</Reccomendations>,
};

export const MDXLayout = ({ children }) => {
  const x = '';
  return (
    <MDXProvider
      components={{
        ...components,
      }}
    >
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  );
};

export default MDXLayout;
