import { Component, OnInit } from '@angular/core';
import { StockManagerComponent } from '../stock-manager/stock-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerManagerComponent } from '../customer-manager/customer-manager.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  manageStock():void{
    const dialogRef = this.dialog.open(
    StockManagerComponent,{
      panelClass: 'my-outlined-dialog',
      width: '500px',
      height: '600px',
      data:{}

    }
    )};
    manageCustomers():void{
      const dialogRef = this.dialog.open(
      CustomerManagerComponent,{
        panelClass: 'my-outlined-dialog',
        width: '500px',
        height: '600px',
        data:{}
  
      }
      )};

}
