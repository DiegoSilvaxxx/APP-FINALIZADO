import { Component, OnInit } from '@angular/core';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-nutri',
  templateUrl: './perfil-nutri.page.html',
  styleUrls: ['./perfil-nutri.page.scss'],
})
export class PerfilNutriPage implements OnInit {

  nutricionista: Nutricionista = new Nutricionista();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  imagem;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController) {this.id = this.activatedRoute.snapshot.paramMap.get('nutricionista');
  }
  

  ngOnInit() {
    this.obterPerfil();
  }

  obterPerfil() {
    var ref = firebase.firestore().collection("nutricionista").doc(this.id);

    ref.get().then(doc => {
      this.nutricionista.setDados(doc.data());

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

   Home() {
    this.router.navigate(['/list']);
  }


}
