import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Slider } from 'src/app/Shared/Models/Slider';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
@Component({
  selector: 'app-registerslider',
  templateUrl: './registerslider.component.html',
  styleUrls: ['./registerslider.component.css']
})
export class RegistersliderComponent implements OnInit {
  File: File | null = null;
  ImagePreview: any = '../assets/IMG/diagram.png';

  sliderForm: FormGroup = new FormGroup({
    Id: new FormControl(0),
    TitleText: new FormControl('', Validators.required),
    BriefText: new FormControl('', Validators.required)
  });
  constructor(public OurservicesadminService: OurservicesadminService, private toastr: ToastrService,public MainPortal : MainportalComponent) {}

  ngOnInit(): void {
    this.OurservicesadminService.GetAllSlider();
  }

  Submit(){
    if( this.sliderForm.controls.Id.value == ''){
      if(this.File == null){
        this.toastr.warning('please you should uplaod a photo');
      }
      else{
        var slider = new Slider();
        slider.SliderImg = this.File;
        slider.TitleText = this.sliderForm.controls.TitleText.value;
        slider.BriefText = this.sliderForm.controls.BriefText.value;
        this.OurservicesadminService.CreateSlider(slider);
      }
    }
    else{
      var slider = new Slider();
      slider.Id = Number(this.sliderForm.controls.Id.value);
      slider.SliderImg = this.File;
      slider.TitleText = this.sliderForm.controls.TitleText.value;
      slider.BriefText = this.sliderForm.controls.BriefText.value;
      this.OurservicesadminService.UpdateSlider(slider);
    }
  }

  Edit(obj:any){
    this.sliderForm.setValue({
      Id : obj.id,
      TitleText : obj.titleText,
      BriefText : obj.briefText,
    });
    this.ImagePreview = this.OurservicesadminService.URLIMG + obj.sliderImg;
  }

  Delete(id: number) {
    if (confirm('Are You Sure')) {
      this.OurservicesadminService.DeleteSlider(id);
    }
  }

  Clear(){
    this.sliderForm.reset();
    this.sliderForm.patchValue({ Id: 0 });
    this.File = null;
    this.ImagePreview = '../assets/IMG/diagram.png';
  }
  
  fileProgress(fileInput: any) {
    this.File = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    if (this.File != null) {
      var extension = this.File.name.split('.').pop();

      if (this.OurservicesadminService.ExtensionForImage.find(a => a == extension) == null) {
        this.File = null;
        var AllExtension = '';
        this.OurservicesadminService.ExtensionForImage.forEach(element => {
          AllExtension += ' ' + element
        });
        this.toastr.warning('Should be Image : [' + AllExtension + ' ] ');
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(this.File);
        reader.onload = (_event) => {
          this.ImagePreview = reader.result;
        }
      }
    }
  }

}
