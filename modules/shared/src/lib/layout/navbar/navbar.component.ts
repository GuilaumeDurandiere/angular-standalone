import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
})
export class NavbarComponent {

  items: MenuItem[] = [
    {
      label: $localize`:@@ACCUEIL_NAVBAR:Accueil`,
      routerLink: ['/dashboard']
    },
    {
      label: $localize`:@@AFFAIRES_NAVBAR:Affaires`,
      routerLink: ['/business']
    },
    {
      label: $localize`:@@DOCUMENTATIONS_NAVBAR:Documentations`,
      routerLink: ['/documentation']
    },
    {
      label: $localize`:@@LIENS_NAVBAR:Liens utiles`,
      routerLink: ['/link']
    },
    {
      label: $localize`:@@INFORMATIONS_NAVBAR:Informations et services`,
      routerLink: ['/contact']
    },
    {
      label: $localize`:@@DEMANDE_AFFAIRE_NAVBAR:Demande d'affaire`,
      routerLink: ['/business-request']
    },
    {
      icon: 'pi pi-bell'
    },
    {
      label: 'Nom_prenom',
      routerLink: ['/profile']
    }
  ];
}
