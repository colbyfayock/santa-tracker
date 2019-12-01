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
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;
    findSanta( leafletElement );
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
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
          <h2>Build your own mapping app!</h2>
        </div>
      </Container>

      <Container type="content" className="text-center home-start">
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
