import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss']
})
export class OwnersListComponent implements OnInit {
  constructor(private ownersServices: OwnersService) {}
  onClick() {
    this.ownersServices.getAllOwners();
  }
  ngOnInit(): void {}
}
