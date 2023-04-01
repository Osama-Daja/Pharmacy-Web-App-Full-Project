import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Branch } from 'src/app/Shared/Models/Branch';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MapgetlocationbranchComponent } from '../mapgetlocationbranch/mapgetlocationbranch.component';

@Component({
  selector: 'app-updatebranch',
  templateUrl: './updatebranch.component.html',
  styleUrls: ['./updatebranch.component.css']
})
export class UpdatebranchComponent implements OnInit {

  

  constructor(private router: Router,public OurservicesadminService : OurservicesadminService,
    private dialogClose : MatDialogRef<UpdatebranchComponent>,private dialog:MatDialog) { }

  ngOnInit(): void {
    if(this.OurservicesadminService.FormBranchUpdate.controls.Id.value == 0
      || this.OurservicesadminService.FormBranchUpdate.controls.Id == null)
    {
      this.dialogClose.close();
    }
  }

  Submit()
  {
    this.OurservicesadminService.UpdateBranch();
    this.OurservicesadminService.FormBranchUpdate.reset();
    this.dialogClose.close();
  }

  GetLocation(){
    this.dialog.open(MapgetlocationbranchComponent,{
      maxHeight:700
    });
  }
  
}
