import { Account } from "./account";
import { Item } from "./item";
import { User } from "./user";

export class Customer {
    userDetails: User;
    accountDetails: Account;
    orderHistory: Array<Item>
    admin = false
}
