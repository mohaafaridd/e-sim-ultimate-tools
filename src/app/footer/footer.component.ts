import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({

  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(".fa-facebook-f").click(function () {
      window.location.href = "https://www.facebook.com/moha.khamis2";
    })

    $(".fa-github").click(function () {
      window.location.href = "https://github.com/Mohammed-Farid";
    })

    $(".fa-globe-americas").click(function () {
      window.location.href = "https://suna.e-sim.org/profile.html?id=345790";
    })

    $(".fa-paypal").click(function () {
      window.location.href = "https://www.paypal.me/MohammedFarid1";
    })

  }

}
