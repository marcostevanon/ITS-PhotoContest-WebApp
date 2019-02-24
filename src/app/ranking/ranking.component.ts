import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Post, PostResponse } from 'src/model/post.model';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  isLoading: boolean = true;

  public posts: Array<Post> = [];
  public loggedUser: User;

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.loggedUser = this.authService.getUserData();
    this.authService.getRanking()
      .then((data: Array<PostResponse>) => {
        this.posts = [];
        data.forEach((item: PostResponse) => {
          this.posts.push(new Post(item, this.loggedUser));
        });
        for (let i = 0; i < this.posts.length; i++) {
          this.posts[i].ranking = (i + 1);
          this.posts[i].tags = JSON.parse(this.posts[i].tags.toString());
        }
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      })
  }
}