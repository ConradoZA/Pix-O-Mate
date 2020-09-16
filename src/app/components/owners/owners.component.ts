import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
})
export class OwnersComponent implements OnInit {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {}

  owners: Array<{}> = this.ownersServices.getOwners();
  maxPages: number = this.ownersServices.pages;
}
