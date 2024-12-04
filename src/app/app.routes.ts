import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CaptureComponent } from './capture/capture.component';
import { CommentAffichageComponent } from './comment-affichage/comment-affichage.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';

export const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'mytime', component: NavBarComponent },
  { path: 'capture', component: CaptureComponent },   
  { path: 'comment', component: CommentAffichageComponent} ,
  { path: 'register', component: EnregistrementComponent }
];
