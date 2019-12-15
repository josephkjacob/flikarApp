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
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private router:Router) { }

  ngOnInit() {
    var data = this.storage.get("user");
    this.product = data.product;
  }
  backToView(){
    //var url = "/home/"+//"#" + this.product._id;
    this.router.navigateByUrl("/home");
  }

}
