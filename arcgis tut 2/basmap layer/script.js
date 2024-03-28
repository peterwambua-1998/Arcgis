require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer",

  ],(esriConfig, Map, MapView, Basemap, VectorTileLayer, TileLayer)=> {

    esriConfig.apiKey = "AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP";

  const vectorTileLayer = new VectorTileLayer({
    portalItem: {
      id: "6976148c11bd497d8624206f9ee03e30" // Forest and Parks Canvas
    },
    opacity: .75
  });

  const imageTileLayer = new TileLayer({
    portalItem: {
      id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
    }
  });

  const basemap = new Basemap({
    baseLayers: [

      
      vectorTileLayer

    ]
  });

  const map = new Map({
    basemap: basemap,
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-100,40],
    zoom: 3,
    constraints: {
          snapToZoom: false
        }
  });

  });