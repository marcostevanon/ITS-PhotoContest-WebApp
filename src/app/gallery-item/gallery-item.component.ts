import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post, PostResponse } from 'src/model/post.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {
  @Input() post: Post;
  @Output() updateGalleryPost = new EventEmitter();

  showDeleteModal: boolean = false;
  fullScreen = false;
  isLoading: boolean = true;
  isErrored: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

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
        }).catch(err => {
          console.log(err)

          post.votes_avg = err.error.votes_avg;
          post.votes_n = err.error.votes_n;

          post.isSendingVote = false;
          post.isVoted = true;
        })
    }, 300)
  }

  selectedPost;
  toggleFullscreenImage(post) {
    this.fullScreen = !this.fullScreen;
    this.selectedPost = post;
    this.apiService.getVotesByPost(post.post_id)
      .then(response => {
        this.selectedPost['votes'] = response;
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.isErrored = true;
      });
  }


  deletePost() {
    this.apiService.deletePost(this.post.post_id)
      .then(data => this.updateGalleryPost.emit(null))
      .catch(err => { this.updateGalleryPost.emit(null); console.log(err); })
  }
}