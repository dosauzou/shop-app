import { Account } from "./account";
import { Card } from "./card";
import { Item } from "./item";
import { Shipping } from "./shipping";

export class Order {
    shippingDetails: Shipping;
    accountDetails: Card;

    items: Array<Item>
    date: Date
    total: number;
}
