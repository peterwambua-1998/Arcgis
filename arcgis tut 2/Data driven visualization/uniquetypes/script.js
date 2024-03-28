require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/FeatureTable",
    "esri/core/reactiveUtils"
],(esriConfig, Map, MapView, FeatureLayer, Legend,Expand, FeatureTable, reactiveUtils)=> {
    esriConfig.apiKey = "AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP";

    let selectionIdCount = 0;
    let highlightIdsCount = 0; // The id count of all highlightIds
    let candidate; 
    //unique value renderer with strings
    /*
    const hwyRenderer = {
        type: "unique-value",
        legendOptions: {
          title: "Freeway type"
        },
        field: "CLASS",
        uniqueValueInfos: [{
            value: "S",
            label: "State highway",
            symbol: {
              type: "simple-line",
              color: "#e6d800",
              width: "6px",
              style: "solid"
            }
          }, {
            value: "I",
            label: "Interstate",
            symbol: {
              type: "simple-line",
              color: "#e60049",
              width: "6px",
              style: "solid"
            }
          }, {
            value: "U",
            label: "US Highway",
            symbol: {
              type: "simple-line",
              color: "#9b19f5",
              width: "6px",
              style: "solid"
            }
          }]

        
    };
    

    const hwyLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Freeway_System/FeatureServer/2",
        renderer: hwyRenderer,
        title: "USA Freeway System",
        minScale: 0,
        maxScale: 0
    });
    */

    //SHOW FEATURE TABLE
    

   


    //unique value renderer with intergers
    const trafficRender = {
        type: "unique-value",
        valueExpression:`
        var traffic = $feature.AADT;
        When(
          traffic > 80000, "High",
          traffic > 20000, "Medium",
          "Low"
        );
      `,
        valueExpressionTitle: "Traffic volume",
        uniqueValueInfos: [{
            value: "High",
            symbol: {
                type: "simple-line",
                color: "#810f7c",
                width: "6px",
                style: "solid"
            }
        }, {
            value: "Medium",
            symbol: {
              type: "simple-line",
              color: "#8c96c6",
              width: "3px",
              style: "solid"
            }
        }, {
            value: "Low",
            symbol: {
              type: "simple-line",
              color: "#9d978b",
              width: "1px",
              style: "solid"
            }
        }]
    }

    const popupTrailheads = {
      "title": "Trailhead",
      "content": "road {FID}"
    }

    const layer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Florida_Annual_Average_Daily_Traffic/FeatureServer/0",
        renderer: trafficRender,
        title: "Annual average daily traffic",
        minScale: 0,
        maxSclae: 0,
        popupTemplate: popupTrailheads
    });

    const featuretable = new FeatureTable({
        layer: layer,
        multiSortEnabled: true,
        visibleElements: { selectionColumn: true },
        tableTemplate: {
            columnTemplates: [{
                type: "field",
                fieldName: "FID",
                label: "FID",
                direction: "asc"
            },{
                type: "field",
                fieldName: "DISTRICT",
                label: "DISTRICT",
            }, {
                type: "field",
                fieldName: "ROADWAY",
                label: "ROADWAY",
            }, {
                type: "field",
                fieldName: "AADT",
                label: "AADT",
            }, {
                type: "field",
                fieldName: "BEGIN_POST",
                label: "BEGIN POST",
            }]
        },
        
        container: document.getElementById("viewTable")
    });

    featuretable.visibleElements = {
        header: true,
        menu: true,
        menuItems: {
          clearSelection: true,
          deleteSelection: true, // Works if the layer supports deletion and editingEnabled property is true
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        },
        selectionColumn: true,
        columnMenus: true
    }

    featuretable.highlightEnabled = true;
    



    const map = new Map({
        basemap: {
          portalItem: {
            id: "56b5bd522c52409c90d902285732e9f1"
          }
        },
        layers: [layer]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-81.379234, 28.538336],
        scale: 577790.5542885,
        constraints: {
          snapToZoom:false
        }
    });

    const legend = new Legend({
        view: view
    });



    view.ui.add(new Expand({
        view:view,
        content:legend,
        expanded:true,
        mode:"floating"
    }), "top-right");


    let selectedFeature, id;
    reactiveUtils.watch(
      () => {
        console.log(view.popup.viewModel.active);
        return view.popup.viewModel.active
      },
      () => {
        selectedFeature = view.popup.selectedFeature;
        if (selectedFeature !== null && view.popup.visible !== false) {

          featuretable.highlightIds.removeAll();
          featuretable.highlightIds.add(view.popup.selectedFeature.attributes.OBJECTID);
          id = selectedFeature.getObjectId();

        }

      }
    )

    
    
      

});