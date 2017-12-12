import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'groundplan-ionic',
  templateUrl: 'groundplan.html'
})
export class GroundPlan {
	constructor(public toastCtrl: ToastController) {
		this.presentToast();
	}
	public tap: number = 600;

	tapEvent(e) {
	    if (this.tap != 2000) {
	        this.tap = 2000;
	    }
	    else
	        this.tap = 600;
	}

	presentToast() {
	    let toast = this.toastCtrl.create({
	      position: 'top',
	      message: 'Tap op het plattegrond om te zoomen',
	      duration: 6000
	    });
	    toast.present();
  	}
}
