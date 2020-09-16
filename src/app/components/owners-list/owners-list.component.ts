import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss'],
})
export class OwnersListComponent implements OnInit, OnChanges {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.populateList();
  }
  ngOnChanges() {
    this.populateList();
  }

  @Input() owners: Array<{}>;
  @Input() maxPages: number;
  list: Array<{}> = [];
  page: number = 1;
  items: number = 20;
  startingPoint: number = 0;
  showDetail: boolean = false;
  detailOwner: Object = {};
  id: number;
  checkFavList: Array<any> = [];

  populateList(): void {
    this.startingPoint = this.items * (this.page - 1);
    this.list = [];
    if (
      this.owners.length < this.items ||
      (this.owners.length % 20 < this.items && this.page === this.maxPages)
    ) {
      for (let i = this.startingPoint; i < this.owners.length; i++) {
        if (this.owners.length > 0) this.list.push(this.owners[i]);
      }
    } else {
      for (let i = this.startingPoint; i < this.items * this.page; i++) {
        this.list.push(this.owners[i]);
      }
    }
  }
  prevPage(): void {
    this.page -= 1;
    this.populateList();
  }
  nextPage(): void {
    this.page += 1;
    this.populateList();
  }
  onShowDetail(id: number, index: number): void {
    this.showDetail = true;
    this.detailOwner = this.list[index];
  }
  onCloseDetail = (): void => {
    this.showDetail = false;
    this.detailOwner = {};
  };
}
