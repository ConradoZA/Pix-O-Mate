import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  catsKilled: number = this.ownersServices.killedKitties;
  favourites: number = this.ownersServices.favoritesNumber;
  href: string = '';

  getPageName() {
    this.href = this.router.url;
    switch (this.href) {
      case '/owners':
        return 'Dueños';
      case '/search':
        return 'Búsqueda';
      case '/pro':
        return 'Soy Pro';
      default:
        return 'Pix-O-Mate';
    }
  }

  constructor(private router: Router, private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.ownersServices.getAllOwners();
    this.ownersServices.kittiesChanged.subscribe((data) => {
      this.catsKilled = data;
    });
    this.ownersServices.favoritesChanged.subscribe((data) => {
      this.favourites = data;
    });
  }
}