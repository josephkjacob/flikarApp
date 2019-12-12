import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../user.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nav = {
    default:[
      {link:"/signup",title:"SignUp", status:"enabled"},{link:"/login",title:"LogIn", status:"enabled"},{link:"/add",title:"adduser", status:"disabled  "}
    ],
    user:[
      {link:"/view",title:"View", status:"enabled"},{link:"/searchProducts",title:"Search", status:"disabled"},{link:"/logout ",title:"Logout", status:"enabled"}
    ],
    admin:[
      {link:"/add", title:"Add Products", status:"enabled"},{link:"/view",title:"View Products", status:"enabled"},{link:"/searchProducts",title:"Search", status:"disabled"},{link:"/logout",title:"Logout", status:"enabled"}
    ]
  }
  activeNav;
  userInfo;
  userName:String;
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private user:UserService, private router:Router) { 
    
  }

  ngOnInit() {
     this.userInfo = this.storage.get("user");
     this.userName = "hello";
    this.activeNav = this.getNav();
    
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
      console.log(t);
      this.storage.remove("user");
      
    }
    
  }

}
