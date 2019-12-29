import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../user.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  admin:boolean=false;
  nav = {
    default:[
      {link:"/signup",title:"SignUp", status:"enabled"},
      {link:"/login",title:"LogIn", status:"enabled"},
      {link:"/home/add",title:"adduser", status:"disabled  "}
    ],
    user:[
      {link:"/home/view",title:"View", status:"enabled"},
      {link:"/home/searchProducts",title:"Search", status:"disabled"},
      {link:"/logout ",title:"Logout", status:"enabled"}
    ],
    admin:[
      {link:"/home/add", title:"Add Products", status:"enabled"},
      {link:"/home/view",title:"View Products", status:"enabled"},
      {link:"/home/searchProducts",title:"Search", status:"disabled"},
      {link:"/login",title:"Logout", status:"enabled"}
    ]
  }
  activeNav;
  userInfo;
  userName:String;
  cartCount=0;
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private user:UserService, private router:Router) { 
    
  }

  ngOnInit() {
     this.userInfo = this.storage.get("user");
     this.userName = "hello";
    this.activeNav = this.getNav();

    console.log("USer Service");
    this.user.count.subscribe(val =>{
        this.cartCount = val;
        console.log(val , "........." , this.cartCount);
    })
    
  }
  
  getNav(){
    // if(this.userInfo == null){
    //   return this.nav.default;
    // }
    // else{
    //   return this.nav.admin;
    // }
     return this.nav.admin;
  }
  onClick(t){
    
    if(t == "Logout"){
      //console.log(t);
      this.storage.remove("user");
      
    }
    
  }

}
