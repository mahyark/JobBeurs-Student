import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'groundplan-ionic',
  templateUrl: 'groundplan.html'
})
export class GroundPlan {
  items: Array<{Bedrijf: string, E_mail: string, Contact: string, Adres: string, Post: string, Gemeente: string, Telefoon: string, Standnr: number, Sector: string, Opleiding: string, groen: string, geel: string, rood: string, blauw: string, wit: string, Kleur: Array<string>}>;

	constructor(public toastCtrl: ToastController) {
		this.presentToast();
    this.getBedrijven();
	}
	public tap: number = 1000;

	tapEvent(e) {
	    if (this.tap != 1900) {
	        this.tap = 1900;
	    }
	    else
	        this.tap = 1000;
	}

	presentToast() {
    let toast = this.toastCtrl.create({
      position: 'top',
      message: 'Tap op de plattegrond om te vergroten',
      duration: 6000
    });
    toast.present();
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
}
