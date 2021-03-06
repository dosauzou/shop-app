import { Users } from "../interfaces/users";
import { Account } from "./account";
import { Item } from "./item";
import { Order } from "./order";
import { User } from "./user";

export class Customer implements Users {
    firstName: String;
    lastName: String;
    email: String;
    username: String;
    password: String;
    phoneNo: String;
    orderHistory: Array<Order>
    admin: boolean;
  constructor(
    firstName: String, 
    lastName: String, 
    email: String, 
    username: String, 
    password: String, 
    phoneNo: String, 
    admin: boolean
    
) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.username = username
    this.password = password
    this.phoneNo = phoneNo
    this.admin = admin
  }

}
