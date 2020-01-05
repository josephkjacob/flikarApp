import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {UserService} from '../user.service';
declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email:String = "";
  username:String = "";
  password:String = "";
  cnfpassword:String = "";
  phone:Number;
  isSeller:Number;
  message:String = "";
  
  constructor(private http:HttpClient, private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService, private user:UserService) { }

  ngOnInit() {
    this.storage.remove("uer");
    this.user.itemAddedToCart(0);
    $(document).ready(function() {
      $(".msg-validation").hide();
    });
  }

  register(){

    if($("#username").val().trim() == ""){
      $(".msg-validation").text("Please insert your Fullname").show().fadeOut(3000);          
      $("#username").focus();
      return false;
    }
    else if($("#email").val().trim() == ""){
      $(".msg-validation").text("Please insert EMAIL ID").show().fadeOut(3000);          
      $("#email").focus();
      return false;
    }
    else if($("#password").val().trim() == "" || $("#cnfpassword").val().trim() == ""){
      $(".msg-validation").text("Please insert Password").show().fadeOut(3000);          
      $("#password").focus();
      return false;
    }
    else if($("#password").val().trim() !== $("#cnfpassword").val().trim()){
      $(".msg-validation").text("Passwords are mismatching").show().fadeOut(3000);          
      $("#password").focus();
      return false;
    }
    else if($("#phone").val().trim() == "" || $("#phone").val().trim().length != 10){
      $(".msg-validation").text("Please insert proper Contact Number").show().fadeOut(5000);          
      $("#phone").focus();
      return false;
    }


     

    console.log("register reached here, ", this.isSeller);
    var url = "http://localhost:4000/signup/saveUser";
    var type = 0;
    this.isSeller ? type = 2 : type = 3;
    var user = {name:this.username, password:this.password, email:this.email,phone:this.phone,type:type}
    this.http.post(url, user).subscribe(data=>{
      console.log(data["msg"]);
      if(data["msg"] == "success")
      {
        //this.storage.set("user",{type:data["type"], name:this.username, cart:[]});
        this.router.navigateByUrl("/");
      }
      else{
        $(".msg-validation").text(data["msg"]).show().fadeOut(5000);          
      $("#username").focus();
      }
    })
  }

}
