import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AvatarModule,
    BadgeModule,
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule,
    TabMenuModule,
    ToolbarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: $localize`:@@HOME_NAVBAR:Accueil`.toUpperCase(),
      routerLink: ['/dashboard']
    },
    {
      label: $localize`:@@BUSINESS_NAVBAR:Affaires`.toUpperCase(),
      routerLink: ['/business']
    },
    {
      label: $localize`:@@DOCUMENTATION_NAVBAR:Documentation`.toUpperCase(),
      routerLink: ['/documentation']
    },
    {
      label: $localize`:@@LINKS_NAVBAR:Liens utiles`.toUpperCase(),
      routerLink: ['/link']
    },
    {
      label: $localize`:@@INFORMATION_NAVBAR:Informations et services`.toUpperCase(),
      routerLink: ['/contact']
    },
    {
      label: $localize`:@@ADMINISTRATION_NAVBAR:Administration`.toUpperCase(),
      routerLink: ['/administration']
    }
  ];

  notifications: MenuItem[] = [
    {
      label: 'Notification 1',
    },
    {
      label: 'Notification 2',
    }
  ];

  profileMenu: MenuItem[] = [
    {
      label: $localize`:@@INFORMATION:Informations`,
    },
    {
      label: $localize`:@@DECONNECTION:Déconnexion`,
    }
  ];
}
