import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OwnersService } from '../../services/owners.service';
import { OwnersListComponent } from '../owners-list/owners-list.component';
import { Subscription } from 'rxjs';
import { MathService } from '../../services/math.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<OwnersListComponent>,
    private ownersService: OwnersService,
    private mathService: MathService
  ) {}

  ngOnInit(): void {
    this.commentsSubscription = this.ownersService.commentsChanged.subscribe(
      (data) => (this.commentsList = data)
    );
  }
  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }

  public commentsList: Array<any> = this.ownersService.commentsList;
  public commentsSubscription: Subscription;
  public avatar = this.mathService.randomAvatar();
}
