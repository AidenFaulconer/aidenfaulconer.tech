import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../layout/layout';

// import { four0four } from '../../static/assets/svg/hardcoded-svgs';

export const FourOFour = React.memo(({ location }) => (
  <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <div style={{ textAlign: 'center', padding: '5vh 0', lineHeight: '1.5' }}>
      {/* <div dangerouslySetInnerHTML={{ __html: four0four }} /> */}
      <p>
        Either you are in a wrong page or you have lost. Lets go back
        <Link to="/">home</Link>
        {' '}
        safely
      </p>
    </div>
  </>
));

export default FourOFour;
