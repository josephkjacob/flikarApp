import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  products;
  cart = [];
  amount:number = 0;

  ePrName:String;
  ePrPrice:Number = 0;
  ePrDescription:String;
  userSelectedProduct;
  showProduct = false;
  imageUrl = "http://localhost:4000/products/img/";
  constructor(private http:HttpClient,@Inject(LOCAL_STORAGE) private storage:WebStorageService, private router:Router, private uServ:UserService) { }

  ngOnInit() {
    this.cart = [];
    this.getProduct();
    this.calcAmount();
  }
  getProduct(){
    if(this.storage.get("user")){
      var userdata = this.storage.get("user");
      this.cart = userdata.cart;
      console.log(this.storage.get("user"));
    }
    else{
      this.router.navigateByUrl("/login");
    }
    var url = "http://localhost:4000/products/getproduct";
    this.http.get(url).subscribe(data=>{
      this.products = data;
      console.log(this.products);
    })
  }
  getProductsDetails(id){
    // console.log(id);
    // var url = "http://localhost:4000/products/getAnItem/id";
    // this.http.get(url).subscribe(data=>{
      
    //   console.log(data);
    // })
    this.userSelectedProduct = id;
    this.saveSession();
   // this.showProduct = true;
    this.router.navigateByUrl("/home/product");
  }
  hideProduct(){
    this.showProduct = false;
  }
  addToCart(item){
    let exists:boolean = false;
    
      for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].item.name == item.name){
          this.cart[i].count++;
          exists = true;
          break;
        }      
      }
      if(!exists){
        var pr = {count:1, item:item};
        this.cart.push(pr);
      }
      this.calcAmount();   
    
    this.saveSession();
    
  }
  saveSession(){
    var saveCart = this.storage.get("user");
    saveCart.cart = this.cart;
    saveCart.product = this.userSelectedProduct;
    this.storage.set("user",saveCart);
    console.log(this.storage.get("user"));
  }
  calcAmount(){
    this.amount = 0;
    this.amount = this.uServ.calcTotalCartAmount(this.cart);
      /*for(let i = 0; i < this.cart.length; i++){
        
        for(let k = 0; k < this.cart[i].count; k++){
          this.amount+= this.cart[i].item.price;
          console.log("amount ", this.cart[i].item.price);
        }
      }*/
  }
  removeProduct(pr){
    var url = "http://localhost:4000/products/removeproduct/" + pr._id;
    this.http.get(url).subscribe(data=>{
      console.log(data["msg"]);
      this.getProduct();
    })
  }
  editproduct(pr){
    this.ePrName = pr.name;
    this.ePrPrice = pr.price;
    this.ePrDescription = pr.description;
    document.getElementById(pr._id).style.display = "block";
    
    
  }
  saveChanges(item){
    var url = "http://localhost:4000/products/editproduct";
    item.name = this.ePrName;
    item.price = this.ePrPrice;
    item.description = this.ePrDescription;
    this.http.post(url, item).subscribe(data=>{
      this.getProduct();
    })
  }
 
}
