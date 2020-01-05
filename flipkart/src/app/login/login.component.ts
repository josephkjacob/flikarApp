import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { UserService} from '../user.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String = "";
  password:String = "";
  message:String = "";
  constructor(private http:HttpClient, private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService, private user:UserService) { }

  ngOnInit() {
    // if(this.storage.get("user")){
    //   this.router.navigateByUrl("/view");
    // }
    this.storage.remove("uer");
    this.user.itemAddedToCart(0);
    $(document).ready(function(){ 
      $(".msg-validation").hide();
    });
  }
  login(){
    if(this.username.trim() == "" || this.password.trim() == "" )
    {
      alert("User name or Password should not be empty");
      return false;
    }
    var url = "http://localhost:4000/signup/login";
    var obj={name:this.username, password:this.password};   
    this.http.post(url, obj).subscribe(data =>{
      if(data["msg"] == "Login Success" ){
        this.storage.set("user",{type:data["type"], name:this.username, cart:[],product:[],userId:data["_id"]})
        this.user.setUserType(data["type"]);
      this.router.navigateByUrl("/home");
      }
      else{
        this.message = data["msg"];
        $(".msg-validation").show().fadeOut(5000);
      }
      
      
      
      //window.parent.location.reload();
      //window.location.reload();
      //this.router.navigateByUrl("/header");
      
    });

  }

}
