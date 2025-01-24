import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  constructor(
    private menu: MenuController,
    private navCrtl: NavController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  closeMenu() {
    this.menu.close();
  }

  logOut() {
    this.storage.remove('isUserLoggedIn');
    this.navCrtl.navigateRoot('/login');
    this.menu.close
  }

}