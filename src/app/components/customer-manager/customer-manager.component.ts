import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';
import { ApiService } from 'src/app/services/api.service';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.scss']
})
export class CustomerManagerComponent implements OnInit {
  userList: any;
  orderList: any;


  viewOrders(s:User){
 
    const dialogRef = this.dialog.open(
      ViewOrdersComponent,{
        panelClass: 'my-outlined-dialog',
        width: '500px',
        height: '600px',
        data: s
  
      }
      )};
  

  constructor(private _api: ApiService,  public dialog: MatDialog) { }

  ngOnInit(): void {

    this._api.getTypeRequest('user/display').subscribe((res: any) => {
      this.userList = res.data;
    
    }
    )
    console.log(this.userList)

  }


}
