import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Gallery {
  constructor(data) {
    this.data = data;
    this.GALLERY_SERVICE = 'gallery';
    this.galleryArray = [];
  }


  async save(gallery) {
    if (gallery) {
      if (!gallery._id) {
        let response = await this.data.post(gallery, this.GALLERY_SERVICE);
        if (!response.error) {
          this.galleryArray.push(response);
        }
        return response;
      } else {
        let response = await this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);
        if (!response.error) {
// this.updateArray(response);
        }
        return response;
      }
    }
  }
  async deleteGallery(id) {
    let response = await this.data.delete(this.GALLERY_SERVICE + "/" + id);
    if (!response.error) {
      for (let i = 0; i < this.galleryArray.length; i++) {
        if (this.galleryArray[i]._id === id) {
          this.galleryArray.splice(i, 1);
        }
      }
    }
  }


  async getUserGallery(id) {
    let response = await this.data.get(this.GALLERY_SERVICE + "/" + id);
    if (!response.error && !response.message) {
      this.galleryArray = response;
    }
  }

}
