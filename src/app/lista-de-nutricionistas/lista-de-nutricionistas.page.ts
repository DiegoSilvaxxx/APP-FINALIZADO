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

  idUsuario : string;
  listaDeNutricionistas: Nutricionista[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  idList : String[] = [];
  
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
    ref.get().then(doc => {

      doc.forEach(item =>{

        let n = new Nutricionista();
        n.id = item.id;

        var ref = firebase.firestore().collection("nutricionista").doc(n.id).get().then(doc =>{
          n.nome = doc.data().nome;
          n.setDados(n);
          this.listaDeNutricionistas.push(n);
        });
      });

      console.log(this.listaDeNutricionistas);
    
       });
   
  }

  Perfil() {
    this.router.navigate(['/perfil']);
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
