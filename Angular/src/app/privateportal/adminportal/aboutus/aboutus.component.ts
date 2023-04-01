import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MapaboutusComponent } from '../mapaboutus/mapaboutus.component';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  File = new FormControl(null,Validators.required);
  ImagePreview : any = '../assets/IMG/diagram.png';

  text = new FormControl('',Validators.required);
  public Lat = 0;
  public Long = 0;
  
  constructor(private OurservicesadminService: OurservicesadminService, private toastr : ToastrService
    ,private dialog:MatDialog ) { }

  ngOnInit(): void {
  }


  fileProgress(fileInput: any) {
    this.File.setValue(<File>fileInput.target.files[0]);
    this.preview();
  }

  preview() {
    if (this.File != null) {
      var extension =  this.File.value.name.split('.').pop();

      if(this.OurservicesadminService.ExtensionForImage.find(a=>a == extension?.toLowerCase()) == null){
        this.File.setValue(null);
        var AllExtension = '';
        this.OurservicesadminService.ExtensionForImage.forEach(element => {
          AllExtension += ' ' + element
        });
        this.toastr.warning('Should be Image : [' + AllExtension + ' ] ');
      }else
      {
        var reader = new FileReader();
        reader.readAsDataURL(this.File.value);
        reader.onload = (_event) => {
          this.ImagePreview = reader.result;
        }
      }
    }
  }

  GetLocation(){
    this.dialog.open(MapaboutusComponent,{
      maxHeight:700
    });
  }


  PostAboutUsText(){
    if(confirm('Are You Sure')){
      this.OurservicesadminService.PostAboutUsText(this.text.value);
    }
  }

  PostAboutUsImage(){    
    if(confirm('Are You Sure')){
    this.OurservicesadminService.PostAboutUsImage(this.File.value);
    }
  }
}
