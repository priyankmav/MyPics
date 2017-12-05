import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Gallery} from '../resources/data/gallery';
import {Photos} from '../resources/data/photos';
import { AuthService } from 'aurelia-auth';


@inject(Router, Gallery, Photos, AuthService)
export class GalleryList {
  constructor(router, gallery, photo, auth) {
    this.gallery = gallery;
    this.router = router;
    this.auth = auth;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.title = "These are you galleries!";
    this.editGalleryForm = false;
    this.showGallery = true;
    this.addOrEditGallery = false;
    this.showPhotos = false;
    this.photo = photo;
      }


  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
    this.router.navigate('home');
  }

  createGallery() {
    this.galleryObj = {
      gallery: '',
      description: '',
      userId: this.user._id,
    };
    this.showGallery = false;
    this.addOrEditGallery = true;
    this.showPhotos = false;
  }

 
  async saveGallery() {
    if (this.galleryObj) {
      let response = await this.gallery.save(this.galleryObj);
      if (response.error) {
        alert('There was an error creating the Gallery');
      } else {
              }
    }
    this.showGallery = true;
  }
  async activate() {
    await this.gallery.getUserGallery(this.user._id);
  }
  editGallery(gallery) {
    this.galleryObj = gallery;
    this.showGallery = false;
  }
  deleteGallery(gallery) {
    this.gallery.deleteGallery(gallery._id);
  }

  back() {
    this.showGallery = true;
    this.addOrEditGallery = false;
    this.showPhotos = false;
    
  }

  addPhotos(gallery) {
    this.photoObj = {
      galleryId: gallery._id
    };
    this.showGallery = false;
    this.addOrEditGallery = false;
    this.showPhotos = true;
  }

  async savePhoto() {
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
    this.showGallery = false;
    this.addOrEditGallery = false;
    this.showPhotos = true;
  }
  async activate2() {
    await this.photo.getUserPhoto(JSON.parse(sessionStorage.getItem('gallery'))._id);
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
}
