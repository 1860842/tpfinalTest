import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CaptureComponent } from './capture/capture.component';
import { CommentAffichageComponent } from './comment-affichage/comment-affichage.component';

export const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home', component: NavBarComponent },
  { path: 'capture', component: CaptureComponent },   
  { path: 'commentaire', component: CommentAffichageComponent}  
];
