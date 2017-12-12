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
	public tap: number = 400;

	tapEvent(e) {
	    if (this.tap != 800) {
	        this.tap = 800;
	    }
	    else
	        this.tap = 400;
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
