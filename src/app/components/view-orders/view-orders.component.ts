import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/classes/order';
import { User } from 'src/app/classes/user';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  orderList: Array<Order>;

  itemsList: any
  user: User 
  order: Order
  constructor(private _api : ApiService, @Inject(MAT_DIALOG_DATA) public data: User) {

    this.user = data
   }

  ngOnInit(): void {


    this._api.postTypeRequest('user/order', this.user).subscribe((res: any) => {
      if (res.status) {
        this.orderList = res.data
        for(let x in this.orderList){
          this.orderList[x].items = JSON.parse(this.orderList[x].items as unknown as string)
          console.log(this.orderList[x].orderid)

          this._api.postTypeRequest('user/order/details', this.orderList[x]).subscribe((res: any) => {
            if (res.status) {
              this.orderList[x].shippingDetails = res.data

         }
                
          }
          
          )
          this._api.postTypeRequest('user/order/details/account', this.orderList[x]).subscribe((res: any) => {
            if (res.status) {
              this.orderList[x].accountDetails = res.data

         }
                
        })
        }
            console.log(this.orderList)
        }
    })

  }

}
