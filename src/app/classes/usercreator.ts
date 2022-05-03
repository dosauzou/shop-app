import { Users } from "../interfaces/users"
import { Admin } from "./admin"
import { Customer } from "./customer"
import { User } from "./user"

export class Usercreator {
    static createObject(form: any): Users {
        let x = new User ()
        if (form.admin=== false) {
            x =  new Customer(form.firstName, form.lastName, form.email, form.username, form.password, form.phoneNo, form.admin)
        } else if (form.admin === true) {
            x = new  Admin(form.firstName, form.lastName, form.email, form.username, form.password, form.phoneNo, form.admin)
        }
        return x
    }
}