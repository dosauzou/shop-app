import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/classes/customer';
import { Usercreator } from 'src/app/classes/usercreator';

import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:['', Validators.required],
    email:['', Validators.required],
    username:['', Validators.required],
    phoneNo:['', Validators.required],
    password:['', Validators.required],
    confPassword:['', Validators.required],
    admin:false
  });
  submitted: boolean;

  constructor(private fb: FormBuilder,   private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  
  
  
  
  
  
  
  
  
  

    


  save(){
    
const user = Usercreator.createObject(this.registerForm.value)
console.log(user)
    this._api.postTypeRequest('user/register', user).subscribe((res: any) => {
      console.log(res.status)
      if (res.status) { 
        console.log('hey')
        console.log(res)
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);  
        console.log(localStorage)
        this._router.navigate(['login']);
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });
  

  }

  saveAdmin(){

  }

  get FirstName(){
    return this.registerForm.get('firstName');
  }
  get LastName(){
    return this.registerForm.get('lastName');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get userName(){
    return this.registerForm.get('username');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get phoneNo(){
    return this.registerForm.get('phoneNo');
  }

  onSubmit(){
    this.save();
    console.log(this.registerForm.value);
  }

  addUserForm(){
    this.submitted=false;
    this.registerForm.reset();
  }

}
