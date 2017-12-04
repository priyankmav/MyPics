import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Gallery} from '../resources/data/gallery';
import { AuthService } from 'aurelia-auth';


@inject(Router, Gallery, AuthService)
export class GalleryList {
  constructor(router, gallery, auth) {
    this.gallery = gallery;
    this.router = router;
    this.message = 'List';
    this.auth = auth;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.title = "These are you galleries!";
    this.editGalleryForm = false;
    this.showGallery = true;
    this.addOrEditGallery = false;
    this.showPhotos = false;
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
        var galleryId = response._id;
        if (this.filesToUpload && this.filesToUpload.length) {
          await this.gallery.uploadFile(this.filesToUpload, this.user._id, galleryId);
          this.filesToUpload = [];
        }
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

  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }

  addPhotos(gallery) {
    this.showGallery = false;
    this.addOrEditGallery = false;
    this.showPhotos = true;
  }
}
