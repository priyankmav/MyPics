import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Photos {
  constructor(data) {
    this.data = data;
    this.USER_SERVICE = 'users';
    this.PHOTO_SERVICE = 'photos';
    this.GALLERY_SERVICE = 'gallery';
    this.photosArray = [];
  }


  async save(photo) {
    if (photo) {
      if (!photo._id) {
        let response = await this.data.post(photo, this.GALLERY_SERVICE + "/" + this.PHOTO_SERVICE);
        if (!response.error) {
          this.photoArray.push(response);
        }
        return response;
      } else {
        let response = await this.data.put(photo, this.GALLERY_SERVICE + "/" + galleryId + "/" + photoId);
        if (!response.error) {
// this.updateArray(response);
        }
        return response;
      }
    }
  }
  async deletePhoto(id) {
    let response = await this.data.delete(this.GALLERY_SERVICE + "/" + galleryId + "/" + photoId);
    if (!response.error) {
      for (let i = 0; i < this.photoyArray.length; i++) {
        if (this.photoArray[i]._id === id) {
          this.photoArray.splice(i, 1);
        }
      }
    }
  }


  async uploadFile(files, userId, galleryId, photoId) {
    let formData = new FormData();
    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.GALLERY_SERVICE + "/upload/" + userId + "/" + galleryId + "/" + photoId);
    return response;
  }

  async getUserPhoto(galleryId) {
    let response = await this.data.get(this.USER_SERVICE + "/" + this.GALLERY_SERVICE + "/" + galleryId);
    if (!response.error && !response.message) {
      this.galleryArray = response;
    }
  }

}
