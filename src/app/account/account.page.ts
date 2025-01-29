import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  editedUser: any = {};
  loadingUserData: boolean = false;
  editMode: boolean = false;

  constructor(
    private userService: UserService,
    private storage: Storage
  ) {
    this.getUser();
  }

  ngOnInit() {}

  async getUser() {
    this.loadingUserData = true;
    let user: any = await this.storage.get('user');
    console.log(user);

    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
        this.editedUser = { ...data };
        this.loadingUserData = false;
      }
    ).catch((error) => {
      console.log(error);
      this.loadingUserData = false;
    });
  }

  toggleEditMode() {
    if (this.editMode) {
      this.saveChanges();
    } else {
      this.editedUser = { ...this.user_data };
    }
    this.editMode = !this.editMode;
  }

  async saveChanges() {
    this.userService.updateUser(this.editedUser).then(
      (data) => {
        console.log('Usuario actualizado:', data)
        this.user_data = { ...this.editedUser }; 
        this.storage.set('user', this.user_data);
      }
    ).catch((error) => {
      console.log('Error al actualizar usuario:', error);
    });
  }

  async takePhoto() {
    console.log('Tomando foto...');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    });

    console.log('Foto capturada:', capturedPhoto.dataUrl);
    this.editedUser.image = capturedPhoto.dataUrl;
    this.updatePhoto();
  }

  async updatePhoto() {
    this.userService.updateUser({ image: this.editedUser.image }).then(
      (data) => {
        console.log('Foto actualizada:', data);
        this.user_data.image = this.editedUser.image;
        this.storage.set('user', this.user_data);
      }
    ).catch((error) => {
      console.log('Error al actualizar foto:', error);
    });
  }
}
