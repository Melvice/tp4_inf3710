import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class messageDialogComponent implements OnInit {

  message: string;
  type: string;

  constructor (@Inject(MAT_DIALOG_DATA) data: string, private router: Router ) {
    this.message = data[0];
    this.type = data[1];
  }

  public ngOnInit(): void {
  }
  
  redirection():void{
    if(this.type === "success") {
      this.router.navigate(["/planrepas"]);
    }
  }
}
