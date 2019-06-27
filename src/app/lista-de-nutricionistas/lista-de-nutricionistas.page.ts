import { Component, OnInit } from '@angular/core';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-de-nutricionistas',
  templateUrl: './lista-de-nutricionistas.page.html',
  styleUrls: ['./lista-de-nutricionistas.page.scss'],
})
export class ListaDeNutricionistasPage implements OnInit {

  listaDeNutricionistas: Nutricionista[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  constructor(public router: Router, public loadingController: LoadingController) {

  }

  ngOnInit() {
    this.getList();
  }

  viewNutricionista(obj: Nutricionista) {
    this.router.navigate(['/nutricionista-view', { 'nutricionista': obj.id }]);
    this.presentLoading();
  }

  Chat(obj: Nutricionista) {
    this.router.navigate(['/chat-nutri', { 'nutricionista': obj.id }]);
  }

  perfilNutri(obj: Nutricionista) {
    this.router.navigate(['/perfil-nutri', { 'nutricionista': obj.id }]);
  }

  getList() {
    var ref = firebase.firestore().collection("nutricionista")
    
    ref.get().then(query => {
      query.forEach(doc => {
        let c = new Nutricionista();
        c.setDados(doc.data());
        c.id = doc.id;

        let ref = firebase.storage().ref().child(`nutri/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;

          this.listaDeNutricionistas.push(c);
        })
        .catch(err=>{
         this.listaDeNutricionistas.push(c);
         })
      });
    });
  }

  Home() {
    this.router.navigate(['/list']);
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();


  }


}
