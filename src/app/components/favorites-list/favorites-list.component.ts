import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FavoritesService } from '../../services/favorites.service';
import { HeaderComponent } from '../header/header.component';
import { OwnerDetailComponent } from '../owner-detail/owner-detail.component';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    private favoritesServices: FavoritesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.favoritesList = this.favoritesServices.getFavoritesList();
  }

  favoritesList: Array<any> = [];

  onDelete = (id: number): void => {
    this.favoritesServices.reduceFavorite(id);
    this.favoritesList = this.favoritesServices.getFavoritesList();
  };

  openDetails = (id: number) => {
    const detailOwner = this.favoritesList
    .filter((owner) => owner['id'] === id)[0];

    const detailRef = this.dialog
    .open(OwnerDetailComponent, {data: detailOwner});

    detailRef.afterClosed().subscribe((result) => {
      this.favoritesList = this.favoritesServices.getFavoritesList();
    });
  };
}
