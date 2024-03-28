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
    const trailheadslayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    map.add(trailheadslayer);

    const trailLayers = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });

    map.add(trailLayers, 0);

    const parksLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });

    map.add(parksLayer, 0);
    


});