import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mensagem } from '../model/mensagem';

@Component({
  selector: 'app-chat-nutri',
  templateUrl: './chat-nutri.page.html',
  styleUrls: ['./chat-nutri.page.scss'],
})
export class ChatNutriPage implements OnInit {

  idNutricionista : string;
  idUsuario : string;
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  conversa : Mensagem[] = [];

  formGroup : FormGroup;
  @ViewChild('txtarea') txtarea;
  

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController,
    public firebaseauth : AngularFireAuth,
    private formBuilder : FormBuilder, ) {

      this.idNutricionista = this.activatedRoute.snapshot.paramMap.get('nutricionista');
     

      this.firebaseauth.authState.subscribe(obj=>{
        this.idUsuario = this.firebaseauth.auth.currentUser.uid;

        
  
      });

    }

  ngOnInit() {

    

    let ref = this.firestore.doc('mensagem/'+this.idUsuario).collection(this.idNutricionista);
        ref.onSnapshot(doc=> {

          doc.docChanges().forEach(c =>{
            let m = new Mensagem();
            m.setDados(c.doc.data());
            this.conversa.push(m);
          })

         
        });

    
  }



  atualiza(){
    let ref = this.firestore.doc('mensagem/'+this.idUsuario).collection(this.idNutricionista);
    ref.get().then(doc =>{
      doc.forEach(c=>{
        
       let m = new Mensagem();
        m.setDados(c.data());
        this.conversa.push(m);
        
      })
      
    })


  }

  enviarMensagem(){

    this.formGroup = this.formBuilder.group({
      data : [ new Date()],
      mensagem : [this.txtarea.value]
   });


   let ref = this.firestore.doc('mensagem/'+this.idUsuario).collection(this.idNutricionista).add(this.formGroup.value)
   .then(resp=>{
      console.log('Cadastrado com sucesso');
      this.firestore.doc('mensagem/'+this.idNutricionista).collection(this.idUsuario).add(this.formGroup.value)
      
   .then(resp=>{
      console.log('Cadastrado com sucesso');
    }).catch(function(){
      console.log('Erro ao cadastrar');
    })

    }).catch(function(){
      console.log('Erro ao cadastrar');
    })

  }

  Home() {
    this.router.navigate(['/lista-de-nutricionistas']);
  }

}
