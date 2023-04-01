import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import { RegisterreportComponent } from '../registerreport/registerreport.component';

@Component({
  selector: 'app-detailsbag',
  templateUrl: './detailsbag.component.html',
  styleUrls: ['./detailsbag.component.css']
})
export class DetailsbagComponent implements OnInit {

  constructor(public OurservicescustomerService: OurservicescustomerService
    , public OurservicesprivateService: OurservicesprivateService, private matDialog: MatDialog
    , private dialog: MatDialogRef<DetailsbagComponent>) { }

  ngOnInit(): void {
  }

  DoneOrderCustomer() {
    if (confirm('Are You Sure')) {
      this.OurservicescustomerService.DoneOrderCustomer();
      this.dialog.close();
    }
  }

  Review(id: number) {
    console.log(id);

    this.matDialog.open(RegisterreportComponent, {
      data: {
        orderId: id
      }
    });

  }

  CancelOrderCustomer() {
    if (confirm('Are You Sure')) {
      this.OurservicescustomerService.CancelOrderCustomer();
    }
  }


}
