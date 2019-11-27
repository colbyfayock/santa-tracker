import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';
import { Polyline as WrappedPolyline } from 'leaflet-antimeridian/src/vector/Wrapped.Polyline.js';

import { getSanta, getSantasRoute, geoJsonLineFromDestinations, desintationsWithPresents, geoJsonPointsFromDestinations } from 'lib/santa';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 3;


const IndexPage = () => {

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;

    let santa;
    let santasRoute;

    try {
      santa = await getSanta();
      santasRoute = await getSantasRoute();
    } catch(e) {
      console.log('e', e)
      return;
    }

    const { destinations } = santasRoute;
    const deliveries = desintationsWithPresents(destinations);
    const deliveryRoute = geoJsonLineFromDestinations(deliveries);
    const deliveryStops = geoJsonPointsFromDestinations(deliveries);

    const points = deliveries.map(delivery => {
      const { location } = delivery;
      const { lat, lng } = location;
      return new L.LatLng(lat, lng);
    })

    new WrappedPolyline(points, {
      weight: 2,
      color: "green",
      opacity: 1,
      fillColor: "green",
      fillOpacity: 0.5
    }).addTo(leafletElement)

    new L.geoJson(deliveryStops, {
      style: {
        weight: 2,
        color: "red",
        opacity: 1,
        fillColor: "red",
        fillOpacity: 0.5
      },
      pointToLayer : function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 4,
            fillColor: "#ff7800",
            color: "#000",
            weigh : 1,
            opacity: 1,
            fillOpacity: 1
        });
      }
    }).addTo(leafletElement);
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

      <Map {...mapSettings} />

      <Container type="content" className="text-center home-start">
        <h1>Santa Tracker <span role="img" aria-label="santa">🎅</span></h1>
        <h2>Build your mapping app!</h2>
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
