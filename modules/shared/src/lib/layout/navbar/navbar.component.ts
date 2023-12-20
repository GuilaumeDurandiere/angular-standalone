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
      label: $localize`:@@HOME_NAVBAR:Accueil`,
      routerLink: ['/dashboard']
    },
    {
      label: $localize`:@@BUSINESS_NAVBAR:Affaires`,
      routerLink: ['/business']
    },
    {
      label: $localize`:@@DOCUMENTATION_NAVBAR:Documentation`,
      routerLink: ['/documentation']
    },
    {
      label: $localize`:@@LINKS_NAVBAR:Liens utiles`,
      routerLink: ['/link']
    },
    {
      label: $localize`:@@INFORMATION_NAVBAR:Informations et services`,
      routerLink: ['/contact']
    },
    {
      label: $localize`:@@NEW_BUSINESS_NAVBAR:Demande d'affaire`,
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
