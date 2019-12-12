import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, @Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  ngOnInit() {
    this.storage.remove("user");
    this.router.navigateByUrl("/login");
  }

}
