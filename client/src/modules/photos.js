import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Photos} from '../resources/data/photos';
import { AuthService } from 'aurelia-auth';

@inject(Router, Photos, AuthService)
export class PhotoGallery {
  constructor(router, photo, auth) {
    this.photo = photo;
    this.router = router;
    this.auth = auth;
    this.gallery = JSON.parse(sessionStorage.getItem('gallery'));
    this.editPhoto2 = JSON.parse(sessionStorage.getItem('photo'));
    this.showPhotos = true;
  }


  async savePhoto() { {
    this.photoObj = {
      _id: this.photo._id,
      galleryId: this.gallery._id
    };
  }   
    if (this.photoObj) {
      let response = await this.photo.save(this.photoObj);
      if (response.error) {
        alert('There was an error uploading the Photo');
      } else {
        var photoId = response._id;
        var galleryId = response.galleryId;
        if (this.filesToUpload && this.filesToUpload.length) {
          await this.photo.uploadFile(this.filesToUpload, galleryId,  photoId);
          this.filesToUpload = [];
        }
      }
    }

    this.showPhotos = true;
  }
  async activate() {
    await this.photo.getUserPhoto(this.gallery._id);
  }
  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }

  deletePhoto(photo) {
      this.photo.deletePhoto(photo._id);
  }

  editPhoto(photo) {
    this.photoObj2 = photo;
    this.showPhotos = false;
  }

  async saveEditedPhoto() {
    if (this.photoObj2) {
      let response = await this.photo.saveEdited(this.photoObj2);
      if (response.error) {
        alert('There was an error updating the photo details');
      } else {
              }
    }
    this.showPhotos = true;
  }
  back() {
    this.router.navigate('gallery');
  }

  back2() {
    this.showPhotos = true;
  }
}
