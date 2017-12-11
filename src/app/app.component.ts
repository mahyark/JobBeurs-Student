import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { GroundPlan } from '../pages/GroundPlan/groundplan';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html',
  template: `
  <ion-tabs>
    <ion-tab tabIcon="map" tabTitle="Plattegrond" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="search" tabTitle="Bedrijven" [root]="tab2"></ion-tab>
  </ion-tabs>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make GroundPlan the root (or first) page
  rootPage = GroundPlan;
  pages: Array<{title: string, component: any}>;

  tab1: any;
  tab2: any;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.tab1 = GroundPlan;
    this.tab2 = ListPage;

    // set our app's pages
    this.pages = [
      { title: 'Plattegrond', component: GroundPlan },
      { title: 'Bedrijven', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}