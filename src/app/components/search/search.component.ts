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
    this.allOwners = this.ownersServices.getOwners();
  }

  searchResults: Array<{}> = [];
  allOwners: Array<{}>;
  search: string = '';
  maxPages: number;

  searchOwner() {
    if (this.search.length > 1) {
      this.searchResults = this.allOwners.filter((owner) =>
        owner['name'].includes(this.search)
      );
      this.search = '';
      this.maxPages = Math.ceil(this.searchResults.length / 20);
    }
  }
}
