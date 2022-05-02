import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ApiService } from 'src/app/services/api.service';
import { CartComponent } from '../cart/cart.component';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/classes/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navbarCollapsed = true; 

  stockList: Array<any>;
  cart: Cart;
  price: number;
  manufacturer: string;
  category: any;
  title: string = 'jnknl';
  filteredList: Array<Item>
  public isCollapsed = false;
  arrayProxy: any;
  filters: FormGroup;
  checkedBoxes: Array<String>



  constructor(private _api: ApiService, public dialog: MatDialog, fb: FormBuilder) {
    this.checkedBoxes = new Array
    this.filteredList = new Array
  }

  newCart(){
  }

  showCart() {
    const dialogRef = this.dialog.open(
      CartComponent, {
      panelClass: 'my-outlined-dialog',
      width: '500px',
      height: '600px',
      data: { cart: this.cart }
    })
  }
  ngOnInit(): void {
    this.cart =  new Cart()

    this._api.getTypeRequest('items/display').subscribe((res: any) => {
      this.stockList = res.data;
      console.log(res.data)
      console.log(this.stockList)
      this.arrayProxy = new Proxy(this.stockList, this.setHandler());


    }

    )


  }


  cartClear(){
    this.cart = new Cart()
    console.log(this.cart)
  }

  isChecked() {
    const checkbox = document.getElementById(
      'subscribe',
    ) as HTMLInputElement | null;

    if (checkbox?.checked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is NOT checked');
    }

    console.log(checkbox?.checked); // 👉️ false

    if (checkbox != null) {
      checkbox.checked = true;
    }

    console.log(checkbox?.checked);
  }
  //Proxy method


  setHandler() {
    const handler = {
      get(target: any, property: any) {
        return target[property];
      }
    }
    return handler
  }

  setProxy() {

    this.arrayProxy = new Proxy(this.stockList, this.setHandler());

  }
  // priceFilter(element: any, index: any, array: any){
  //   return (element.price>=this.price);
  // }

  manufacturerFilter(manufacturer: any) {
    if (!this.checkedBoxes.includes(manufacturer)) {
      this.checkedBoxes.push(manufacturer)

      this.stockList  = this.arrayProxy.filter(this.filterByManufacturer(manufacturer)).slice()
      // this.filteredList.push(x[0])

      const ids = this.filteredList.map(o => o.getTitle())
      // this.stockList = this.filteredList.filter(({title}, index) => !ids.includes(title, index + 1))


    } else {this.delete(manufacturer)
        console.log(this.filteredList.length)
        this.deleteObj('manufacturer', manufacturer)
        this.stockList = this.arrayProxy.slice()

    }

  }
  filterByManufacturer(manufacturer: any) {

    console.log(manufacturer)
    return function (element: any, index: any, array: any) {
      return (element.manufacturer === manufacturer)

    }
  }
  delete( key: any) {
    const index = this.checkedBoxes.indexOf(key, 0);
    if (index > -1) {
      this.checkedBoxes.splice(index, 1);
    }

  }

  sortByTitle(){
    return this.stockList = this.stockList.sort((a, b) => a.title.localeCompare(b.title)).slice()
  }
  sortByManufacturer(){
    return this.stockList = this.stockList.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer)).slice()
  }

  sortByPrice(){

    return this.stockList = this.stockList.sort((a, b) => (a.price < b.price) ? 1:-1).slice()
  }

  sortPriceByDescending(){
    this.stockList = this.sortByPrice().reverse().slice()
  }
  sortManufacturerByDescending(){
    this.stockList = this.sortByManufacturer().reverse().slice()
  }
  sortTitleByDescending(){
    this.stockList = this.sortByTitle().reverse().slice()
  }
  deleteObj(type:any, key: any) {
    const x = type
    const indexArray = this.filteredList.filter((object => object[type] === key ))
    for(let x in this.filteredList){
      console.log(x)
    const index = this.filteredList.findIndex((object) => {
      return object[type]=== key;
    });    if (index > -1) {
      this.filteredList.splice(index, 1);
    }
  }
  }

  categoryFilter(category: String) {
    if (!this.checkedBoxes.includes(category)) {
      this.checkedBoxes.push(category)
       this.stockList  = this.arrayProxy.filter(this.filterByCategory(category)).slice()
      // this.filteredList.push(x[0])
      const ids = this.filteredList.map(o => o.getTitle())
      // this.filteredList = this.filteredList.filter(({title}, index) => !ids.includes(title, index + 1))


      } else{
      //remove
       this.delete(category)
       this.deleteObj('category', category)
       this.stockList = this.arrayProxy.slice()


    }

  }
  filterByCategory(category: any) {
    return function (element: any, index: any, array: any) {
      return (element.category === category)

    }

  }


  titleFilter(title: any) {
    if (!this.checkedBoxes.includes(title)) {
      this.checkedBoxes.push(title)

      this.stockList = this.arrayProxy.filter(this.filterByTitle(title))
      const ids = this.filteredList.map(o => o.getTitle())

      // this.filteredList = this.filteredList.filter(({title}, index) => !ids.includes(title, index + 1))

      //filters the array proxy instead of original array now how do i display that proxy or that og array
    } else {this.delete(title)
      this.deleteObj('title', title)
      this.stockList = this.arrayProxy.slice()
    }
  }
  filterByTitle(title: any) {
    return function (element: any, index: any, array: any) {
      return (element.title === title)
    }
  }
  // filterByPrice(){
  //   this.filteredList = this.stockList.filter(this.priceFilter)
  // }

  //sortmethods
  addToCart(item: any) {
   let x = new Item(item.title, item.manufacturer, item.price, item.category, item.quantity)
   console.log(x.getTitle())
    this.cart.add(x)
    console.log(this.cart)


  }
  //add lidle to array once check if clicked again then rempove lidl from array

}
