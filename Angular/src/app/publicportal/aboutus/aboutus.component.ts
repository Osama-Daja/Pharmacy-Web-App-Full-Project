import { Component, OnInit, Pipe } from '@angular/core';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';

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

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  AboutUsMap : any;

  constructor(public OurservicespublicService: OurservicespublicService
    ) { }

  ngOnInit(): void {

    this.OurservicespublicService.GetAboutUs();

    setTimeout(() => {
      this.SetMap();
    }, 1000);
  }


  SetMap()
  {
    var attribution = new Attribution({
      collapsible: false
    });
    

    this.AboutUsMap = new Map({
      controls: defaultControls().extend([new FullScreen()]),
          layers:[
              new TileLayer({
                  source: new OSM()
              })
          ],
      target: 'AboutUsMap',
      view: new View({
          center: olProj.fromLonLat(this.OurservicespublicService.AboutUs.postion),
              zoom: 15.5,
              maxZoom: 20,
              minZoom: 9,
      })
    });

    var iconGeometry=new Point(olProj.transform(this.OurservicespublicService.AboutUs.postion, 'EPSG:4326', 'EPSG:3857'));
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
    this.AboutUsMap.addLayer(layer);

           vectorSource.clear();
        
        iconGeometry=new Point(olProj.transform(this.OurservicespublicService.AboutUs.postion, 'EPSG:4326', 'EPSG:3857'));
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
               this.AboutUsMap.addLayer(layer);

               this.AboutUsMap.getView().setCenter(olProj.transform(this.OurservicespublicService.AboutUs.postion, 'EPSG:4326', 'EPSG:3857'));
  }

}
