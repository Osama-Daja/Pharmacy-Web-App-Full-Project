import { Component, Inject, OnInit } from '@angular/core';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';

// import Map from 'ol/Map';
// import * as olProj from 'ol/proj';
// import {Circle as Circle, Fill, Icon, Stroke, Style} from 'ol/style';
// import {OSM, Vector as VectorSource} from 'ol/source';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import XYZ from 'ol/source/XYZ';
// import Feature from 'ol/Feature';
// import Vector from 'ol/layer/Vector';
// import View from 'ol/View';
// import Overlay from 'ol/Overlay';
// import Point from 'ol/geom/Point';
// import { delay } from 'rxjs/operators';
// import {FullScreen, defaults as defaultControls} from 'ol/control';
// import CircleStyle from 'ol/style/Circle';

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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mapdelivery',
  templateUrl: './mapdelivery.component.html',
  styleUrls: ['./mapdelivery.component.css']
})
export class MapdeliveryComponent implements OnInit {





  MapDelivery : any;

  SetInterval : any;

  vectorSource: any = new VectorSource;


  iconGeometry : any;
  iconFeature : any;

 constructor(private OurservicesadminService : OurservicesadminService
  ,@Inject(MAT_DIALOG_DATA) public DeliveryId: any) { }

  ngOnInit(): void {
    this.SetMap();    
  }

  SetMap()
  {

    this.MapDelivery = new Map({
      controls: defaultControls().extend([new FullScreen()]),
          layers:[
              new TileLayer({
                  source: new OSM()
              })
          ],
      target: 'MapDelivery',
      view: new View({
          center: olProj.fromLonLat([35.925120, 31.951481]),
              zoom: 15.5,
              maxZoom: 20,
              minZoom: 9,
              rotation : 0.5 
      })
    });

    var iconGeometry=new Point(olProj.transform([this.OurservicesadminService.MapDelivery.latitude,this.OurservicesadminService.MapDelivery.longitude], 'EPSG:4326','EPSG:3857'));
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
    this.MapDelivery.addLayer(layer);


    //---------------------------------------------------------------------------------------------------------Loop For Postion 
    setTimeout(() => {
      
      this.SetInterval = setInterval(()=>
      {
        this.OurservicesadminService.GetDeliveryLocationById(this.DeliveryId.Id);
        vectorSource.clear();
        
        iconGeometry=new Point(olProj.transform([this.OurservicesadminService.MapDelivery.latitude,this.OurservicesadminService.MapDelivery.longitude], 'EPSG:4326','EPSG:3857'));
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
               this.MapDelivery.addLayer(layer);
       
               this.MapDelivery.getView().setCenter(olProj.transform([this.OurservicesadminService.MapDelivery.latitude,this.OurservicesadminService.MapDelivery.longitude], 'EPSG:4326', 'EPSG:3857'));
       
      },10000);
    }, (1000));
  }

  ngOnDestroy(){    
    clearInterval(this.SetInterval);
  }


}
