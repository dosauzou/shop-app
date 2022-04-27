import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/classes/customer';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Customer = new Customer();
  credentials = {username: '', password: ''};


  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
    
  })

  submitted: boolean;


  constructor(private fb: FormBuilder, private _auth: AuthService, private _api : ApiService, private _router : Router) {
  }

  ngOnInit(): void {

    this.submitted = false;
  }

    onSubmit() {
      this._api.postTypeRequest('user/login', this.loginForm.value).subscribe((res: any) => {
     
        if (res.status) { 
          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
          this._auth.setDataInLocalStorage('token', res.token);  
          console.log(JSON.parse(localStorage.userData)[0].admin)
          if(JSON.parse(localStorage.userData)[0].admin == '0'){
            this._router.navigate(['customer-panel']);
          } else
          this._router.navigate(['admin-panel']);


        }
      })
      // this.credentials.password= this.getPassword;
      // this.credentials.username = this.getUsername

      // this.app.authenticate(this.credentials, () =>  {
      //     this.router.navigateByUrl('/profile');
      // });
      // return false;
  
    }

  get getPassword(){
    return this.loginForm.get('password')?.value;
  }
  get getUsername(){
    return this.loginForm.get('username')?.value;
  }
}