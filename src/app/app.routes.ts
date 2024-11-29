import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CaptureComponent } from './capture/capture.component';

export const routes: Routes = [ 
  { path: '', component: ConnexionComponent },
  { path: 'connexion', component: ConnexionComponent },     // Route pour la page de connexion
  { path: 'dashboard', component: NavBarComponent },    // Route pour la barre de navigation principale
  { path: 'capture', component: CaptureComponent },     // Route pour la page de capture
];
