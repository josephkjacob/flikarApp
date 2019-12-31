import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StorageServiceModule} from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {UserService} from './user.service';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { ItemComponent } from './item/item.component';


const routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"logout", component:LogoutComponent},
  
  {path:"home", component:HomeComponent,
  children:[
    {path:"", component:ViewComponent},  
    {path:"add", component:AddComponent},
    {path:"cart", component:CartComponent},    
    {path:"product", component:ItemComponent}
  ]}

  
 
 
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ViewComponent,
    AddComponent,
    LogoutComponent,
    CartComponent,
    HomeComponent,
    LoginHeaderComponent,
    ItemComponent    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
