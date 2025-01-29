import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Agrega esta línea
import { MenuRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    MenuRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
