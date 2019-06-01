import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-de-nutricionista',
  templateUrl: './cadastro-de-nutricionista.page.html',
  styleUrls: ['./cadastro-de-nutricionista.page.scss'],
})
export class CadastroDeNutricionistaPage implements OnInit {

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup;

  constructor(private formBuilder : FormBuilder, 
    private router : Router) {

      this.formGroup = this.formBuilder.group({
        nome : [''],
        endereco : [''],
        telefone : [''],
        email : [''],
     });

    }

  ngOnInit() {
  }
  
  cadastrar(){
    console.log('ok');
    let ref = this.firestore.collection('nutricionista')
    ref.add(this.formGroup.value)
      .then(() =>{
        console.log('Cadastrado com sucesso');
        this.router.navigate(['/list']);
      }).catch(()=>{
        console.log('Erro ao cadastrar');
      })
    }

  }

