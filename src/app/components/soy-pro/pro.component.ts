import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';
import { MatDialog } from '@angular/material/dialog';
import { OwnerDetailComponent } from '../owner-detail/owner-detail.component';
import { CommentsComponent } from '../comments/comments.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss'],
})
export class SoyProComponent implements OnInit, OnDestroy {
  constructor(
    private ownersService: OwnersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listSubscription = this.ownersService.listCanged.subscribe((data) =>
      this.search.length > 1
        ? (this.list = [].concat(...this.ownersService.getSearchList()))
        : (this.list = [].concat(...this.ownersService.getOwnersList()))
    );
    this.addOwners();
  }
  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  list: Array<any> = [];
  listSubscription: Subscription;
  page: number = 1;
  search: string = '';
  lastSearch: string = '';
  detailOwner: Object = {};

  searchOwner = (): void => {
    if (this.search.length > 1) {
      if (this.lastSearch !== this.search) {
        this.lastSearch = this.search;
        this.page = 1;
      }
      this.ownersService.setSearch(this.search);
      this.ownersService.getSearch(this.page);
    } else if (this.search.length === 0 && this.lastSearch !== this.search) {
      this.search = '';
      this.page = 1;
      this.addOwners();
    }
  };
  typingListener = (): void => {
    const notTyping = this.search;
    setTimeout(() => {
      if (notTyping === this.search) {
        this.searchOwner();
      }
    }, 2000);
  };

  onScroll(event) {
    const tableViewHeight = event.target.offsetHeight;
    const tableScrollHeight = event.target.scrollHeight;
    const scrollLocation = event.target.scrollTop;
    const limit = tableViewHeight + scrollLocation;

    if (tableScrollHeight === limit) {
      this.page++;
      if (this.search.length > 1) {
        this.searchOwner();
      } else {
        this.addOwners();
      }
    }
  }

  addOwners = (): void => {
    this.ownersService.getOwners(this.page);
  };

  openDialog = (id: number): void => {
    this.detailOwner = this.list.filter((owner) => owner['id'] === id)[0];
    const dialogRef = this.dialog.open(OwnerDetailComponent, {
      data: this.detailOwner,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.detailOwner = {};
    });
  };
  openComments = (id: number): void => {
    this.ownersService.getComments(id);
    this.dialog.open(CommentsComponent, { data: { id } });
  };
}
