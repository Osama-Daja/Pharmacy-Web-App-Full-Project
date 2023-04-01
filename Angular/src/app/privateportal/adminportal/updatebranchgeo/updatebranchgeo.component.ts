import { Component, OnInit } from '@angular/core';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';


import map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Vector from 'ol/layer/Vector';
import * as olProj from 'ol/proj';

import {Circle as Circle, Fill, Stroke, Style} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import XYZ from 'ol/source/XYZ';
import Polygon from 'ol/geom/Polygon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatebranchgeo',
  templateUrl: './updatebranchgeo.component.html',
  styleUrls: ['./updatebranchgeo.component.css']
})
export class UpdatebranchgeoComponent implements OnInit {

  overlayLeyar : any;
  vectorLayer : any;
  coordinatesPolygon : any;

  UpdateBranchMap : any = new Map;

  constructor(private router: Router,public OurservicesadminService : OurservicesadminService,) { }

  ngOnInit(): void {
    if(this.OurservicesadminService.FormBranchUpdate.controls.Id.value == 0){this.router.navigateByUrl('/private/admin/registerbranch')}
    this.Create();
    this.SetMap();
  }

  Create()
  {
    var raster = new TileLayer({
      source: new OSM(),
    });
    
    var source = new VectorSource();
    this.overlayLeyar = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    
    let polygonStyle : any = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.2)"
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 10
      })
    });
    
    // this.vectorSource = new VectorSource({features: []});
  
    this.vectorLayer = new Vector({
      source: source,
     // styles: [polygonStyle]
    });
    
    var UpdateBranchMap = new map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          })
        }),
        this.vectorLayer
      ],
      // layers: [raster, this.overlayLeyar],
      target: 'UpdateBranchMap',
      view: new View({
        center: olProj.fromLonLat([35.935547,31.954933]),
        zoom: 12.5,
        maxZoom: 20,
        minZoom: 8,
        rotation : 0.5
      }),
    });
    
    var modify = new Modify({source: source});
    UpdateBranchMap.addInteraction(modify);
    
    var draw, snap;
    
    function addInteractions() {
      draw = new Draw({
        source: source,
        type: 'Polygon',
      });
      UpdateBranchMap.addInteraction(draw);
      snap = new Snap({source: source});
      UpdateBranchMap.addInteraction(snap);
    }
    
    addInteractions();

    this.UpdateBranchMap = UpdateBranchMap;
  }

  Submit()
  {
    var polyFeatures = this.overlayLeyar.getSource();

    var coordsMulti = [];
    var coordsSingle = [];
    var coordinate : any = [];
    var Sumcoordinate = [];
    var Count = 0;

    
    polyFeatures.forEachFeature(function (polyFeature : any) {
        if (polyFeature.getGeometry().getType() === 'Polygon') {
          coordinate = polyFeature.getGeometry().getCoordinates();
            coordsMulti.push(polyFeature.getGeometry().getCoordinates());
            coordsSingle.push(polyFeature.getGeometry().getInteriorPoint());
        }
    });

   for( Count = 0 ; Count< coordinate[0].length;Count++)
   {
    coordinate[0][Count] = olProj.transform(coordinate[0][Count], 'EPSG:3857', 'EPSG:4326');
    Sumcoordinate.push("[" + coordinate[0][Count][0] + "," + coordinate[0][Count][1] + "]")
   }
    var ValuePolygon = "{\'type'\:\'Polygon'\,\'coordinates'\:[["+Sumcoordinate.toString()+"]]}";

    this.OurservicesadminService.UpdateBranchGEO(ValuePolygon);
  }

  SetMap()
  {

    var CoorsOut = [];
    var Coors : any = [];

  this.OurservicesadminService.FormBranchUpdate.controls.Geometry.value.forEach((elementIn : any) => {
    var Coor1 = [];
    Coor1[0] = elementIn.x;
    Coor1[1] = elementIn.y;
    Coors.push(Coor1);
  });
  CoorsOut.push(Coors);



    this.coordinatesPolygon = CoorsOut;

    this.addPolygon();
  }

  addPolygon() {
    const geometry = new Polygon( this.coordinatesPolygon).transform( "EPSG:4326", this.UpdateBranchMap.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

}
