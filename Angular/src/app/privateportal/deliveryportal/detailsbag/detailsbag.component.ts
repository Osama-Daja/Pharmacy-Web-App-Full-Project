import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OurservicesdeliveryService } from 'src/app/Shared/shared/Services/ourservicesdelivery.service';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detailsbag',
  templateUrl: './detailsbag.component.html',
  styleUrls: ['./detailsbag.component.css']
})
export class DetailsbagComponent implements OnInit {

  @ViewChild('print-div') htmlData: ElementRef | undefined;
  constructor(public OurservicesprivateService: OurservicesprivateService
    , public OurservicesdeliveryService: OurservicesdeliveryService
    , private dialog: MatDialogRef<DetailsbagComponent>) { }

  ngOnInit(): void {
  }

  DoneOrderDelivery() {
    if (confirm('Are You Sure ? ')) {
      this.OurservicesdeliveryService.DoneOrderDelivery();
      this.dialog.close();
    }
  }

  Print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-div')?.innerHTML;
    popupWin = window.open('', '_blank', 'width=600,height=1500,toolbar=no,location=no,status=no,titlebar=no');
    popupWin?.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <link rel="stylesheet" href="../../assets/Public/Home/home.css">
          <link rel="stylesheet" href="../../assets/CSS/Table-bootstrap/table-bootstrap.css">
        </head>
        <body >
        <h1 style="margin:auto;">Bill</h1>
        <hr>
        ${printContents}</body>
      </html>
    `);
    popupWin?.focus();
    popupWin?.print();
    popupWin?.document.close();
  }

  public openPDF(): void {
    let Data:any = document.getElementById('print-div');

    html2canvas(Data).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');
    });
  }
}
