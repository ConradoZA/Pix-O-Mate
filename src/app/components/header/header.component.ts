import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  catsKilled: number = 0;
  favourites: number = 0;
  page: string = 'Pix-O-Mate';
  constructor() {}

  ngOnInit(): void {}
}
