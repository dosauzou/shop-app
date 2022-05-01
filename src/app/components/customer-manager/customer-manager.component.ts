import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.scss']
})
export class CustomerManagerComponent implements OnInit {
  userList: Array<User>;

  addToCart(s: any){

  }

  constructor(private _api: ApiService) { }

  ngOnInit(): void {

    this._api.getTypeRequest('user/display').subscribe((res: any) => {
      this.userList = res.data;
      console.log(this.userList)

    
    })
  }


}
