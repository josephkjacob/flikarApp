import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product;
  imageUrl = "http://localhost:4000/products/img/";
  userData;
  cart;
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private router:Router) { }

  ngOnInit() {
    this.userData = this.storage.get("user");
    this.product = this.userData.product;
    this.cart = this.userData.cart;
  }
  backToView(){
    //var url = "/home/"+//"#" + this.product._id;
    this.router.navigateByUrl("/home");
  }
  addToCart(){
    let exists:boolean = false;
    
      for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].item.name == this.product.name){
          this.cart[i].count++;
          exists = true;
          break;
        }      
      }
      if(!exists){
        var pr = {count:1, item:this.product};
        this.cart.push(pr);
      }
    this.userData.cart = this.cart;
    this.storage.set("user",this.userData);
  }

}
