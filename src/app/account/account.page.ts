import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController, LoadingController } from '@ionic/angular';


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
  followees: any[] = [];
  followers: any[] = [];

  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.getUser();
  }

  ngOnInit() {}

  async getUser() {
    this.loadingUserData = true;
  
    
    let user: any = await this.storage.get('user');
    console.log("Usuario en almacenamiento:", user);
  
    if (!user || !user.id) {
      console.error("Error: No se encontró un usuario válido en el almacenamiento.");
      this.loadingUserData = false;
      return;
    }
  
    
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log("Datos recibidos del usuario:", data);
        
       
        this.storage.set('user', data);
        this.user_data = data;
        this.editedUser = { ...data };
  
        this.loadingUserData = false;
      }
    ).catch((error) => {
      console.error("Error al obtener usuario desde el servicio:", error);
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
    if (!this.editedUser.id) {
      console.error("Error: No se encontró ID de usuario para actualizar.");
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
      spinner: 'circles',
    });
    await loading.present();
  
    this.userService.updateUser(this.editedUser).then(
      async (data) => {
        console.log('Usuario actualizado:', data);
        this.user_data = { ...this.editedUser };
        await this.storage.set('user', this.user_data);
        window.dispatchEvent(new Event('userUpdated'));
        await loading.dismiss();
        
      }
    ).catch(async (error) => {
      console.log('Error al actualizar usuario:', error);
      await loading.dismiss();
    });
  }


  async takePhoto(source: CameraSource = CameraSource.Camera) {
    console.log('Tomando foto...');
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: source,
        quality: 100
      });

      console.log('Foto capturada:', capturedPhoto.dataUrl);
      this.editedUser.image = capturedPhoto.dataUrl;
      this.updatePhoto();
    } catch (error) {
      console.log('Error al tomar la foto:', error);
    }
  }

  async updatePhoto() {
    const user = await this.storage.get('user');
  
    if (!user || !user.id) {
      console.error("Error: No se encontró un usuario válido para actualizar la foto.");
      return;
    }
  
    const updatedData = { id: user.id, image: this.editedUser.image };
  
    this.userService.updateUser(updatedData).then(
      (data) => {
        console.log('Foto actualizada:', data);
        this.user_data.image = this.editedUser.image;
        this.storage.set('user', this.user_data);
        window.dispatchEvent(new Event('userUpdated')); 
      }
    ).catch((error) => {
      console.error('Error al actualizar foto:', error);
    });
  }
  
  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons:[
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }
}
