import { Component, OnInit } from '@angular/core';
import { Post, PostResponse } from 'src/model/post.model';
import { ApiService } from '../api.service';
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
  toDeletePost: Post;

  public imageUploadedConfirmation = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loggedUser = this.apiService.getUserData();
    this.fetchGalleryPosts();
  }

  public setVote(post: Post, value) {
    post.isReadonly = true;

    setTimeout(() => {
      post.isSendingVote = true;

      this.apiService.setVote(post.post_id, value)
        .then((response: PostResponse) => {
          post.votes_avg = response.votes_avg;
          post.votes_n = response.votes_n;

          post.isSendingVote = false;
          post.isVoted = true;
        }).catch(console.log)
    }, 300)
  }


  // deletePost() {
  //   this.apiService.deletePost(this.toDeletePost.post_id)
  //     .then(data => this.fetchGalleryPosts())
  //     .catch(err => { this.fetchGalleryPosts(); console.log(err); })
  // }

  public fetchGalleryPosts() {
    this.isGalleryListLoading = true;

    this.apiService.getGallery()
      .then((data: Array<PostResponse>) => {
        this.posts = [];
        data.forEach((item: PostResponse) => this.posts.push(new Post(item, this.loggedUser)));
        this.isGalleryListLoading = false;
      }).catch(console.log)
  }

  // public pageDimmed: boolean = false;
  // public dimmedPost: Post;
}