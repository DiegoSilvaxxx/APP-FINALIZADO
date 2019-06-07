import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nutricionista-view',
  templateUrl: './nutricionista-view.page.html',
  styleUrls: ['./nutricionista-view.page.scss'],
})
export class NutricionistaViewPage implements OnInit {

  nutricionista: Nutricionista = new Nutricionista();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  imagem;

  formGroup: FormGroup; // <----

  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public nav: NavController) {// <----
    this.id = this.activatedRoute.snapshot.paramMap.get('nutricionista');
    this.form(); // <----
  }

  form() {// <----
    this.formGroup = this.formBuilder.group({
      nome: [this.nutricionista.nome],
      endereco: [this.nutricionista.endereco],
      telefone: [this.nutricionista.telefone],
      email: [this.nutricionista.email],
    });
  }

  ngOnInit() {
    this.downloadFoto();
    this.obterNutricionista();
  }

  obterNutricionista() {
    var ref = firebase.firestore().collection("nutricionista").doc(this.id);

    ref.get().then(doc => {
      this.nutricionista.setDados(doc.data());
      this.form();

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  atualizar() {
    let ref = this.firestore.collection('nutricionista')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() => {
        console.log('Atualizado com sucesso');
        this.nav.navigateRoot('/lista-de-nutricionistas');
      }).catch(() => {
        console.log('Erro ao Atualizar');
      })
  }

  enviaArquivo(event) {
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
      .child(`nutris/${this.id}.jpg`);

    ref.put(imagem).then(url => {
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`nutris/${this.nutricionista.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }


}
