import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AutenticacaoGuard } from './guards/autenticacao.guard';
import * as firebase from 'firebase';

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

    var config = {
      apiKey: "AIzaSyCDqqEdFhVbyhG2nQPIXM55rpijnhBN7Z4",
      authDomain: "cesmac-6f9ef.firebaseapp.com",
      databaseURL: "https://cesmac-6f9ef.firebaseio.com",
      projectId: "cesmac-6f9ef",
      storageBucket: "cesmac-6f9ef.appspot.com",
      messagingSenderId: "346552590038"
    };
    firebase.initializeApp(config);

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
    firebase.auth().signOut();
    this.router.navigateByUrl('/login');
  }
}
