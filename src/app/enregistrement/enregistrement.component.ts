import { Component, Output, EventEmitter, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { AutofillMonitor, TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-enregistrement',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatButtonModule,MatFormField, MatOptionModule, MatFormFieldModule, TextFieldModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, FormsModule, CommonModule, NavBarComponent],
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css']
})
export class EnregistrementComponent {

  username: string = '';
  prenom: string = '';
  nom: string = '';
  courriel: string = '';
  noCivique : string = '';
  rue : string = '';
  ville: string = '';
  province: string = ''; 
  etat: string = ''; 
  pays: string = 'Canada'; 
  codePostal: string = '';
  zip: string = '';

  form: any;
  password: string = '';
  confirmPassword: string = '';

  verifInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^a-zA-Z]/g, '');
  }
  verifInputChiffre(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }
  codePostalValide: boolean = false;
  regionValide: boolean = false;

  formValide(): boolean {
    const inputsValide = this.nom.length > 2
      && this.prenom.length > 2
      && this.noCivique.length >= 1 
      && this.rue.length > 10 
      && this.ville.length > 5
      && ((this.pays === 'Canada' && this.province !== '') || (this.pays === 'US' && this.etat !== ''));
  
    if (this.pays === 'Canada' && this.codePostal.length === 6 && this.codePostalValide) {
      return inputsValide;
    }
  
    if (this.pays === 'US' && this.zip.length === 5) {
      return inputsValide;
    }
  
    return false;
  }

  constructor(private router: Router) { }
  
  onSubmit(form: NgForm) {
    if (form.valid && this.password === this.confirmPassword) {
      this.router.navigate(['/mytime']);
      const utilisateur = `${this.prenom} ${this.nom}`;
    } else {
      console.log('Formulaire invalide');
    }
  }
  @Output() utilisateurCree = new EventEmitter<string>();

  
}