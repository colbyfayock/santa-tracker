import React from 'react';
import { renderToString } from 'react-dom/server';
import L from 'leaflet';
import axios from 'axios';
import { Polyline as WrappedPolyline } from 'leaflet-antimeridian/src/vector/Wrapped.Polyline.js';
import { FaGift } from 'react-icons/fa';

import { isDomAvailable, numberWithCommas } from 'lib/util';

const santaApiEndpoint =
  'https://santa-api.appspot.com/info?client=web&language=en&fingerprint=&routeOffset=0&streamOffset=0';

let giftIconDiv;
let santaIconDiv;

if ( isDomAvailable()) {
  const iconGift = <FaGift />;
  const iconGiftString = renderToString( iconGift );

  giftIconDiv = L.divIcon({
    className: 'icon',
    html: `<div class="icon-gift">${iconGiftString}</div>`,
    iconSize: 20
  });

  santaIconDiv = L.divIcon({
    className: 'icon',
    html: `<div class="icon-santa">🎅</div>`,
    iconSize: 50
  });
}

/**
 * findSanta
 * @decription Find Santa and track them on the map
 * @param {object} map Leaflet map element
 */

export async function findSanta( map ) {
  let activeSanta;
  let activeSantasRoute;

  try {
    activeSanta = await getSanta();
    activeSantasRoute = await getSantasRoute( activeSanta );
  } catch ( e ) {
    console.error( 'Failed to get Santa and their route', e );
    return;
  }

  const { destinations } = activeSantasRoute;
  const santasLocation = getCurrentLocation( destinations );
  const deliveries = desintationsWithPresents( destinations );
  const stopsGeoJson = geoJsonPointsFromDestinations( deliveries );
  const stopsLatLngs = latLngsFromDesintations( deliveries );

  const route = new WrappedPolyline( stopsLatLngs, {
    weight: 2,
    color: 'green',
    opacity: 1,
    fillColor: 'green',
    fillOpacity: 0.5
  });

  const stops = new L.geoJson( stopsGeoJson, {
    type: 'deliveryStop',
    pointToLayer: deliveryPointToLayer
  });

  const santa = L.marker( santasLocation, {
    icon: santaIconDiv
  })
    .bindPopup( `Santa!` )
    .openPopup();

  route.addTo( map );
  stops.addTo( map );
  santa.addTo( map );
}

/**
 * getSanta
 * @description Get Santa's current location
 */

async function getSanta() {
  let santa;

  try {
    santa = await axios.get( santaApiEndpoint );
  } catch ( e ) {
    throw new Error( `Failed to get Santa: ${e}` );
  }

  const { data } = santa;

  return data;
}

/**
 * getSantasRoute
 * @description Given our active Santa, find their route
 * @param {object} santa An active Santa
 */

async function getSantasRoute( santa ) {
  const { route } = santa;
  let santasRoute;

  try {
    santasRoute = await axios.get( route );
  } catch ( e ) {
    throw new Error( `Failed to get Santa's route: ${e}` );
  }

  const { data } = santasRoute;

  return data;
}

/**
 * getCurrentLocation
 * @description Gets Santa's current location based on the known deintations
 */

function getCurrentLocation( desintations ) {
  const length = desintations.length;
  const desintation = desintations[length - 1];
  return latLngsFromDesintations([desintation])[0];
}

/**
 * deliveryPointToLayer
 * @description Leaflet pointToLayer function that adds a custom gift marker with presents delivered popup
 */

function deliveryPointToLayer( feature = {}, latlng ) {
  const { properties = {} } = feature;
  console.log( 'feature', feature );
  const { presentsDelivered = 0, city, region } = properties;
  const text = `
    <div class="text-center">
      <strong>${city}, ${region}</strong>
      <br />
      ${numberWithCommas( presentsDelivered )} 🎁
    </div>
  `;
  const layer = L.marker( latlng, {
    icon: giftIconDiv
  }).bindPopup( text );
  return layer;
}

/**
 * desintationsWithPresents
 * @decription Given an array of desintations, filters for those locations that received presents
 */

function desintationsWithPresents( desintations = []) {
  return desintations.filter(({ presentsDelivered } = {}) => presentsDelivered > 0 );
}

/**
 * geoJsonPointsFromDestinations
 * @decription Given a list of deisntations, creates a geoJson points collection
 */

function geoJsonPointsFromDestinations( desintations = []) {
  const features = desintations.map(( destination = {}) => {
    const { location = {} } = destination;
    const { lat, lng } = location;
    const coordinates = [lng, lat];
    return {
      type: 'Feature',
      properties: {
        ...destination
      },
      geometry: {
        type: 'Point',
        coordinates
      }
    };
  });
  return {
    type: 'FeatureCollection',
    features: features
  };
}

/**
 * latLngsFromDesintations
 * @decription Given a list of deisntations, creates an array of LatLngs
 */

function latLngsFromDesintations( desintations = []) {
  return desintations.map(( delivery ) => {
    const { location } = delivery;
    const { lat, lng } = location;
    return new L.LatLng( lat, lng );
  });
}
