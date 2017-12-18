import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { LoadingController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  icons: string[];
  items: Array<{Bedrijf: string, E_mail: string, Contact: string, Adres: string, Post: string, Gemeente: string, Telefoon: string, Standnr: number, Sector: string, Opleiding: string, groen: string, geel: string, rood: string, blauw: string, wit: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.initializeItems();
  }

  initializeItems() {
    this.getBedrijven();
    this.items = JSON.parse(localStorage.getItem('bedrijven'));
  } 

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Even geduld...",
      duration: 4000
    });
    loader.present();
  }

  async getBedrijven() {
    var url_s = 'https://defourstijn.cloudant.com/bedrijven/65377d850d363f7336e28f83f0a0729b';
		$.get(
				url_s,
				function(data_o) {
          this.items = data_o.bedrijven;
          for(let i = 0; i < data_o.bedrijven.length; i++) {
            var Opleidingen = new Array();
            if (this.items[i].groen=="WAAR"){Opleidingen.push("Bedrijfsmanagement Office Management Communicatie")};
            if (this.items[i].geel=="WAAR"){Opleidingen.push("ICT Multimedia Grafische en Digitale Media")};
            if (this.items[i].rood=="WAAR"){Opleidingen.push("Wetenschappen Techniek")};
            if (this.items[i].blauw=="WAAR"){Opleidingen.push("Toegepaste Informatica Electronica ICT")};
            if (this.items[i].wit=="WAAR"){Opleidingen.push("Gezondheid Onderwijs")};

            this.items[i].Opleiding = Opleidingen.toString();
            localStorage.setItem('bedrijven', JSON.stringify(this.items));
          }
				}
			);
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.Bedrijf.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
