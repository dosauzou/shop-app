import { Account } from "./account";
import { Item } from "./item";
import { Order } from "./order";
import { User } from "./user";

export class Customer {
    userDetails: User;
    orderHistory: Array<Order>
    admin = false
}
