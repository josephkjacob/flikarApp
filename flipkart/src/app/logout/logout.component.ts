import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService, private user:UserService) { }

  ngOnInit() {
    this.storage.remove("user");
    this.router.navigateByUrl("/login");
    this.user.setUserType(0);
  }

}
