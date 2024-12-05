import { Routes } from '@angular/router';
import { AideComponent } from './aide/aide.component';
import { CommentAffichageComponent } from './comment-affichage/comment-affichage.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CaptureComponent } from './capture/capture.component';
import { RapportComponent } from './rapport/rapport.component';

export const routes: Routes = [
    { path: '', redirectTo: '/mytime', pathMatch: 'full' },
    { path: 'mytime', component: NavBarComponent }, 
    { path: 'mytime/aide', component: AideComponent }, 
    { path: 'mytime/aide/:viewKey', component: AideComponent },
    { path: 'mytime/comments', component: CommentAffichageComponent },
    { path: 'connexion', component: ConnexionComponent },
    { path: 'enregistrement', component: EnregistrementComponent },
    { path: 'capture', component: CaptureComponent},
    { path: 'rapport', component: RapportComponent }
];
