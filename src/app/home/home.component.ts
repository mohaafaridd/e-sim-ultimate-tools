import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  /* Tools */
  tools = [
    {
      name: "Equipment",
      routerLink: "/equipment",
      img: "assets/images/cards/equipment.jpg",
      alt: "Equipment Card"
    },

    {
      name: "Mercenaries",
      routerLink: "/mercenaries",
      img: "assets/images/cards/mercenaries.jpg",
      alt: "Mercenaries Card"
    },

    {
      name: "Monetary",
      routerLink: "/monetary",
      img: "assets/images/cards/monetary.jpg",
      alt: "Monetary Card"
    },

    {
      name: "Two Clickers",
      routerLink: "/twoClickers",
      img: "assets/images/cards/two-clickers.jpg",
      alt: "Two Clickers Card"
    }
  ]
}
