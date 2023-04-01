import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Attribution from 'ol/control/Attribution';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import { OurservicesdeliveryService } from 'src/app/Shared/shared/Services/ourservicesdelivery.service';

@Component({
  selector: 'app-mapcustomer',
  templateUrl: './mapcustomer.component.html',
  styleUrls: ['./mapcustomer.component.css']
})
export class MapcustomerComponent implements OnInit {

  MapDeliveryCustomer : any;

  constructor(private OurservicesprivateService: OurservicesprivateService
    ,private OurservicesdeliveryService: OurservicesdeliveryService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.SetMap();      
    }, 1000);
  }

  SetMap()
  {    
    var attribution = new Attribution({
      collapsible: false
    });
    

    this.MapDeliveryCustomer = new Map({
      controls: defaultControls().extend([new FullScreen()]),
          layers:[
              new TileLayer({
                  source: new OSM()
              })
          ],
      target: 'MapDeliveryCustomer',
      view: new View({
          center: olProj.fromLonLat([35.925120, 31.951481]),
              zoom: 15.5,
              maxZoom: 20,
              minZoom: 9,
              rotation : 0.5 
      })
    });

    var iconGeometry=new Point(olProj.transform([this.OurservicesprivateService.LatCustomer
      ,this.OurservicesprivateService.LongCustomer], 'EPSG:4326','EPSG:3857'));
    var iconFeature = new Feature({
        geometry:iconGeometry
    });
    var iconFeature = new Feature({
        geometry:iconGeometry
    });
            var iconFeatures=[
              iconFeature,
            ];
            var vectorSource = new SourceVector({
              features: iconFeatures //add an array of features
          });
    
    
    var layer = new LayerVector({
    source: vectorSource
    });
    this.MapDeliveryCustomer.addLayer(layer);

           vectorSource.clear();
        
        iconGeometry=new Point(olProj.transform([this.OurservicesprivateService.LatCustomer
      ,this.OurservicesprivateService.LongCustomer], 'EPSG:4326','EPSG:3857'));
        iconFeature = new Feature({
           geometry:iconGeometry
       });
                iconFeatures=[
                 iconFeature,
               ];
               vectorSource = new SourceVector({
                 features: iconFeatures //add an array of features
             });
       
             var layer = new LayerVector({
               source: vectorSource
               });
               this.MapDeliveryCustomer.addLayer(layer);
       
               this.MapDeliveryCustomer.getView().setCenter(olProj.transform([this.OurservicesprivateService.LatCustomer
      ,this.OurservicesprivateService.LongCustomer], 'EPSG:4326', 'EPSG:3857'));
  }

}
