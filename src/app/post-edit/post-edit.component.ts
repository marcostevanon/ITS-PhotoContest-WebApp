import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { PostResponse, Post } from 'src/model/post.model';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  loggedUser: User;
  isLoading: boolean = true;
  isErrored: boolean = false;
  isEditedDone: boolean = false;
  post: Post;

  isSubmitting = false;
  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getUserData();

    var imageid = this.route.snapshot.params.imageid;
    this.authService.getPost(imageid)
      .then((response: PostResponse) => {
        this.post = new Post(response, this.loggedUser);
        this.isLoading = false;
        console.log(this.post);
      })
      .catch(err => { this.isErrored = true; console.log(err); })
  }


  addTag(event) {
    event.preventDefault();
    if (event.target.value.trim() != "") {
      this.post.tags.push(event.target.value)
      event.target.value = "";
    }
  }

  deleteTag(event) {
    if (!this.isSubmitting) {
      var index = this.post.tags.indexOf(event);
      if (index > -1) this.post.tags.splice(index, 1);
    }
  }

  edit(form: NgForm) {
    this.isSubmitting = true;

    this.authService.editImageInfos(this.post.post_id, this.post.title, this.post.description, this.post.tags)
      .then(res => { this.isSubmitting = false; this.isEditedDone = true; })
      .catch(err => { this.isSubmitting = false; console.log(err); })
  }

}