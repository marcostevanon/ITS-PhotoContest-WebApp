import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
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
  vote_avg: number = 0;

  public loggedUser: User;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.loggedUser = this.apiService.getUserData();
    var userId = this.route.snapshot.params.userid;

    this.apiService.getProfileData(userId)
      .then((response: User) => this.userData = response)
      .then(() => this.apiService.getProfileAvgVote(userId))
      .then((avg: number) => this.vote_avg = Math.round(avg * 100) / 100)
      .then(() => this.apiService.getProfileImageList(userId))
      .then((response: Array<PostResponse>) => {
        response.forEach((item: PostResponse) => this.imageList.push(new Post(item, this.loggedUser)));
        this.isLoading = false;
      })
      .catch(err => { this.isErrored = true; console.log(err); })
  }
}