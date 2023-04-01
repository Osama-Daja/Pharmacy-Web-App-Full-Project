import { Component, OnInit } from '@angular/core';



import map from 'ol/Map';
import View from 'ol/View';
import Vector from 'ol/layer/Vector';
import * as olProj from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import {Draw, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import XYZ from 'ol/source/XYZ';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Shared/Models/Branch';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdatebranchComponent } from '../updatebranch/updatebranch.component';
import { MapgetlocationbranchComponent } from '../mapgetlocationbranch/mapgetlocationbranch.component';
import { UpdatebranchgeoComponent } from '../updatebranchgeo/updatebranchgeo.component';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-registerbranch',
  templateUrl: './registerbranch.component.html',
  styleUrls: ['./registerbranch.component.css']
})
export class RegisterbranchComponent implements OnInit {

  overlayLeyar : any;
  vectorLayer : any;
  BranchMap : any = new Map;

  public FormBranchRegiter = new FormGroup({
    Name : new FormControl('',Validators.required),
    Description : new FormControl('',Validators.required),
    Latitude : new FormControl(''),
    Longitude : new FormControl(''),
  })

  constructor(private toastr: ToastrService,public OurservicesadminService : OurservicesadminService,private router : Router
    ,private dialog : MatDialog ,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    
    this.Create();
    this.OurservicesadminService.GetFullBranch();
    this.OurservicesadminService.FormBranchUpdate.reset();
  }

  Create()
  {
    var raster = new TileLayer({
      source: new OSM(),
    });
    
    var source = new VectorSource();
  
    this.vectorLayer = new Vector({
      source: source,
    });
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
      }),
    });
    
    var BranchMap = new map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          })
        }),
        this.vectorLayer
      ],
      target: 'BranchMap',
      view: new View({
        center: olProj.fromLonLat([35.935547,31.954933]),
        zoom: 12.5,
        maxZoom: 20,
        minZoom: 8,
        rotation : 0.5
      }),
    });

    var draw, snap;
    
    function addInteractions() {
      draw = new Draw({
        source: source,
        type: 'Polygon',
      });
      BranchMap.addInteraction(draw);
      snap = new Snap({source: source});
      BranchMap.addInteraction(snap);
    }
    
    addInteractions();

    this.BranchMap = BranchMap;

  }


  Submit()
  {

    if(this.OurservicesadminService.Lat == null || this.OurservicesadminService.Long == null){
      this.toastr.warning('Make Sure Enter Location')
    }else
    {
      this.FormBranchRegiter.patchValue({
        Latitude : this.OurservicesadminService.Lat,
        Longitude : this.OurservicesadminService.Long,
      })  
      var polyFeatures = this.overlayLeyar.getSource();
  
      var coordinates : any;
      var AllCoordinate = [];
      var Count = 0;
  
      
      polyFeatures.forEachFeature(function (polyFeature : any) {
        coordinates = polyFeature.getGeometry().getCoordinates();
      });
      if(coordinates == undefined){
        this.toastr.warning('Enter Area');
      }else
      {
        for( Count = 0 ; Count< coordinates[0].length;Count++)
        {
         coordinates[0][Count] = olProj.transform(coordinates[0][Count], 'EPSG:3857', 'EPSG:4326');
         AllCoordinate.push("[" + coordinates[0][Count][0] + "," + coordinates[0][Count][1] + "]")
        }
     
        var ValuePolygon = "{\"type\":\"Polygon\",\"coordinates\"" + ":[["+AllCoordinate.toString()+"]]}";
        var branch = new Branch;
     
         branch.Name = this.FormBranchRegiter.controls.Name.value, 
         branch.Description = this.FormBranchRegiter.controls.Description.value, 
         branch.Latitude = Number(this.FormBranchRegiter.controls.Latitude.value), 
         branch.Longitude = Number(this.FormBranchRegiter.controls.Longitude.value), 
         branch.Geometry = ValuePolygon, 
        
         
     this.OurservicesadminService.InsertBranch(branch);
      }
    }

  }

  Clear()
  {
    this.FormBranchRegiter.setValue({
      Name : '',
      Description : '',
      Latitude : '',
      Longitude : ''
    })
    var features = this.overlayLeyar.getSource().getFeatures();
    features.forEach((feature:any) => {
      this.overlayLeyar.getSource().removeFeature(feature);
    });
  }

  DeleteBranch(id : number){
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteBranch(id);
    }
  }

  UpdateBranch(Branch : Branch)
  {
    this.OurservicesadminService.FormBranchUpdate.setValue({
      Id : Branch.id,
      Name : Branch.name,
      Description : Branch.description,
      Latitude : Branch.latitude,
      Longitude : Branch.longitude,
      Geometry : Branch.geometry
    });

    this.dialog.open(UpdatebranchComponent);
  }

  UpdateBranchGEO(Branch : Branch)
  {
    this.OurservicesadminService.FormBranchUpdate.patchValue({
      Id : Branch.id,
      Geometry : Branch.geometry
    });
    console.log(this.OurservicesadminService.FormBranchUpdate);
    
    this.dialog.open(UpdatebranchgeoComponent,{
      maxHeight:700,
      maxWidth: 700
    });
  }

  UpdateWorkHour(branch : Branch)
  {
    console.log(branch);
    
    if(branch.StartWorkHours == null || branch.EndWorkHours == null)
    {
      this.toastr.info('Make Sure Enter Work Hours')
    }else
    {
      if(confirm('Are You Sure.'))
      {
        this.OurservicesadminService.UpdateWorkHour(branch);
      }
    }
  }

  BackTo24(branch : Branch){
    if(confirm('Are You Sure.'))
    {
      branch.StartWorkHours = undefined;
      branch.endWorkHours = undefined;
      this.OurservicesadminService.UpdateWorkHour(branch);
    }
  }

  GetBranchDetails(Id : number){
    this.OurservicesadminService.GetBranchDetails(Id);
  }

  GetLocation(){
    this.OurservicesadminService.FormBranchUpdate.reset();
    console.log(this.OurservicesadminService.FormBranchUpdate);
    
    this.dialog.open(MapgetlocationbranchComponent,{
      maxHeight:700
    });
  }

}
