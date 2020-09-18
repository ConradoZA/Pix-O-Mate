import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';
import { OwnerDetailComponent } from '../owner-detail/owner-detail.component';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss'],
})
export class OwnersListComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private ownersServices: OwnersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageSubscription = this.ownersServices.maxPagesChanged.subscribe(
      (data) => (this.maxPages = data)
    );
    this.searchPagesSubscription = this.ownersServices.maxSearchPagesChanged.subscribe(
      (data) => (this.maxPages = data)
    );
    this.listSubscription = this.ownersServices.listCanged.subscribe(
      (data) => (this.list = data)
    );
  }
  ngAfterViewInit(): void {
    this.getOwnersPage();
  }
  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
    this.searchPagesSubscription.unsubscribe();
  }

  // Variables declaration
  maxPages: number = 1;
  page: number = 1;
  pageSubscription: Subscription;
  listSubscription: Subscription;
  searchPagesSubscription: Subscription;
  showDetail: boolean = false;
  detailOwner: Object = {};
  list: Array<any> = [];

  //Functions
  getOwnersPage = (): void => {
    const url = this.router.url;
    if (url === '/pro') {
      //
    } else if (url === '/search' && this.ownersServices.searchPages > 0) {
      this.maxPages = this.ownersServices.searchPages;
      this.ownersServices.getSearch(this.page);
    } else {
      this.ownersServices.getOwners(this.page);
    }
  };
  prevPage = (): void => {
    if (this.page - 1 >= 1) {
      this.page -= 1;
      this.getOwnersPage();
    }
  };
  nextPage = (): void => {
    if (this.page + 1 <= this.maxPages) {
      this.page += 1;
      this.getOwnersPage();
    }
  };

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(OwnerDetailComponent, {
      data: this.list.filter((owner) => owner['id'] === id)[0],
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.detailOwner = {};
    });
  }
  openComments = (id: number): void => {
    this.ownersServices.getComments(id);
    this.dialog.open(CommentsComponent);
  };
}
