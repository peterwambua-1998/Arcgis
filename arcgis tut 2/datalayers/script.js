require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/VectorTileLayer",
    "esri/layers/GeoJSONLayer",
    "esri/Basemap"
],(esriConfig, Map, MapView, FeatureLayer, VectorTileLayer, GeoJSONLayer, Basemap)=> {
    esriConfig.apiKey = "AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP";

    

    let myvec = new VectorTileLayer({
        portalItem: {
            id: "febed8b293bc421ea7b6b584959556df"
        }
    });

    


    const map = new Map({
        basemap: "arcgis-navigation", //basemap service
        
    });

    map.add(myvec);

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [36.817223,-1.286389],
        zoom: 13,
        constraints: {
          snapToZoom: false
        }
    });

    
    
    const trailheadslayer = new FeatureLayer({
        url: "https://services7.arcgis.com/7aoRHz96LqUUqbow/arcgis/rest/services/publicschools/FeatureServer/0",
    });

    view.when( function () {
        console.log('load event called');
        map.layers.add(trailheadslayer);
        
    });
   

    

    /*  
    const vtlLayer = new VectorTileLayer({
        url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_Styled/VectorTileServer/resources/styles/root.json",
        opacity: 0.75
    });

    map.layers.push(vtlLayer);

    //tile data layer
    

    //feature layer
    const templateTrailHeads = {
        title: "Trail {TRL_NAME}",
        content: "Elevation {ELEV_FT} ",
          
    }

    const trailheadslayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_styled/FeatureServer/0",
        popupTemplate: templateTrailHeads
    });

    map.layers.push(trailheadslayer);

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
    }

    const geojsonLayer = new GeoJSONLayer({
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        copyright: "USGS Earthquakes",
        popupTemplate: template
    });

    map.layers.push(geojsonLayer);

    */


});