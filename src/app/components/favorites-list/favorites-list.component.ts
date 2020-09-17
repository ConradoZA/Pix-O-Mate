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
    // @Inject(MAT_DIALOG_DATA) public detail,
    private favoritesServices: FavoritesService
  ) {}

  ngOnInit(): void {}
}
