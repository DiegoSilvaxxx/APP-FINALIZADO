import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-nutri',
  templateUrl: './chat-nutri.page.html',
  styleUrls: ['./chat-nutri.page.scss'],
})
export class ChatNutriPage implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController) { }

  ngOnInit() {
  }

  Home() {
    this.router.navigate(['/lista-de-nutricionistas']);
  }

}
