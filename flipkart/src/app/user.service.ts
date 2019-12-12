import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userType = "none";

  constructor() { }
  getNav() {

  }
  calcTotalCartAmount(cart) {
    let amount = 0;
    for (let i = 0; i < cart.length; i++) {

      for (let k = 0; k < cart[i].count; k++) {
        amount += cart[i].item.price;
        console.log("amount ", cart[i].item.price);
      }
    }
    return amount;
  }
}
