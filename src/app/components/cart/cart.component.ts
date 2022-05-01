import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/classes/card';
import { Cart } from 'src/app/classes/cart';
import { Item } from 'src/app/classes/item';
import { Order } from 'src/app/classes/order';
import { Shipping } from 'src/app/classes/shipping';
import { ApiService } from 'src/app/services/api.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any
  order: Order
  checkoutForm = this.fb.group({

    zip: '',
    state: '',
    country: '',
    address2: '',
    address: '',
    email: '',
    username: '',
    lastName: '',
    firstName: '',
    ccname: '',
    ccnumber: '',
    ccexpiration: '',
    cccvv: '',
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { cart: Array<Item> }, private formBuilder: FormBuilder,
    private fb: FormBuilder, private _api: ApiService, public dialog: MatDialog, 
  ) {
    this.cart = data.cart
  }
  getTotal() {
    const result = this.cart.reduce((accumulator: any, obj: { price: any; }) => {
      return accumulator + obj.price;
    }, 0);
    return result
  }

  getOrder() {
    this.order = new Order
    this.order.name = JSON.parse(localStorage.userData)[0].username
    this.order.date = new Date()
    this.order.items = this.cart
    this.order.total = this.getTotal()
    this.order.accountDetails = new Card()
    this.order.accountDetails.cccvv = this.checkoutForm.controls['cccvv'].value;
    this.order.accountDetails.ccexpiration = this.checkoutForm.controls['ccexpiration'].value;
    this.order.accountDetails.ccname = this.checkoutForm.controls['ccname'].value;
    this.order.accountDetails.ccnumber = this.checkoutForm.controls['ccnumber'].value;
    this.order.shippingDetails = new Shipping()
    this.order.shippingDetails.address = this.checkoutForm.controls['address'].value;
    this.order.shippingDetails.address2 = this.checkoutForm.controls['address2'].value;
    this.order.shippingDetails.country = this.checkoutForm.controls['country'].value;
    this.order.shippingDetails.state = this.checkoutForm.controls['state'].value;
    this.order.shippingDetails.zip = this.checkoutForm.controls['zip'].value;






  }

  onSubmit() {
    this.getOrder()
    this._api.postTypeRequest('orders/create', this.order).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
      }
    }


    )
    let c1  = new HomeComponent(this._api, this.dialog, this.formBuilder);
    c1.cartClear()
    this.cart = new Cart()

    //update the users order
    //update the stock levels

  }

  ngOnInit(): void {
    console.log(this.data.cart)
  }

}
