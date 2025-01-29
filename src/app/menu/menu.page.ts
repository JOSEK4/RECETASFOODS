import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {
  user: any = {
    name: '',
    last_name: '',
    email: '',
    image: 'assets/img/default-avatar.jpeg' 
  };

  menuItems = [
    { title: 'Inicio', url: '/menu/home', icon: 'home-outline' },
    { title: 'Cuenta', url: '/menu/account', icon: 'person-outline' },
    { title: 'Buscar Usuarios', url: '/menu/search-users', icon: 'search-outline' }
  ];

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    const storedUser = await this.storage.get('user');
    if (storedUser) {
      this.user = storedUser;
    }
  }

  closeMenu() {
    this.menu.close();
  }

  navigateTo(url: string) {
    this.navCtrl.navigateRoot(url);
    this.closeMenu();
  }

  async log_out() {
    await this.storage.remove("user");
    await this.storage.remove("isUserLoggedIn");
    this.navCtrl.navigateRoot("/login");
  }
}
