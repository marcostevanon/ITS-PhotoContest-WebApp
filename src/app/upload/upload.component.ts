import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UploadResponde } from 'src/model/post.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  // html status variables
  selectedFileLabel = 'Select a file';
  isPhotoSelected = false;
  isPhotoUploading = false;
  progressPercentage: number = 0;
  isPhotoUploaded = false;
  photoSelected: File;

  uploadedImageId: number
  uploadedThumbnail: string;

  isRendering = false;
  isRenedringCompleted = false;
  canUploadAnotherImage = false;

  isLoadingAutodetecting = false;
  autodetectedDone = false;

  editDescription: string
  editTags: Array<string> = []

  isSubmitting = false;

  constructor(private authService: AuthService) { }
  ngOnInit() { }

  onFileSelection(event) {
    this.photoSelected = event.target.files[0];
    this.selectedFileLabel = this.photoSelected.name;
    this.isPhotoSelected = true;

    this.phase1();
  }

  phase1() {
    this.isPhotoUploading = false;
    this.progressPercentage = 0;
    this.isPhotoUploaded = false;
    this.isRendering = false;
    this.isRenedringCompleted = false;
    this.canUploadAnotherImage = false;
    this.isLoadingAutodetecting = false;
  }

  upload() {
    this.isPhotoUploading = true;

    var formData = new FormData();
    formData.append('image', this.photoSelected);
    formData.append('originalname', this.photoSelected.name);
    formData.append('title', 'DefaultTitle');
    formData.append('description', 'DefaultDescription');

    this.authService.uploadPhoto(this.photoSelected)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) console.log(`Uploading ...`)
        else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.progressPercentage = percentDone;
          // console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          // console.log('File is completely uploaded!');
          this.phase3();

          var response = new UploadResponde(event.body);
          this.checkIfRenderingIsCompleted(response);
          this.uploadedImageId = response.image_id;
        }
      });
  }

  checkIfRenderingIsCompleted(data) {
    this.authService.checkUpload(data.image_id)
      .then((res: { status: string, resized_image_url: string }) => {
        if (res.status == "uploaded") {
          this.isRenedringCompleted = true;
          this.isRendering = false;
          this.uploadedThumbnail = res.resized_image_url;
        } else {
          setTimeout(() => {
            this.checkIfRenderingIsCompleted(data);
          }, 1000)
        }
      }).catch(console.log)
  }

  phase3() {
    this.isPhotoUploaded = true;
    this.isRendering = true;

    this.isPhotoUploading = false;

    this.progressPercentage = 0;
    this.isRenedringCompleted = false;
    this.canUploadAnotherImage = false;
    this.isLoadingAutodetecting = false;
  }

  autodetectInfos() {
    this.isLoadingAutodetecting = true;
    this.authService.autodetectInfos(this.uploadedThumbnail)
      .then((res: string) => {
        var desc = JSON.parse(res).description;

        if (desc.captions.length)
          this.editDescription = desc.captions[0].text;

        if (desc.tags.length)
          desc.tags.forEach(item => {
            this.editTags.push(item)
          })

        this.autodetectedDone = true;
        this.isLoadingAutodetecting = false;
      })
      .catch(err => this.isLoadingAutodetecting = false)
  }

  addTag(event) {
    event.preventDefault();
    if (event.target.value.trim() != "") {
      this.editTags.push(event.target.value)
      event.target.value = "";
    }
  }

  edit(form: NgForm) {
    //manca l'image id da inserire nella variabile globale e da riprendere qui
    var image_id = this.uploadedImageId;
    var title = form.value.title;
    var description = form.value.description;
    var tags = this.editTags;

    this.isSubmitting = true;

    this.authService.editImageInfos(image_id, title, description, tags)
      .then(res => {
        this.isSubmitting = false;
        this.uploadNewPhoto();
      })
  }

  uploadNewPhoto() {
    this.canUploadAnotherImage = true;
    this.isPhotoUploaded = true;

    this.selectedFileLabel = 'Select a file';
    this.isPhotoSelected = false;
    this.isPhotoUploading = false;
    this.progressPercentage = 0;
    this.photoSelected = null;
    this.uploadedImageId = null;
    this.uploadedThumbnail = null
    this.isRendering = false;
    this.isRenedringCompleted = false;
    this.isLoadingAutodetecting = false;
    this.autodetectedDone = false;
    this.editDescription = null;
    this.editTags = []
    this.isSubmitting = false;
  }

  startAgain() {
    this.canUploadAnotherImage = false;
    this.isPhotoUploaded = false;
  }
}