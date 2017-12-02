import {AuthorizeStep} from 'aurelia-auth';
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      {
    route: ['', 'home'],
     moduleId: './modules/home',
     name: 'Home'
      },
      {
     route: 'gallery',
     moduleId: './modules/gallery',
     name: 'Gallery',
     auth: true 
     }
    ]);
  }
}
