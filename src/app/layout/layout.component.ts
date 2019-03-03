import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  public loggedUser: User;

  constructor(private apiService: ApiService) { }

  ngOnInit() { this.loggedUser = this.apiService.getUserData(); }

  logout() { this.apiService.logout(); }
}