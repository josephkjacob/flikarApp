import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  showPanel:Number = 0;
  newCat;
  newSec;
  catagories;
  sections;
  selectCategory;
  selectSection;
  category_selection = [];

  newProduct:string;
  newPrice;
  newDescription;
  message:String;
  constructor( private http:HttpClient, private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  imageFile:File = null;
  ngOnInit() {
    this.newPrice = 0;
    if(this.storage.get("user")){
      console.log(this.storage.get("user"));
    }
    else{
      this.router.navigateByUrl("/login");
    }
    this.getCategory(); 
    this.getSection();
  }
  onImageSelect(event){
    this.imageFile = <File>event.target.files[0];
    console.log(this.imageFile.name);
  }
  getPanel(n){
    this.showPanel == n ? this.showPanel = 0 : this.showPanel = n;   
  }
  setCategory(){
    var url= "http://localhost:4000/products/addcategory";
    var catObj = {name:this.newCat}
    this.http.post(url, catObj).subscribe(data=>{
      console.log(data["msg"]);
      this.getCategory();
      this.showPanel = 0;
      this.newCat = "";
    });
  }
  getCategory(){
    var url= "http://localhost:4000/products/getcategory";
    this.http.get(url).subscribe(data =>{
      this.catagories = data;
      console.log(data);
    })
  }
  setSction(){
    var url = "http://localhost:4000/products/addsection";
    var secObj = {section:this.newSec, category:this.selectCategory};
    this.http.post(url, secObj).subscribe(data =>{
      this.newSec = "";
      this.showPanel = 0;
      console.log(data["msg"]);
      this.getSection();
    })
  }
  getSection(){
    var url = "http://localhost:4000/products/getsection";
    this.http.get(url).subscribe(data =>{
      this.sections = data;
      console.log(this.sections, "-----", data);
      this.categoryChange();
    })
  }
  
  setProduct(){
    var fd = new FormData();
    var fileExt = this.imageFile.name.split(".");
    var fileName = this.selectCategory + "_" + this.selectSection+ "_" + this.newProduct + "."+ fileExt[fileExt.length-1];
    fd.append("imageFile", this.imageFile, fileName);
    fd.append("category",this.selectCategory);
    fd.append("section", this.selectSection);
    fd.append("name", this.newProduct);
    fd.append("price", this.newPrice);
    fd.append("description", this.newDescription);
    fd.append("image", this.imageFile.name);
    var url = "http://localhost:4000/products/addproduct";
    
    this.http.post(url, fd).subscribe(data=>{
      console.log(data);
      this.message = "Product '" + this.newProduct + "' successfully added";
      this.newProduct = "";
      this.newPrice = 0;
      this.newDescription = "";
      
    })

  }
  categoryChange(){
    console.log(this.selectCategory,this.sections.length);
    this.category_selection = [];
    for(let i = 0;i < this.sections.length; i++){
      console.log(this.sections[i].category , this.selectCategory)
      if(this.sections[i].category == this.selectCategory){
        this.category_selection.push(this.sections[i].section);
      }
    }
    console.log(this.category_selection);
  }
 

}
