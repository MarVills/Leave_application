import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router} from '@angular/router';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../shared/form-questions';
import jsPDF from 'jspdf';
// import pdfMake from "pdfmake";
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
// import 'jspdf-autotable';

declare var require: any;

const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  choices1 = choicesA;
  choices2 = choicesB;
  choices3 = choicesC;
  choices4 = choicesD;
  isOptional = false;
  isEditable = false;
  isShowForm = false;
  // applicationFormAction="Submit Request";
  applicationFormAction="Fill-up Form";
  @ViewChild('pdfTable') pdfTable!: ElementRef;
 


  constructor(
    private _formBuilder: FormBuilder,
    private router: Router 
  ) { 
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  formAction(){
    this.router.navigate(['/application-form'])
  }

  showForm(isShow: boolean){
    this.isShowForm = isShow;
  }

  downloadAsPDF(){
  
     let DATA: any = document.getElementById('pdfTable');
     html2canvas(DATA).then((canvas) => {
      console.log("see canvaas", canvas)
       let fileWidth = 208;
       let fileHeight = (canvas.height * fileWidth) / canvas.width;
       const FILEURI = canvas.toDataURL('image/png');
       let PDF = new jsPDF('p', 'mm', 'a4');
       let position = 0;
       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
       PDF.save('Leave Application Form.pdf');
     });
  }


}
