import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { FavoritesService } from '../../services/favorites.service';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-what-cats-think',
  templateUrl: './what-cats-think.component.html',
  styleUrls: ['./what-cats-think.component.scss'],
})
export class WhatCatsThinkComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    private ownersService: OwnersService
  ) {}

  ngOnInit(): void {
    this.killed = this.ownersService.killedKitties;
  }

  killed: number;
}
