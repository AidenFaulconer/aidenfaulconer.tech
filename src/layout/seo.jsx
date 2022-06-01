/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
import { useTheme } from '@mui/material';
import { useStaticQuery, graphql } from 'gatsby';

import React from 'react';
import { Helmet } from 'react-helmet';

export default function Seo({ seo = {}, pageUrl = './' }) {
  // TODO: seo should request a query based on the current page !!important!!
  const { site: { siteMetadata: { seoTitle, seoDescription, seoAuthor } } } = useStaticQuery(
    graphql`
      query {
        # graph filter by current page

        site {
          siteMetadata {
            seoTitle: title
            seoDescription: description
            seoAuthor: author
          }
        }
      }
    `,
  );

  const {
    description = seoDescription,
    dateFormat = 'F j, Y',
    email = 'aidenf09@yahoo.com',
    language = 'en',
    timeZone = 'Australia/Canberra',
    title = seoTitle,
    url = `${process.env.GATSBY_SITE_URL}`,
    twitter = '@aidenfaulconer',
    linkedin = 'aidenfaulconer',
    instagram = '@aidenfaulconer',
    facebook = 'Aiden Faulconer',
    google = 'aidenf09@gmail.com',
    metaDescription = 'hello world',
  } = seo;

  const seoKeywords = [
    'software',
    'design',
    'ui/ux',
    'ui',
    'ux',
    'software development',
    'software design',
    'virtual reality',
    'vr',
    'interaction design',
    'designer', 'fullstack developer',
    'fullstack development',
    'mobile development',
    'aiden',
    'aiden faulconer',
    'aiden software',
    'aiden development',
    'aiden design',
    'software help',
    'code help',
    'design help',
    'information technology',
  ].join(',').toString();

  const meta = {};
  const theme = useTheme();

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
      keywords={seoKeywords}
      titleTemplate={seoAuthor ? `%s | ${seoAuthor}` : null}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: twitter || '',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <title>{seoTitle}</title>
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif+SC:300,400|Noto+Serif+TC:300,400|Noto+Serif|Source+Sans+Pro:400,400i,700,700i|Merriweather&display=swap"
        rel="stylesheet"
      />
      <meta
        name="viewpoint"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta name="author" content="Aiden Faulconer" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content={theme.palette.text.primary} />
      <meta name="apple-mobile-web-app-title" content="Aiden Faulconer" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={`${process.env.GATSBY_SITE_URL}/images/favicon.png`} />
      <meta property="og:url" content={`${process.env.GATSBY_SITE_URL}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@joshuacrowley" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`${process.env.GATSBY_SITE_URL}/images/favicon.png`} />
      <meta name="twitter:url" content={`${process.env.GATSBY_SITE_URL}`} />

      <meta name="application-name" content="Aiden Faulconer" />
      <meta name="msapplication-navbutton-color" content={theme.palette.text.secondary} />
      <meta name="msapplication-TileColor" content={theme.palette.text.primary} />
      <meta name="msapplication-starturl" content="/" />
      <meta name="description" content={seoDescription} />
      <meta name="google-site-verification" content="EKP_cH_G7Aq3C3pFZVtH5a5X5Gq3e3p0qDt0Hw1l_w" />
      <meta name="msvalidate.01" content="B0F8F1D8B1B6D0C6C8E0B8B8B9B9B9C9C9C9C9" />
      <meta name="p:domain_verify" content="" />
      <meta
        name="viewpoint"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={theme.palette.text.primary} />

      {/* google fonts */}
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif+SC:300,400|Noto+Serif+TC:300,400|Noto+Serif|Source+Sans+Pro:400,400i,700,700i|Merriweather&display=swap"
        rel="stylesheet"
      />

      {/* Mailchimp */}
      <script id="mcjs">
        {
        !(function (c, h, i, m, p) {
          (m = c.createElement(h)),
          (p = c.getElementsByTagName(h)[0]),
          (m.async = 1),
          (m.src = i),
          p.parentNode.insertBefore(m, p);
        }(
          document,
          'script',
          'https://chimpstatic.com/mcjs-connected/js/users/fbbcaa0fa5cc9f5e4f2ae3d09/a9757ed9e8d1f6abfc04086cf.js',
        ))
      }
      </script>
    </Helmet>
  );
}
