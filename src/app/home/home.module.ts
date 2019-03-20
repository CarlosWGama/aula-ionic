import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PrazoComponent } from './prazo/prazo.component';
import { PipesModule } from '../pipes/pipes.module';
import { PrazoBackgroundDirective } from './prazo-background.directive';
import { ServicesModule } from '../services/services.module';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ServicesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, PrazoComponent, PrazoBackgroundDirective],
  providers:[AdMobFree, FCM]
})
export class HomePageModule {}
