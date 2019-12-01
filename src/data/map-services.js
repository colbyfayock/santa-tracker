export const mapServices = [
  {
    name: 'OpenStreetMap',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'mapbox',
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    nativeZoom: 18,
    minZoom: 3,
    tileSize: 256,
    url: `https://api.mapbox.com/styles/v1/colbyfayock/ck3n2uxlh4gqe1co3qsye6xla/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY29sYnlmYXlvY2siLCJhIjoiY2szbjMzazVnMGxwbzNncGJ2aTNqN3oybCJ9.Li_g1z4432AAWd76TXGBsA`
  }
];
