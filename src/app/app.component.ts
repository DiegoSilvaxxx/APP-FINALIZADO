import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/list',
      icon: 'home'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'md-exit'
    },
    {
      title: 'Lista de Nutricionistas',
      url: '/lista-de-nutricionistas',
      icon: 'book'
    }
  ];
// 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth : AngularFireAuth,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
    .subscribe(
      user => {
        if (!user) {

          this.router.navigate(['/home']);
        }
      },
      () => {
       // this.router.navigate(['/list']);
      }
    );

}

Perfil() {
  this.router.navigate(['/perfil']);
}
}