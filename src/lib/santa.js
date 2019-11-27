import axios from 'axios';

const santaApiEndpoint = 'https://santa-api.appspot.com/info?client=web&language=en&fingerprint=&routeOffset=0&streamOffset=0';

// {
//   id: "takeoff"
//   arrival: 1545645600000
//   departure: 1545645600000
//   population: 0
//   presentsDelivered: 0
//   city: "Santa's Village"
//   region: "North Pole"
//   location: {
//     lat: 84.6
//     lng: 168
//   }
// }

export async function getSanta() {
  let santa;

  try {
    santa = await axios.get(santaApiEndpoint);
  } catch(e) {
    throw new Error(`Failed to get Santa: ${e}`);
  }

  const { data } = santa;

  return data;
}

export async function getSantasRoute() {
  let santasRoute;
  try {
    const { route } = await getSanta();
    santasRoute = await axios.get(route);
  } catch(e) {
    throw new Error(`Failed to get Santa's route: ${e}`);
  }

  const { data } = santasRoute;

  return data;
}

export function desintationsWithPresents(desintations = []) {
  return desintations.filter(({presentsDelivered} = {}) => presentsDelivered > 0);
}

export function geoJsonLineFromDestinations(desintations = []) {
  const coordinates = desintations.map((destination = {}) => {
    const { location = {} } = destination;
    const { lat, lng } = location
    return [lng, lat];
  });
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates
        }
      }
    ]
  }
}

export function geoJsonPointsFromDestinations(desintations = []) {
  const features = desintations.map((destination = {}) => {
    const { location = {} } = destination;
    const { lat, lng } = location
    const coordinates = [lng, lat];
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates
      }
    }
  });
  return {
    type: 'FeatureCollection',
    features: features
  }
}

