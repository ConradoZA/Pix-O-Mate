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
  }
  ngOnChanges(): void {
    this.ownersServices.getUpdatedStatus(this.detail['id']);
    this.calculateDifference();
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
  today: Date = new Date();

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
    this.years = this.today.getFullYear() - created.getFullYear();
    this.months = this.today.getMonth() - created.getMonth();
    this.days = this.today.getDate() - created.getDate();
  };

  onAddFav(owner: Object): void {
    this.ownersServices.addFavorite(owner);
  }
  onReduceFav(id: number): void {
    this.ownersServices.reduceFavorite(id);
    this.favoritesList = this.ownersServices.getFavoritesList();
  }
}
