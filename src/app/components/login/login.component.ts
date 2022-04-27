import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
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
          this._router.navigate(['']);
        }
      })
  
    }

  get getPassword(){
    return this.loginForm.get('password')?.value;
  }
  get getUsername(){
    return this.loginForm.get('username')?.value;
  }
}