import { Component, OnInit } from '@angular/core';


import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector, Vector as VectorLayer} from 'ol/layer';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import Point from 'ol/geom/Point';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mapgetlocationbranch',
  templateUrl: './mapgetlocationbranch.component.html',
  styleUrls: ['./mapgetlocationbranch.component.css']
})
export class MapgetlocationbranchComponent implements OnInit {


  MapData : any;
  vectorSource = new VectorSource;

  mapGet : any;
  IdService = 0;

  constructor(private toastr:ToastrService,private OurservicesadminService:OurservicesadminService
    ,private dialog:MatDialogRef<MapgetlocationbranchComponent>) { }

  ngOnInit(): void {
    this.toastr.info('Double Click In Map To Take Branch Location.');
    this.CreateMap();
  }


  CreateMap()
{
  this.mapGet = new Map({
    controls: defaultControls().extend([new FullScreen()]),
        layers:[
            new TileLayer({
                source: new OSM()
            })
        ],
    target: 'mapGet',
    view: new View({
        center: olProj.fromLonLat([35.925120, 31.951481]),
            zoom: 15.5,
            maxZoom: 20,
            minZoom: 9,
            rotation : 0.5 
    })
  });

  var iconGeometry=new Point(olProj.transform([30,30], 'EPSG:4326','EPSG:3857'));
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
  this.mapGet.addLayer(layer);


}

async GetInfo()
{
  localStorage.setItem('Latitude','0')
  localStorage.setItem('Longitude','0')
  
  await this.mapGet.on('dblclick', function (evt : any){

    var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature : any) {
                     return feature;
                  });
            let clickedCoordinate = evt.coordinate;
            
        var Location = olProj.transform(clickedCoordinate, 'EPSG:3857', 'EPSG:4326');

        localStorage.setItem('Latitude',Location[0].toString())
        localStorage.setItem('Longitude',Location[1].toString())

        var Lat = localStorage.getItem('Latitude');
       var Long  =localStorage.getItem('Longitude');
 });


 

setTimeout(() => {
  var Lat = localStorage.getItem('Latitude');
  var Long  =localStorage.getItem('Longitude');
  
    
  this.OurservicesadminService.FormBranchUpdate.controls.Latitude.setValue(0);
  this.OurservicesadminService.FormBranchUpdate.controls.Longitude.setValue(0);
  if(
     this.OurservicesadminService.FormBranchUpdate.value.Id == null
    )
    {    
   this.OurservicesadminService.Lat = localStorage.getItem('Latitude');
   this.OurservicesadminService.Long  =localStorage.getItem('Longitude');
  if(this.OurservicesadminService.Lat != '0')
  {
    this.dialog.close();
  }
  }else
  {
          
    this.OurservicesadminService.FormBranchUpdate.controls.Latitude.setValue(Number(Lat));
    this.OurservicesadminService.FormBranchUpdate.controls.Longitude.setValue(Number(Long));
    if(Lat != '0')
    {
     this.dialog.close();
    }
 }  
}, 1000);


}
}
