import { Component, OnChanges, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss'],
})
export class OwnersListComponent implements OnInit {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.ownersServices.ownersChanged.subscribe((data) => (this.owners = data));
    this.ownersServices.maxPagesChanged.subscribe(
      (data) => (this.maxPages = data)
    );
    this.getOwnersPage();
  }
  // ngOnChanges() {
  //   this.populateList();
  // }

  owners: Array<any> = this.ownersServices.ownersList;
  maxPages: number = this.ownersServices.maxPages;
  list: Array<{}> = [];
  page: number = 1;
  items: number = 20;
  startingPoint: number = 0;
  showDetail: boolean = false;
  detailOwner: Object = {};
  id: number;
  checkFavList: Array<any> = [];

  getOwnersPage = (): void => {
    this.ownersServices.getOwners(this.page);
  };
  prevPage = (): void => {
    if (this.page - 1 >= 1) {
      this.page -= 1;
      this.getOwnersPage();
    }
  };
  nextPage = (): void => {
    if (this.page + 1 < this.maxPages) {
      this.page += 1;
      this.getOwnersPage();
    }
  };

  onShowDetail(id: number): void {
    this.detailOwner = this.owners[this.page - 1].filter(
      (owner) => owner['id'] === id
    )[0];
    this.showDetail = true;
  }
  onCloseDetail = (): void => {
    this.showDetail = false;
    this.detailOwner = {};
  };
}
