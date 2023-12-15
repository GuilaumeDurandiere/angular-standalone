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
      label: 'Accueil',
      routerLink: ['/dashboard']
    },
    {
      label: 'affaires',
      routerLink: ['/business']
    },
    {
      label: 'Documentations',
      routerLink: ['/documentation']
    },
    {
      label: 'Liens utiles',
      routerLink: ['/link']
    },
    {
      label: 'Information et service',
      routerLink: ['/contact']
    },
    {
      label: 'Demande d\'affaire',
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
