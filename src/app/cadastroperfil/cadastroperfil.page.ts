import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastroperfil',
  templateUrl: './cadastroperfil.page.html',
  styleUrls: ['./cadastroperfil.page.scss'],
})
export class CadastroperfilPage implements OnInit {

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots : true};
  formGroup : FormGroup;

  constructor(public formBuilder : FormBuilder,
              public rauter : Router) {
    this.formGroup = this.formBuilder.group({
      nome : [''],
      sobrenome : [''],
      cel : [''],
      telefone : [''],
      cidade : [''],
      
    })
  }

  ngOnInit() {
  }

  entrar(){
    let ref = this.firestore.collection('cadastroperfil')
    ref.add(this.formGroup.value)
    .then(()=>{
      console.log('Entrada do Perfil com sucesso');
      this.rauter.navigate(['/perfil']);
    }).catch(err=>{
      console.log('Erro ao Cadastrar')
      console.log(err)
    })
  }



}
