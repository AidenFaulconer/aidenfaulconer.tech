import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../layout/layout';

export default React.memo(() => (
    <Layout>
        <Helmet>
            <title>Page not found</title>
        </Helmet>
        <div style={{
            textAlign: 'center', padding: '5vh 0', lineHeight: '1.5', display: 'flex', alignItems: 'center', verticalAlign: 'middle',
        }}
        >
            <div className="ground" />
            <div className="sky">
                <div className="cloud variant-1" />
                <div className="cloud variant-2" />
                <div className="cloud variant-3" />
                <div className="cloud variant-4" />
                <div className="cloud variant-5" />
            </div>
            <div className="rainbow-preloader">
                <div className="rainbow-stripe" />
                <div className="rainbow-stripe" />
                <div className="rainbow-stripe" />
                <div className="rainbow-stripe" />
                <div className="rainbow-stripe" />
                <div className="shadow" />
                <div className="shadow" />
            </div>

            <p>
                Either you are in a wrong page or you have gotten lost. Lets go back
                <Link to="/">home</Link>
            </p>
        </div>
    </Layout>
));
