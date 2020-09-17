import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
})
export class OwnersComponent implements OnInit, OnDestroy {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.pagesSubscription = this.ownersServices.maxPagesChanged.subscribe(
      (data) => (this.maxPages = data)
    );
  }
  ngOnDestroy(): void {
    this.pagesSubscription.unsubscribe();
  }

  pagesSubscription: Subscription;
  maxPages: number = 1;
  page: number = 1;
}
