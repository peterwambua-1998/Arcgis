require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/VectorTileLayer",
    "esri/layers/GeoJSONLayer",
    "esri/Basemap",
    "esri/widgets/FeatureTable",
    "esri/core/reactiveUtils",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Measurement",
    "esri/widgets/Editor"
],(esriConfig, Map, MapView, FeatureLayer, VectorTileLayer, GeoJSONLayer,Basemap, FeatureTable,reactiveUtils, Legend, Expand, Measurement, Editor)=> {
    esriConfig.apiKey = "AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP";


    const mybasemap = new Basemap({
        portalItem: {
            id: "febed8b293bc421ea7b6b584959556df"  // WGS84 Streets Vector webmap
        }
    });

    let myvec = new VectorTileLayer({
        portalItem: {
            id: "febed8b293bc421ea7b6b584959556df"
        }
    });

    const map = new Map({
        basemap: "arcgis-navigation",
    });

    map.add(myvec);


    //add layer for roads

    const popupRoads = {
        "title": "Nairobi New Roads",
        "content": "{ROAD_SECTION_NAME} ({UNITS_KM} km)"
    }

    const roadRenderer = {
        type: "simple", 
        symbol: {
            type: "simple-line",
            color: "#84fc03",
            cap: "round",
            join: "round",
            marker: {
                color: "blue",
                placement: "begin",
                style: "diamond"
            },
            width: "4px",
            style: "solid"
        }
    }

    const roadlayer = new FeatureLayer({
        url: "https://services7.arcgis.com/7aoRHz96LqUUqbow/arcgis/rest/services/road_construction/FeatureServer/0",
        popupTemplate: popupRoads,
        renderer: roadRenderer        

    });


    map.add(roadlayer);

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [36.817223, -1.286389],
        zoom: 13,
        constraints: {
          snapToZoom: false
        },
        
    });


    let editor = new Editor({
        view: view,
        layerInfos: [roadlayer]
    });

    
      // Add widget to the view

    view.ui.add(editor, "top-right");
    


});
