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
    // this.searchResults = this.ownersServices.getOwners();
    this.maxPages = this.ownersServices.maxPages;
  }

  searchResults: Object = {};
  search: string = '';
  maxPages: number;

  // searchOwner() {
  //   if (this.search.length > 1) {
  //     this.searchResults = this.allOwners.filter((owner) =>
  //       owner['name'].includes(this.search)
  //     );
  //     this.search = '';
  //     this.maxPages = Math.ceil(this.searchResults.length / 20);
  //   }
  // }
  searchOwner() {
    if (this.search.length > 1) {
      this.searchResults = this.ownersServices.getSearch(this.search);
      this.search = '';
      this.maxPages = this.ownersServices.searchPages;
    }
  }
}
