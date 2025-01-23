import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {}

  async finish() {
    console.log('Finish');
    try {
      await this.storage.set('vilaintro', true); // Espera a que se guarde el valor
      console.log('Storage set successfully');
      await this.router.navigateByUrl('/login'); // Espera a que la navegación se complete
    } catch (error) {
      console.error('Error setting storage:', error);
    }
  }

}
