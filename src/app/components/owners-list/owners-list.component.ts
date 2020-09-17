import { Component, OnChanges, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss'],
})
export class OwnersListComponent implements OnInit, OnChanges {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.ownersServices.ownersChanged.subscribe((data) => (this.owners = data));
    this.ownersServices.maxPagesChanged.subscribe(
      (data) => (this.maxPages = data)
    );
    this.populateList();
  }
  ngOnChanges() {
    this.populateList();
  }

  owners: Array<{}> = this.ownersServices.ownersList;
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

  // populateList(): void {
  //   this.startingPoint = this.items * (this.page - 1);
  //   this.list = [];
  //   if (
  //     length < this.items ||
  //     (length % 20 < this.items && this.page === this.maxPages)
  //   ) {
  //     for (let i = this.startingPoint; i < length; i++) {
  //       if (length > 0) this.list.push(this.owners[i]);
  //     }
  //   } else {
  //     for (let i = this.startingPoint; i < this.items * this.page; i++) {
  //       this.list.push(this.owners[i]);
  //     }
  //   }
  // }
  populateList(): void {
    this.ownersServices.getOwners(this.page);
    console.log(this.owners, this.page);
    console.log(this.owners[this.page - 1]);
    // this.list = this.owners[this.page-1];
    // if (
    //   length < this.items ||
    //   (length % 20 < this.items && this.page === this.maxPages)
    // ) {
    //   for (let i = this.startingPoint; i < length; i++) {
    //     if (length > 0) this.list.push(this.owners[i]);
    //   }
    // } else {
    //   for (let i = this.startingPoint; i < this.items * this.page; i++) {
    //     this.list.push(this.owners[i]);
    //   }
    // }
  }

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

  onShowDetail(id: number, index: number): void {
    this.showDetail = true;
    this.detailOwner = this.list[index];
  }
  onCloseDetail = (): void => {
    this.showDetail = false;
    this.detailOwner = {};
  };
}
