require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/layers/FeatureLayer"

], function(esriConfig, Map, MapView, FeatureLayer) {

    esriConfig.apiKey = 'AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP';

    const map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-118.80543,34.02700],
        zoom: 13
    });

    //trail heads feature layer
    const render = {
        type: "simple",
        symbol: {
            "type": "picture-marker",
            "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            "width": "18px",
            "height": "18px"
        }
    };

    const trailheadsLabels = {
        symbol: {
          type: "text",
          color: "red",
          haloColor: "#5E8D74",
          haloSize: "2px",
          font: {
            size: "12px",
            family: "Noto Sans",
            style: "italic",
            weight: "normal"
          }
        },

        labelPlacement: "above-center",
        labelExpressionInfo: {
          expression: "$feature.TRL_NAME + TextFormatting.NewLine + $feature.PARK_NAME"
        }
    };

    const trailheadslayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: render,
        labelingInfo: [trailheadsLabels]
    });

    map.add(trailheadslayer);

    //trail feature layer
    const trailRender = {
        type: "simple",
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "yellow",
            width: "2px"
        },
        
        visualVariables: [
            {
              type: "size",
              field: "ELEV_GAIN",
              minDataValue: 0,
              maxDataValue: 2300,
              minSize: "3px",
              maxSize: "10px"
            }
        ]
        
    };

    const popupTrails = {
        title: "{TRL_NAME}",
        content: [{
         type: "media",
          mediaInfos: [{
            type: "column-chart",
            caption: "",
            value: {
              fields: [ "ELEV_MIN","ELEV_MAX" ],
              normalizeField: null,
              tooltipField: "Min and max elevation values"
              }
            }]
        }]
    }

    const trailLayers = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: trailRender,
        opacity: .75,
        popupTemplate: popupTrails
    });

    

    map.add(trailLayers, 0);

    trailLayers.on("layerview-create", function(event){
        // The LayerView for the layer that emitted this event
       console.log(event);
    });

    //bike trails

    const bikeTrailsRenderer = {
        type: "simple",
        symbol: {
            type: "simple-line",
            style: "short-dot",
            color: "#FF91FF",
            width: "1px"
        }
    };

    const bikeTrails = new FeatureLayer({
        url:
          "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: bikeTrailsRenderer,
        definitionExpression: "USE_BIKE = 'YES'"
      });

      map.add(bikeTrails, 1);

      bikeTrails.on("layerview-create", function(event){
        // The LayerView for the layer that emitted this event
       console.log(event);
    });

    //parks feature layer
    const parksLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });

    map.add(parksLayer, 0);
    

    // Add parks with a class breaks renderer and unique symbols
      function createFillSymbol(value, color) {
        return {
          "value": value,
          "symbol": {
            "color": color,
            "type": "simple-fill",
            "style": "solid",
            "outline": {
              "style": "none"
            }
          },
          "label": value
        };
      }

      const uniqueValueRenderer = {
        type: "unique-value",  // autocasts as new UniqueValueRenderer()
        field: "TYPE",
        uniqueValueInfos: [{
            value: "Natural Areas",
            symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "blue",
                outline: {  // autocasts as new SimpleLineSymbol()
                    color: "red",
                    width: 2
                }
            }
        }, {
            value: "Local Park",
            symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "brown",
                outline: {  // autocasts as new SimpleLineSymbol()
                    color: "red",
                    width: 1
                }
            }
        }]
      }

      const openspacePopup = {
        "title": "open space",
        "content": "<b>Park:</b> {PARK_NAME}<br><b>Acres:</b> {GIS_ACRES} acres<br>"
      };

      const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
        renderer: uniqueValueRenderer,
        opacity: 0.2,
        popupTemplate: openspacePopup
      });

      // Add the layer
      map.add(openspaces,0);
});