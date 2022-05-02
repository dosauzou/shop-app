import { IProduct } from "../interfaces/iproduct";
import { Item } from "./item";

export class Cart implements IProduct {

    private items: IProduct[] = []
    
    contructor() {
        this.items = []
    }
    
    public getName(): string {
        return "A box with " + this.items.length + " products"
    } 

    getItems(){
        return this.items
    }
    
    add(p: IProduct):void {
        
        console.log(p)
        this.items.push(p)
    }

  getPrice(): number{
        return this.items.reduce( (curr: number, b: IProduct) => (curr + b.getPrice()),  0)
    }
}
