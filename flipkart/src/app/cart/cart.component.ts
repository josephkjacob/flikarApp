import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = [];
  amount:Number = 0;
  page:Number = 0;
  deliveryCharges:number = 0;
  paymentMode:String;
  imageUrl = "http://localhost:4000/products/img/";
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private uServ:UserService, private router:Router) { }

  ngOnInit() {
    if(this.storage.get("user")){
      var userData = this.storage.get("user");
      this.cart = userData.cart;
      this.amount = this.uServ.calcTotalCartAmount(this.cart);
      this.deliveryCharges = this.uServ.calaculateDeliveryCharge(this.cart);
    }
    else{
      this.router.navigateByUrl("login");
    }
  }
  decQuantity(i){    
    if(this.cart[i].count > 0) this.cart[i].count--;
    this.amount = this.uServ.calcTotalCartAmount(this.cart);
    this.deliveryCharges = this.uServ.calaculateDeliveryCharge(this.cart);
    this.saveUser();
  }
  addQuantity(i){    
    this.cart[i].count++;
    this.amount = this.uServ.calcTotalCartAmount(this.cart);
    this.deliveryCharges = this.uServ.calaculateDeliveryCharge(this.cart);
    this.saveUser();
  }
  saveUser(){
    if(this.storage.get("user")){
      var userData = this.storage.get("user");
      userData.cart = this.cart;
       this.storage.set("user",userData);
    }
   
  }
  removeFromCart(i){
    this.cart.splice(i, 1);
    this.amount = this.uServ.calcTotalCartAmount(this.cart);
    this.deliveryCharges = this.uServ.calaculateDeliveryCharge(this.cart);
    this.saveUser();
    this.uServ.itemAddedToCart(this.cart.length);
  }
  getProductsDetails(p){
    var userData = this.storage.get("user");
    userData.product = p;
    this.storage.set("user",userData);
    this.router.navigateByUrl("/home/product");
  }
  cartNext(pg){
    this.page = pg;
    if(this.page == 3)
    {
      this.clearCart();
      
    }
      

  }
  clearCart(){
    this.cart = [];
    this.amount = this.uServ.calcTotalCartAmount(this.cart);
    this.deliveryCharges = this.uServ.calaculateDeliveryCharge(this.cart);
    this.uServ.clearCart();
    this.saveUser();
  }
  currentTime(){
    let dt = new Date();
    return dt.toLocaleDateString();
  }
  
}
