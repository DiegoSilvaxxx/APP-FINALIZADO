import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Perfil } from '../model/perfil';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuarioEmail: string;
  id: string;
  perfil: Perfil = new Perfil();
  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }


  constructor(public activatedRoute: ActivatedRoute,
    public firebaseauth: AngularFireAuth,
    public router: Router,
    public fire: AngularFireAuth) {

    this.id = this.activatedRoute.snapshot.paramMap.get('perfil');

    this.firebaseauth.authState.subscribe(obj => {

      this.id = this.firebaseauth.auth.currentUser.uid;
      this.usuarioEmail = this.firebaseauth.auth.currentUser.email;

      this.downloadFoto();

      let ref = this.firestore.collection('perfil').doc(this.id)
      ref.get().then(doc => {
        this.perfil.setDados(doc.data());
        this.perfil.id = doc.id;
        console.log(this.perfil);

      })

    });
  }

  ngOnInit() {

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`perfil/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }

  deslogar() {
    this.fire.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(() => {
      this.router.navigate(['/list']);
    })
  }

  edt() {
    this.router.navigate(['perfil-view']);
  }

  Home() {
    this.router.navigate(['/list']);
  }

}