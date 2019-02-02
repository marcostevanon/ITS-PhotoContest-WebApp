import { Component, OnInit } from '@angular/core';
import { Post, PostResponse } from 'src/model/post.model';
import { AuthService } from '../auth.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public isGalleryListLoading: boolean = true;
  public placeholderPrefetchingArray = new Array(4).fill(0);
  public loggedUser: User;
  public posts: Array<Post> = [];

  public imageUploadedConfirmation = false;

  constructor(private authService: AuthService) {
    this.loggedUser = this.authService.getUserData();
    this.fetchGalleryPosts();
  }

  ngOnInit() { }

  public setVote(post: Post, value) {
    post.isReadonly = true;

    setTimeout(() => {
      post.isSendingVote = true;

      this.authService.setVote(post.post_id, value)
        .then((response: PostResponse) => {
          console.log(response);
          post.votes_avg = response.votes_avg;
          post.votes_n = response.votes_n;

          post.isSendingVote = false;
          post.isVoted = true;
          console.log(post);
        }).catch(err => console.log(err))

    }, 300)
  }

  public fetchGalleryPosts() {
    this.isGalleryListLoading = true;

    this.authService.getGallery()
      .then((data: Array<PostResponse>) => {
        this.posts = [];
        data.forEach((item: PostResponse) => {
          this.posts.push(new Post(item, this.loggedUser));
        });

        this.isGalleryListLoading = false;
      }).catch(err => console.log(err))
  }

  // public pageDimmed: boolean = false;
  // public dimmedPost: Post;
}