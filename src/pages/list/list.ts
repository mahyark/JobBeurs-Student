import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { SettingsPopover } from '../settings-popover/settings-popover';
import * as $ from 'jquery';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  items: Array<{Bedrijf: string, E_mail: string, Contact: string, Adres: string, Post: string, Gemeente: string, Telefoon: string, Standnr: number, Sector: string, Opleiding: string, groen: string, geel: string, rood: string, blauw: string, wit: string, Kleur: Array<string>}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.initializeItems();
    localStorage.setItem('searchVal', "");
    localStorage.setItem('oplVal', "");
  }

  weergevenPopover(event) {
		let popover = this.popoverCtrl.create(SettingsPopover);
		popover.present({
			ev: event
		});
	}

  initializeItems() {
    this.getBedrijven();
    this.items = JSON.parse(localStorage.getItem('bedrijven'));
  }

  getBedrijven() {
    var url_s = 'https://defourstijn.cloudant.com/bedrijven/65377d850d363f7336e28f83f0a0729b';
		$.get(
				url_s,
				function(data_o) {
          this.items = data_o.bedrijven;
          for(let i = 0; i < data_o.bedrijven.length; i++) {
            var Opleidingen = new Array();
            var Kleuren = new Array();
            if (this.items[i].groen=="WAAR"){
              Opleidingen.push("Bedrijfsmanagement Office Management Communicatie");
              Kleuren.push("#00C851");
            };
            if (this.items[i].geel=="WAAR"){
              Opleidingen.push("ICT Multimedia Grafische en Digitale Media");
              Kleuren.push("#fbc02d");
            };
            if (this.items[i].rood=="WAAR"){
              Opleidingen.push("Wetenschappen Techniek");
              Kleuren.push("#ff3547");
            };
            if (this.items[i].blauw=="WAAR"){
              Opleidingen.push("Toegepaste Informatica Electronica ICT");
              Kleuren.push("#4285f4");
            };
            if (this.items[i].wit=="WAAR"){
              Opleidingen.push("Gezondheid Onderwijs");
              Kleuren.push("white");
            };

            this.items[i].Opleiding = Opleidingen.toString();
            this.items[i].Kleur = Kleuren;
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
    localStorage.setItem('searchVal', val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.Bedrijf.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    //Opleiding Filter
    this.items = this.items.filter(item => this.filterOpleidingen(item.Opleiding,  localStorage.getItem('oplVal').split(",")));
  }

  onOpleidingenChange(ctxt: string): void {
    this.initializeItems();
    localStorage.setItem('oplVal', ctxt.toString());

    //Search Filter
    let val = localStorage.getItem('searchVal');
    if (val == null) {console.log("test")}
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.Bedrijf.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    //Opleiding Filter
    this.items = this.items.filter(item => this.filterOpleidingen(item.Opleiding, ctxt));
  }

  filterOpleidingen(opleidingen, ctxt) {
      if (ctxt.length == 0) {
        return true;
      }
      for (let opl of ctxt) {
        if (!opleidingen.includes(opl)) {
          return false;
        }
      }
      return true;
  }
}
