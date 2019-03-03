import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/model/post.model';
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

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  deletePost() {
    this.apiService.deletePost(this.post.post_id)
      .then(data => this.updateGalleryPost.emit(null))
      .catch(err => { this.updateGalleryPost.emit(null); console.log(err); })
  }
}