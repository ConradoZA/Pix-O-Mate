import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnersService } from '../../services/owners.service';
import { FavoritesService } from '../../services/favorites.service';
import { MatDialog } from '@angular/material/dialog';
import { FavoritesListComponent } from '../favorites-list/favorites-list.component';
import { WhatCatsThinkComponent } from '../what-cats-think/what-cats-think.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private ownersServices: OwnersService,
    private favoritesService: FavoritesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ownersServices.kittiesChanged.subscribe((data) => {
      this.catsKilled = data;
    });
    this.favoritesService.favChanged.subscribe((data) => {
      this.favourites = data;
    });
  }
  // Variables declaration
  catsKilled: number = this.ownersServices.killedKitties;
  favourites: number = this.favoritesService.favNr;
  href: string = '';

  // Functions
  getPageName = (): string => {
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
  };

  toHome = () => {
    this.router.navigate(['']);
  };

  openFavoritesList = (): void => {
    this.dialog.open(FavoritesListComponent);
  };
  openPoorCat = (): void => {
    this.dialog.open(WhatCatsThinkComponent);
  };
}
