require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
    "esri/layers/FeatureLayer"
], function(esriConfig, Map, SceneView, GeoJSONLayer, FeatureLayer) {

    esriConfig.apiKey = 'AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP';

    const basemapEnum = '2234d7b00ba64e5bbaab96850a2b7b8d';

        const template = {
          title: "Earthquake Info",
          content: "Magnitude {mag} {type} hit {place} on {time}",
          fieldInfos: [
            {
              fieldName: "time",
              format: {
                dateFormat: "short-date-short-time"
              }
            }
          ]
        };

        const renderer = {
          type: "simple",
          field: "mag",
          symbol: {
            type: "simple-marker",
            color: "orange",
            outline: {
              color: "white"
            }
          },
          visualVariables: [
            {
              type: "size",
              field: "mag",
              stops: [
                {
                  value: 2.5,
                  size: "4px"
                },
                {
                  value: 8,
                  size: "40px"
                }
              ]
            }
          ]
        };

    const geojsonLayer = new GeoJSONLayer({
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        copyright: "USGS Earthquakes",
        popupTemplate: template
    });


    //add trails
    const trailRender = {
      type: "simple",
      symbol: {
        type: "line-3d",  // autocasts as new LineSymbol3D()
        symbolLayers: [{
          type: "path",  // autocasts as new PathSymbol3DLayer()
          profile: "circle",
          width: 40,    // width of the tube in meters
          material: { color:  '#4ceb34'  },
          cap: "round",
          castShadow: true
        }]
      }
    }

    

    const map = new Map({
        basemap: "arcgis-light-gray",
        layers: [geojsonLayer]
    });

    
    geojsonLayer.renderer = renderer;
    
    const view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-118.80543,34.02700],
        zoom: 13,
        constraints: {
          snapToZoom: false
        }
    });
  

    const trailLayers = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      renderer: trailRender,
    });

    map.add(trailLayers);
    

});