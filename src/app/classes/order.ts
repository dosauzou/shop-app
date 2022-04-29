import { Account } from "./account";
import { Card } from "./card";
import { Item } from "./item";
import { Shipping } from "./shipping";

export class Order {
    name: string
    shippingDetails: Shipping;
    accountDetails: Card;
    items: Array<Item>
    date: Date
    total: number;
}
