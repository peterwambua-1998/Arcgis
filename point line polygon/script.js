require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"

], function(esriConfig,Map, MapView,FeatureLayer, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP";

    const map = new Map({
        basemap: "arcgis-topographic" //Basemap layer service
    });

    const view = new MapView({
        map: map,
        center: [-118.80500,34.02700], //Longitude, latitude
        zoom: 13,
        container: "viewDiv"
    });

    

    const trailheadslayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    map.add(trailheadslayer);

    

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const point = {
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
    };

    const simplemarkersymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
    }

    

    //polyline

    const polyline = {
        type: "polyline",
        paths: [
            [-118.821527826096, 34.0139576938577], //Longitude, latitude
            [-118.814893761649, 34.0080602407843], //Longitude, latitude
            [-118.808878330345, 34.0016642996246]  //Longitude, latitude
        ]
    };

    const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2
    };

    const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
    });

    graphicsLayer.add(polylineGraphic);


    // polygon
    const polygon = {
        type: "polygon",
        rings: [
            [-118.818984489994, 34.0137559967283], //Longitude, latitude
            [-118.806796597377, 34.0215816298725], //Longitude, latitude
            [-118.791432890735, 34.0163883241613], //Longitude, latitude
            [-118.79596686535, 34.008564864635],   //Longitude, latitude
            [-118.808558110679, 34.0035027131376]  //Longitude, latitude
        ]
    };

    const simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // Orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };

    //pop up
    const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
    };

    const attributes = {
        Name: "Graphic",
        Description: "I am a polygon"
    }

    const pointAttr = {
        Name: "point",
        Description: "I am a point"
    }

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: simplemarkersymbol,
        attributes: pointAttr,
        popupTemplate: popupTemplate,

    });

   
    graphicsLayer.add(pointGraphic);

    const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate
    });

    graphicsLayer.add(polygonGraphic);


    

});