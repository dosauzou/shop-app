import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.scss']
})
export class StockManagerComponent implements OnInit {


  loginForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    manufacturer: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required]

    
  })

  onSubmit(){
    this._api.postTypeRequest('items/purchase', this.loginForm.value).subscribe((res: any) => {
     
      if (res.status) { 
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);  
        console.log(JSON.parse(localStorage.userData)[0].admin)
        if(JSON.parse(localStorage.userData)[0].admin == '0'){
          this._router.navigate(['customer-panel']);
        } else
        this._router.navigate(['admin-panel']);


      }
    })  }

  constructor(private fb: FormBuilder, private _auth: AuthService, private _api : ApiService, private _router : Router) { }

  ngOnInit(): void {
  }

}
