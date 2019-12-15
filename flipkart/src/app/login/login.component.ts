import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String = "admin";
  password:String = "12345";
  message;
  constructor(private http:HttpClient, private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  ngOnInit() {
    // if(this.storage.get("user")){
    //   this.router.navigateByUrl("/view");
    // }
  }
  login(){
    
    var url = "http://localhost:4000/signup/login";
    var obj={name:this.username, password:this.password};   
    this.http.post(url, obj).subscribe(data =>{
      
      this.message = data;
      this.storage.set("user",{type:data["type"], name:this.username, cart:[],product:[]});
      console.log(window.parent);
      //window.parent.location.reload();
      //window.location.reload();
      //this.router.navigateByUrl("/header");
     this.router.navigateByUrl("/home");
    });

  }

}
