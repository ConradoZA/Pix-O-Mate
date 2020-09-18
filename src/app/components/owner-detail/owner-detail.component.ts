import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnersService } from '../../services/owners.service';
import { FavoritesService } from '../../services/favorites.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwnersListComponent } from '../owners-list/owners-list.component';
import { MathService } from '../../services/math.service';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss'],
})
export class OwnerDetailComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<OwnersListComponent>,
    @Inject(MAT_DIALOG_DATA) public detail,
    private favoritesServices: FavoritesService,
    private ownersServices: OwnersService,
    private mathService: MathService
  ) {}

  ngOnInit(): void {
    this.favoritesList = this.favoritesServices.getFavoritesList();
    this.statusSbscription = this.ownersServices.statusChanged.subscribe(
      (data) => {
        this.status = data;
      }
    );
    this.updateStatus();
    this.calculateDifference();
  }
  ngOnDestroy(): void {
    this.statusSbscription.unsubscribe();
  }

  favoritesList: Array<any> = [];
  checkFavList: boolean;
  status: string = this.ownersServices.status;
  statusSbscription: Subscription;
  years: number;
  months: number;
  days: number;
  hours: number;
  today: Date = new Date();
  maleCat: string = this.mathService.randomMale();
  femaleCat: string = this.mathService.randomFemale();

  existsInFavList(id: number) {
    this.checkFavList = this.favoritesList
      .map((owner) => (owner['id'] === id ? true : false))
      .includes(true);
    return this.checkFavList;
  }
  updateStatus = (): void => {
    this.ownersServices.getUpdatedStatus(this.detail['id']);
  };
  calculateDifference = (): void => {
    const created = new Date(this.detail['created_at']);
    this.years = this.today.getFullYear() - created.getFullYear();
    this.months = this.today.getMonth() - created.getMonth();
    this.days = this.today.getDate() - created.getDate();
    this.hours = this.today.getHours() - created.getHours();
  };

  onAddFav(owner: Object): void {
    this.favoritesServices.addFavorite(owner);
  }
  onReduceFav(id: number): void {
    this.favoritesServices.reduceFavorite(id);
    this.favoritesList = this.favoritesServices.getFavoritesList();
  }

  onClose = (): void => {
    this.dialogRef.close();
  };
}
