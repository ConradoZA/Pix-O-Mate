import { Component, Input, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss'],
})
export class OwnerDetailComponent implements OnInit {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.favoritesList = this.ownersServices.getFavoritesList();
  }

  @Input() detail: Object;
  @Input() onCloseDetail: () => {};
  favoritesList: Array<any> = [];
  checkFavList: boolean;

  existsInFavList(id: number) {
    this.checkFavList = this.favoritesList
      .map((owner) => (owner['id'] === id ? true : false))
      .includes(true);
    return this.checkFavList;
  }
  onAddFav(owner: Object): void {
    this.ownersServices.addFavorite(owner);
  }
  onReduceFav(id: number): void {
    this.ownersServices.reduceFavorite(id);
    this.favoritesList = this.ownersServices.getFavoritesList();
  }
}
