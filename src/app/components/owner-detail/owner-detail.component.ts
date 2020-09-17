import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss'],
})
export class OwnerDetailComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.favoritesList = this.ownersServices.getFavoritesList();
    this.statusSbscription = this.ownersServices.statusChanged.subscribe(
      (data) => {
        this.status = data;
      }
    );
    this.calculateDifference();
  }
  ngOnChanges(): void {
    this.ownersServices.getUpdatedStatus(this.detail['id']);
  }
  ngOnDestroy(): void {
    this.statusSbscription.unsubscribe();
  }

  @Input() detail: Object;
  @Input() onCloseDetail: () => {};
  favoritesList: Array<any> = [];
  checkFavList: boolean;
  status: string = this.ownersServices.status;
  statusSbscription: Subscription;
  years: number;
  months: number;
  days: number;

  existsInFavList(id: number) {
    this.checkFavList = this.favoritesList
      .map((owner) => (owner['id'] === id ? true : false))
      .includes(true);
    return this.checkFavList;
  }
  checkStatus = (): void => {
    console.log(this.status);
    this.detail['status'] = this.status;
  };
  calculateDifference = (): void => {
    const created = new Date(this.detail['created_at']);
    console.log(created);
    const now = new Date();
    console.log(now);
    this.years = now.getFullYear() - created.getFullYear();
    this.months = now.getMonth() - created.getMonth();
    this.days = now.getDate() - created.getDate();
  };

  onAddFav(owner: Object): void {
    this.ownersServices.addFavorite(owner);
  }
  onReduceFav(id: number): void {
    this.ownersServices.reduceFavorite(id);
    this.favoritesList = this.ownersServices.getFavoritesList();
  }
}
