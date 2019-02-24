import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/model/user.model';
import { Post, PostResponse } from 'src/model/post.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = true;
  isErrored = false;

  userData: User;
  imageList: Array<Post> = [];

  public loggedUser: User;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getUserData();
    var userId = this.route.snapshot.params.userid;

    this.authService.getProfileData(userId)
      .then((response: User) => this.userData = response)
      .then(() => this.authService.getProfileImageList(userId))
      .then((response: Array<PostResponse>) => {
        response.forEach((item: PostResponse) => {
          this.imageList.push(new Post(item, this.loggedUser));
        });
        this.isLoading = false;
      })
      .catch(err => { this.isErrored = true; console.log(err); })
  }
}