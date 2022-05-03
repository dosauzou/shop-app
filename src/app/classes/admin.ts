import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { Users } from "../interfaces/users";
import { User } from "./user";

export class Admin implements Users {
    firstName: String;
    lastName: String;
    email: String;
    username: String;
    password: String;
    phoneNo: String;
    admin : boolean

  constructor(
    firstName: String, 
    lastName: String, 
    email: String, 
    username: String, 
    password: String, 
    phoneNo: String,
    admin : boolean

) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.username = username
    this.password = password
    this.phoneNo = phoneNo
    this.admin= admin
  }

  
}
