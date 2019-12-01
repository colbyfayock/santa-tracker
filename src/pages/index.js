import React from 'react';
import Helmet from 'react-helmet';

import { findSanta } from 'lib/santa';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 1;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;
    findSanta( leafletElement );
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'mapbox',
    zoom: DEFAULT_ZOOM,
    noWrap: true,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Santa Tracker</title>
      </Helmet>

      <Container className="text-center home-hero">
        <Map {...mapSettings} />
        <div className="home-hero-content">
          <h1>
            Santa Tracker{ ' ' }
            <span role="img" aria-label="santa">
              🎅
            </span>
          </h1>
          <p>Built with:</p>
          <ul>
            <li>
              <a href="https://leafletjs.com/">Leaflet</a>
            </li>
            <li>
              <a href="https://react-leaflet.js.org/">React Leaflet</a>
            </li>
            <li>
              <a href="https://www.gatsbyjs.org/">Gatsby</a>
            </li>
            <li>
              <a href="https://blog.mapbox.com/the-story-of-picture-book-e0de74c107fa">Mapbox Picture Book Map Theme</a>
            </li>
          </ul>
          <p>
            Packaged neatly in a Gatsby Starter:{ ' ' }
            <a href="https://github.com/colbyfayock/gatsby-starter-leaflet">gatsby-starter-leaflet</a>.
          </p>
          <p>
            <a className="button" href="https://github.com/colbyfayock/santa-tracker">
              View Source on Github
            </a>
          </p>
        </div>
      </Container>

      <Container type="content" className="text-center home-start">
        <h2>Build your own mapping app!</h2>
        <p>Run the following in your terminal!</p>
        <pre>
          <code>gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet</code>
        </pre>
        <p className="note">Note: Gatsby CLI required globally for the above command</p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
