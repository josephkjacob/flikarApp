import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userType = "none";
  counter = 0;
  count:BehaviorSubject<number>;

  constructor() {
    this.count = new BehaviorSubject(this.counter);
   }
   nextCount(){
    this.count.next(++this.counter);
   }
   itemAddedToCart(c = 12){
    this.count.next(c);
  }
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
