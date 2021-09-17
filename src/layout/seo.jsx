import React from 'react';
import { Helmet } from 'react-helmet';

export default function Seo({ seo = {} }) {
  const {
    description = 'a site to share information on the business of garden care',
    dateFormat = 'F j, Y',
    email = '',
    language = 'en',
    timeZone = 'Australia/Canebrra',
    title = 'AJ gardencare',
    url = 'http://ajgardencare.com.au',
    twitter = '',
    metaDescription = 'hello world',
  } = seo;

  const meta = {};

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
            // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
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
      <meta
        name="viewpoint"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif+SC:300,400|Noto+Serif+TC:300,400|Noto+Serif|Source+Sans+Pro:400,400i,700,700i|Merriweather&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
}
