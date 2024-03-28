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
    "esri/widgets/Editor",
    "esri/widgets/Search"
],(esriConfig, Map, MapView, FeatureLayer, VectorTileLayer, GeoJSONLayer,Basemap, FeatureTable,reactiveUtils, Legend, Expand, Measurement, Editor, Search)=> {
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

    let schoolRenderer = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 10,
            color: "red",
            outline: {  // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        }

    }

    const popupTrailheads = {
        "title": "School {TYPE}",
        "content": "{SCHOOL_NAME}"
    }

    const roadlayer = new FeatureLayer({
        url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/forestbungoma/FeatureServer",
             

    });

    const schoollayer = new FeatureLayer({
        url: "https://services7.arcgis.com/7aoRHz96LqUUqbow/arcgis/rest/services/schools_nairobi/FeatureServer/0",
        renderer: schoolRenderer,
        popupTemplate: popupTrailheads

    });


    map.add(roadlayer);

    map.add(schoollayer);

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
        layerInfos: [roadlayer, schoollayer]
    });

    let expand = new Expand({
        view: view,
        content: editor
    });

    let searchWidget = new Search({
        view: view
    });
   


    let expand2 = new Expand({
        view: view,
        content: searchWidget
    })
    
      // Add widget to the view

    view.ui.add(expand, "top-right");
    view.ui.add(expand2, "top-right");
    

    const parcelQuery = {
        where: "TYPE = 'public'",  // Set by select element
        geometry: view.extent,
        outFields: ["TYPE","SCHOOL_NAME","CREATED_AT",], // Attributes to return
        returnGeometry: true
    };

    roadlayer.on('layerview-create', function(e) {
        roadlayer.popupTemplate = roadlayer.defaultPopupTemplate;

        console.log(roadlayer.defaultPopupTemplate.title)
    });

    view.on("click", function (event) {
        var screenPoint = {
          x: event.x,
          y: event.y
        };

        const options = {
            // globalIdUsed has to be true when adding, updating or deleting attachments
            globalIdUsed: true,
            rollbackOnFailureEnabled: true
        };
       
        // Search for graphics at the clicked location
        view.hitTest(screenPoint).then(function (response) {
         if (response.results.length) {
          var graphic = response.results.filter(function (result) {
           // check if the graphic belongs to the layer of interest
           return result.graphic.layer === roadlayer;
          })[0].graphic;
          // do something with the result graphic
          var deletes = [{ objectId: graphic.attributes.OBJECTID }]
          roadlayer.applyEdits({deleteFeatures: deletes}).then(function(results) {
            console.log("deleted: ", results);
          });


         }
        });
       })


    schoollayer.queryFeatures(parcelQuery)
               .then((results) => {

                

                    const symbol = {
                        type: "simple-marker",
                        color: [ 20, 130, 200, 0.5 ],
                        size: 10,
                        color: "green",
                        outline: {
                        color: "blue",
                        width: .5
                        },
                    };
          
                    results.features.map((feature) => {
                        feature.symbol = symbol;
                        feature.popupTemplate = popupTrailheads;
                        return feature;
                    });

                    view.popup.close();
                    view.graphics.removeAll();

                    //schoollayer.visible = false;

                    view.graphics.addMany(results.features);
               })

});
