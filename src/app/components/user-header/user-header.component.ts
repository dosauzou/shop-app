import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  showCart(){
    const dialogRef = this.dialog.open(
      CartComponent,{
        panelClass: 'my-outlined-dialog',
        width: '500px',
        height: '600px',
        data:{}
      })
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
