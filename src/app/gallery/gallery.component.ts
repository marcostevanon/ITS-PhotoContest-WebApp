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
  public isGalleryListLoading = true;
  public placeholderPrefetchArray = new Array(4).fill(0);
  public loggedUser: User;
  public posts: Array<Post> = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loggedUser = this.apiService.getUserData();
    this.fetchGalleryPosts();
  }

  public fetchGalleryPosts() {
    this.isGalleryListLoading = true;

    this.apiService.getGallery()
      .then((data: Array<PostResponse>) => {
        this.posts = [];
        data.forEach((item: PostResponse) => this.posts.push(new Post(item, this.loggedUser)));
        this.isGalleryListLoading = false;
      })
      .catch(console.log);
  }
}
