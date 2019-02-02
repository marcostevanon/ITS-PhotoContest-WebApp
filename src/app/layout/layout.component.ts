import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  public loggedUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() { this.loggedUser = this.authService.getUserData(); }

  logout() { this.authService.logout(); }
}