import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ApiService } from 'src/app/services/api.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockList: Array<Item>;
  cart: Array<Item>;
  price: number;
  manufacturer: string;
  category: any;
  title: string = 'jnknl';
  filteredList: Array<Item>
  public isCollapsed = false;


  constructor(private _api : ApiService, public dialog: MatDialog) { 
    this.cart = new Array
  }

  showCart(){
    const dialogRef = this.dialog.open(
      CartComponent,{
        panelClass: 'my-outlined-dialog',
        width: '500px',
        height: '600px',
        data:{cart: this.cart}
      })
  }
  ngOnInit(): void {
    this._api.getTypeRequest('items/display').subscribe((res: any) => {
      this.stockList = res.data;
      console.log(this.title)
    }
    )
  }

  // priceFilter(element: any, index: any, array: any){
  //   return (element.price>=this.price);
  // }

  manufacturerFilter(manufacturer: any){
    console.log(this.stockList.filter(this.filterByManufacturer(manufacturer)))
  }
  filterByManufacturer(manufacturer: any){
    console.log(manufacturer)
    return function(element: any, index: any, array: any){
      return(element.manufacturer===manufacturer)
    }
  }

  categoryFilter(category: any){
    this.stockList.filter(this.filterByCategory(category))
  }
  filterByCategory(category: any){
    return function(element: any, index: any, array: any){
      return(element.category===category)
    }  }
  

  titleFilter(title: any){
    console.log(this.stockList.filter(this.filterByTitle(title)))
  }
  filterByTitle(title: any){
    return function(element: any, index: any, array: any){
      return(element.title===title)
    } 
  }
  // filterByPrice(){
  //   this.filteredList = this.stockList.filter(this.priceFilter)
  // }
 
  //sortmethods
  addToCart(item: any){
    this.cart.push(item)
  }

}
