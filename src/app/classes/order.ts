import { Account } from "./account";
import { Item } from "./item";

export class Order {
    accountDetails: Account;
    items: Array<Item>
    date: Date
    total: number;
}
