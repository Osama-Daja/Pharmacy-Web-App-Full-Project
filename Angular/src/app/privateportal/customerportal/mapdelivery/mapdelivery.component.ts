import { Component, OnInit } from '@angular/core';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';


import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Vector as VectorSource} from 'ol/source';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';

@Component({
  selector: 'app-mapdelivery',
  templateUrl: './mapdelivery.component.html',
  styleUrls: ['./mapdelivery.component.css']
})
export class MapdeliveryComponent implements OnInit {

  MapDeliveryCustomer : any;

  SetInterval : any;

  vectorSource: any = new VectorSource;


  iconGeometry : any;
  iconFeature : any;


  constructor(public OurservicesprivateService: OurservicesprivateService
    ) { }

  ngOnInit(): void {
    this.SetMap();
  }

  SetMap()
  {

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

    var iconGeometry=new Point(olProj.transform([this.OurservicesprivateService.LatDelivery,this.OurservicesprivateService.LongDelivery], 'EPSG:4326','EPSG:3857'));
    var iconFeature = new Feature({
        geometry:iconGeometry
    });
            var iconFeatures=[
              iconFeature,
            ];
            var vectorSource = new SourceVector({
              features: iconFeatures 
          });
    
    
    var layer = new LayerVector({
    source: vectorSource
    });
    this.MapDeliveryCustomer.addLayer(layer);


    //---------------------------------------------------------------------------------------------------------Loop For Postion 
    setTimeout(() => {
      
      this.SetInterval = setInterval(()=>
      {
        vectorSource.clear();
        
        iconGeometry=new Point(olProj.transform([this.OurservicesprivateService.LatDelivery,this.OurservicesprivateService.LongDelivery], 'EPSG:4326','EPSG:3857'));
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
       
               this.MapDeliveryCustomer.getView().setCenter(olProj.transform([this.OurservicesprivateService.LatDelivery,this.OurservicesprivateService.LongDelivery], 'EPSG:4326', 'EPSG:3857'));
       
      },5000);
    }, (10000));
  }

  ngOnDestroy(){    
    clearInterval(this.SetInterval);
  }

}
