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

  getList() {
    var ref = firebase.firestore().collection("nutricionista");
    ref.get().then(query => {
      query.forEach(doc => {
        let c = new Nutricionista();
        c.setDados(doc.data());
        c.id = doc.id;
        this.listaDeNutricionistas.push(c);
      });
    });
  }


  remove(obj: Nutricionista) {
    var ref = firebase.firestore().collection("nutricionista");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeNutricionistas = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
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
