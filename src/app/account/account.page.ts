
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any;
  loadingUserData: boolean = false;
  constructor(
    private userService: UserService,
    private storage: Storage
  ) {
    this.getUser();
  }

  ngOnInit() {

  }

  async getUser(){
    this.loadingUserData = true;
    let user: any = await this.storage.get('user');
    console.log(user);
    this.userService.getUser(user.id).then(
      (data: any) => {

        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
        this.loadingUserData = false;
      }
    ).catch(
      (error) => {
        console.log(error);
        this.loadingUserData = false;
      });
  }

  async takePhoto() {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

}
