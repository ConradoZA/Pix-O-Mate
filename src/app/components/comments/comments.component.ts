import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwnersService } from '../../services/owners.service';
import { OwnersListComponent } from '../owners-list/owners-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<OwnersListComponent>,
    @Inject(MAT_DIALOG_DATA) public idData,
    private ownersService: OwnersService
  ) {}

  ngOnInit(): void {
    this.commentsSubscription = this.ownersService.commentsChanged.subscribe(
      (data) => {
        this.commentsList = data[1];
        this.avatar = data[0];
      }
    );
    if (this.idData.id in this.ownersService.commentsList) {
      this.commentsList = this.ownersService.commentsList[this.idData.id][1];
      this.avatar = this.ownersService.commentsList[this.idData.id][0];
    } else {
      this.commentsList = [];
      this.avatar = '';
    }
  }
  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }

  public commentsList: Array<any>;
  public avatar: string;
  public commentsSubscription: Subscription;
}
