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
        center: [-118.80543,34.03000],
        zoom: 13,
        constraints: {
          snapToZoom: false
        }
    });

    const percelLayerSql = ["Choose a SQL where clause...", "UseType = 'Residential'",  "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
    let whereClause = percelLayerSql[0];

    const select = document.createElement("select","");
    select.setAttribute('class', 'esri-widget esri-select');
    select.setAttribute("style", "width: 300px; font-family: 'Avenir Next'; font-size: 1em");
    percelLayerSql.forEach((query) => {
        let option = document.createElement("option");
        option.innerHTML = query;
        option.value = query;
        select.appendChild(option);
    });

    view.ui.add(select, "top-right");

    select.addEventListener('change', (event) => {
        whereClause = event.target.value;

        queryFeatureLayer(view.extent)
    });

    const percelLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0"
    });

    function queryFeatureLayer (extent) {
        const parcelQuery = {
            where: whereClause,  // Set by select element
            spatialRelationship: "intersects", // Relationship operation to apply
            geometry: extent, // Restricted to visible extent of the map
            outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
            returnGeometry: true
        };


        percelLayer.queryFeatures(parcelQuery).then((results) => {
            displayResult(results);
            console.log("Feature count: " + results.features.map);
        }).catch(() => {
            console.log(error.error);
        });


    }


    function displayResult(results) {
        let symbol = {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 204, 0.9 ],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
              color: "white",
              width: 1
            }
        }

        let popup = {
            title: "Percel {APN}",
            content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
        }

        results.features.map((feature) => {
            feature.symbol = symbol;
            feature.popupTemplate = popup;
            return feature;
        });

        //clear display before rendering feature from sql
        view.popup.close();
        view.graphics.removeAll();

        //add the feature to mapp
        view.graphics.addMany(results.features);
    }


});