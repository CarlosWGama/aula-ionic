import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  paginas: {icon: string, nome: string, url: string}[] = [
    {icon: 'home', nome: 'Home', url:'/home'},
    {icon: 'settings', nome: 'Configuração', url:'/configuracoes'}
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private translate:TranslateService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.setDefaultLang(navigator.language);
      this.storage.get("idioma").then(idioma => {
        if (idioma != null)
          this.translate.setDefaultLang(idioma);
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sair() {
    this.router.navigateByUrl('/login');
  }
}
