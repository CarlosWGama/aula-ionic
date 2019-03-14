import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vazia',
  templateUrl: './vazia.page.html',
  styleUrls: ['./vazia.page.scss'],
})
export class VaziaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario != null) 
        this.router.navigateByUrl('/home');
      else
        this.router.navigateByUrl('/login');
    });

  }

}
