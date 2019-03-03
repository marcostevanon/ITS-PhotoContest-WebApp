import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/model/post.model';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() { }

}