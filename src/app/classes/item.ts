import { IProduct } from "../interfaces/iproduct";

export class Item implements IProduct  {
    [x: string]: any;

    private title: string;
    manufacturer: string;
    private price: number;
    category: string;
    quantity: number

    constructor(title: string,
        manufacturer: string,
        price: number,
        category: string,
        quantity: number
    ){
        this.title = title;
        this.manufacturer = manufacturer;
        this.price =price;
        this.category = category;
        this.quantity = quantity;
    }
    
    public getName(): string {
        return this.title
    }
    public getPrice(): number {
        return this.price;
    }
    public setPrice(price: number)
    {
        this.price = price;
    }
    // getName(): string {
    //     throw new Error("Method not implemented.");
    // }

    public getTitle(){
        return this.title;
    }

    public getMnaufacturer(): string{
        return this.manufacturer
    }

    // public getPrice(): number{
    //     return this.price
    // }
    public getCategory(): string{
        return this.category
    }

    public getQuantity(): number {
        return this.quanitity
    }
}
