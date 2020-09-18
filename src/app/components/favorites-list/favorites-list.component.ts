import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FavoritesService } from '../../services/favorites.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    private favoritesServices: FavoritesService
  ) {}

  ngOnInit(): void {
    this.favoritesList = this.favoritesServices.getFavoritesList();
  }

  favoritesList: Array<any> = [];

  onDelete = (id: number): void => {
    this.favoritesServices.reduceFavorite(id);
    this.favoritesList = this.favoritesServices.getFavoritesList();
  };
}
