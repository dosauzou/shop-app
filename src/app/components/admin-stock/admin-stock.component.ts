import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cart } from 'src/app/classes/cart';
import { Item } from 'src/app/classes/item';
import { ApiService } from 'src/app/services/api.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.scss']
})
export class AdminStockComponent implements OnInit {

  updateForm = this.fb.group({
    quantity: ['', Validators.required],
    price: ['', Validators.required],


  })

  navbarCollapsed = true;

  stockList: Array<any>;
  cart: Cart;
  price: number;
  manufacturer: string;
  category: any;
  filteredList: Array<Item>

  title: string = 'jnknl';
  public isCollapsed = false;
  arrayProxy: any;
  filters: FormGroup;
  checkedBoxes: Array<String>
  manufacturers: any
  manufacturerList: any[];
  stockTitle: any[];
  titleList: any[];
  categories: any[];
  categoryList: any[];


  constructor(private _api: ApiService, public dialog: MatDialog, private fb: FormBuilder) {
    this.checkedBoxes = new Array
  }

  showCart() {
    const dialogRef = this.dialog.open(
      CartComponent, {
      width: '1000px',
      height: '1000px',
      data: { cart: this.cart }
    })
  }
  ngOnInit(): void {
    this.cart = new Cart()

    this._api.getTypeRequest('items/display').subscribe((res: any) => {
      this.stockList = res.data;
      this.arrayProxy = new Proxy(this.stockList, this.setHandler());
      this.manufacturers = this.stockList.map(o => o.manufacturer)
      this.manufacturerList = [...new Set(this.manufacturers)];

      this.stockTitle = this.stockList.map(o => o.title)
      this.titleList = [...new Set(this.stockTitle)];

      this.categories = this.stockList.map(o => o.category)
      this.categoryList = [...new Set(this.categories)];

    }

    )


  }


  cartClear() {
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

    console.log(checkbox?.checked);

    if (checkbox != null) {
      checkbox.checked = true;
    }

    console.log(checkbox?.checked);
  }



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




  manufacturerFilter(manufacturer: any) {
    if (!this.checkedBoxes.includes(manufacturer)) {
      this.checkedBoxes.push(manufacturer)

      this.stockList = this.arrayProxy.filter(this.filterByManufacturer(manufacturer)).slice()




      this.manufacturers = this.stockList.map(o => o.manufacturer)
      this.manufacturerList = [...new Set(this.manufacturers)];


    } else {
      this.delete(manufacturer)
      this.deleteObj('manufacturer', manufacturer)
      this.stockList = this.arrayProxy.slice()
      this.manufacturers = this.stockList.map(o => o.manufacturer)
      this.manufacturerList = [...new Set(this.manufacturers)];


    }

  }
  filterByManufacturer(manufacturer: any) {

    console.log(manufacturer)
    return function (element: any, index: any, array: any) {
      return (element.manufacturer === manufacturer)

    }
  }
  delete(key: any) {
    const index = this.checkedBoxes.indexOf(key, 0);
    if (index > -1) {
      this.checkedBoxes.splice(index, 1);
    }

  }
  update(x: any) {
    console.log(x)

    const b = x as Item;

    b.quantity = this.updateForm.controls['quantity'].value

    this._api.postTypeRequest('items/update', b).subscribe((res: any) => {
      if (res.status) {

      } else {
        console.log(res)
        alert(res.msg)
      }
    })

  }
  sortByTitle() {
    return this.stockList = this.stockList.sort((a, b) => a.title.localeCompare(b.title)).slice()
  }
  sortByManufacturer() {
    return this.stockList = this.stockList.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer)).slice()
  }

  sortByPrice() {
    return this.stockList = this.stockList.sort((a, b) => (a.price < b.price) ? 1 : -1).slice()
  }

  sortPriceByDescending() {
    this.stockList = this.sortByPrice().reverse().slice()
  }
  sortManufacturerByDescending() {
    this.stockList = this.sortByManufacturer().reverse().slice()
  }
  sortTitleByDescending() {
    this.stockList = this.sortByTitle().reverse().slice()
  }
  deleteObj(type: any, key: any) {










  }

  categoryFilter(category: String) {
    if (!this.checkedBoxes.includes(category)) {
      this.checkedBoxes.push(category)
      this.stockList = this.arrayProxy.filter(this.filterByCategory(category)).slice()


      this.categories = this.stockList.map(o => o.category)
      this.categoryList = [...new Set(this.categories)];

    } else {

      this.delete(category)
      this.deleteObj('category', category)
      this.stockList = this.arrayProxy.slice()
      this.categories = this.stockList.map(o => o.category)
      this.categoryList = [...new Set(this.categories)];

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



      this.stockTitle = this.stockList.map(o => o.title)
      this.titleList = [...new Set(this.stockTitle)];

    } else {
      this.delete(title)
      this.deleteObj('title', title)
      this.stockList = this.arrayProxy.slice()
      this.stockTitle = this.stockList.map(o => o.title)
      this.titleList = [...new Set(this.stockTitle)];
    }
  }
  filterByTitle(title: any) {
    return function (element: any, index: any, array: any) {
      return (element.title === title)
    }
  }












}
