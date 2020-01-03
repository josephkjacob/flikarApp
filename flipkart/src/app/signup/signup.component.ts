import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email:String = "email@email.com";
  username:String = "admin";
  password:String = "12345";
  cnfpassword:String = "12345";
  phone:Number;
  isSeller:Number;

  constructor(private http:HttpClient, private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  ngOnInit() {
  }
  register(){
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
    })
  }

}
