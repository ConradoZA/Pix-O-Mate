import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private ownersServices: OwnersService) {}

  ngOnInit(): void {
    this.ownersServices.getOwners();
  }

  searchResults: Object = {};
  search: string = '';
  lastSearch: string = '';

  searchOwner() {
    if (this.search.length > 1) {
      this.ownersServices.setSearch(this.search);
      this.ownersServices.getSearch();
      this.search = '';
    }
  }
}
