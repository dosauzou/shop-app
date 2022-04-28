import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart: any
  constructor(@Inject(MAT_DIALOG_DATA) public data:{cart: Array<Item>}) { 
    this.cart =data.cart
  }

  ngOnInit(): void {
    console.log(this.data.cart)
  }

}
