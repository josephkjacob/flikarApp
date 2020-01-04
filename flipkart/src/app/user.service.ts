import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userID = 0;
  userType:BehaviorSubject<number>;
  counter = 0;
  count:BehaviorSubject<number>;
  DELIVERY_CHARGE:number = 30;

  constructor() {
    this.count = new BehaviorSubject(this.counter);
    this.userType = new BehaviorSubject(this.userID);
   }
   nextCount(){
    this.count.next(++this.counter);
    
   }
   itemAddedToCart(c = 12){
    this.count.next(c);
  }
  setUserType(type=0){
    // if(type.toLowerCase() == "admin")
    //     this.userType.next(1);
    //   else if(type.toLowerCase() == "seller")
    //     this.userType.next(2);
    //   else if(type.toLowerCase() == "user")
    //     this.userType.next(3);
    //   else
    //     this.userType.next(0);
    this.userType.next(type);
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
  calaculateDeliveryCharge(cart){
    let amount:number = 0;
    for (let i = 0; i < cart.length; i++) {

      // for (let k = 0; k < cart[i].count; k++) {
      //   amount += cart[i].item.price;
      //   console.log("amount ", cart[i].item.price);
      // }
      if(cart[i].count > 0)
        amount += this.DELIVERY_CHARGE;
    }
    return amount;
  }
  clearCart(){
    this.count.next(0);
  }
}
