import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_TOKEN } from 'src/app/settings/api-token';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  constructor(
    public http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage: StorageService
  ) {}

  // Variables declaration
  private token: string = API_TOKEN;

  public ownersList: Array<any> = [];
  public ownersChanged = new Subject<Array<{}>>();

  public searchList: Array<{}> = [];
  private lastSearch: string = '';
  public searchPages: number = 0;

  private FAVLIST_KEY: string = 'favList';
  private favList: Array<{}> = this.localStorage.get(this.FAVLIST_KEY) || [];

  private FAV_KEY: string = 'favNr';
  public favNr: number =
    this.localStorage.get(this.FAV_KEY) || this.favList.length;
  public favChanged = new Subject<number>();

  private CALLS_KEY: string = 'killedKitties';
  public killedKitties: number = this.localStorage.get(this.CALLS_KEY) || 0;
  public kittiesChanged = new Subject<number>();

  private MAX_KEY: string = 'maxPages';
  public maxPages: number =
    this.localStorage.get(this.MAX_KEY) || this.ownersList.length;
  public maxPagesChanged = new Subject<number>();

  public status: string = '';
  public statusChanged = new Subject<string>();

  // Functions
  getOwners = (page: number = 1): void => {
    if (!this.ownersList[page - 1]) {
      this.http
        .get(`https://gorest.co.in/public-api/users?page=${page}`, {
          headers: {
            authorization: this.token,
          },
        })
        .subscribe((res) => {
          this.ownersList[page - 1] = res['data'];
          this.ownersChanged.next(this.ownersList);
          this.maxPages = res['meta'].pagination.pages;
          this.localStorage.set(this.MAX_KEY, this.maxPages);
          this.maxPagesChanged.next(this.maxPages);
          this.killOneKittie();
        });
    }
  };
  getSearch = (name: string, page: number = 1): Object => {
    if (this.lastSearch !== name) {
      this.searchList = [];
      // this.searchPages = 0;
      this.lastSearch = name;
    }
    if (!this.searchList[page]) {
      this.http
        .get(
          `https://gorest.co.in/public-api/users?name=${name}&page=${page}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
        .subscribe((res) => {
          const index = res['meta'].pagination.page;
          this.searchList[index] = res['data'];
          this.searchPages = res['meta'].pagination.pages;
          this.killOneKittie();
          return this.ownersList[page];
        });
    }
    return this.ownersList[page];
  };
  getUpdatedStatus = (id: number): void => {
    // for (let i = 0; i < this.maxPages; i++) {
    //   const pageArray = this.ownersList[i];
    //   const alreadyExist = pageArray.filter((owner) => {
    //     owner['id'] === id;
    //   });
    //   if (alreadyExist.length > 0) return alreadyExist[0];
    // }
    this.status = '';
    this.http
      .get(`https://gorest.co.in/public-api/users/${id}`, {
        headers: {
          authorization: this.token,
        },
      })
      .subscribe((res) => {
        this.killOneKittie();
        this.statusChanged.next(res['data']['status']);
      });
  };

  updateFavNr = (): void => {
    this.favNr = this.favList.length;
    this.localStorage.set(this.FAV_KEY, this.favNr);
    this.favChanged.next(this.favNr);
  };
  killOneKittie = (): void => {
    this.killedKitties++;
    this.kittiesChanged.next(this.killedKitties);
  };

  getFavoritesList = (): Array<{}> => {
    return this.favList;
  };
  addFavorite(owner: Object): void {
    this.favList.push(owner);
    this.localStorage.set(this.FAVLIST_KEY, this.favList);
    this.updateFavNr();
  }
  reduceFavorite(id: number): void {
    this.favList = this.favList.filter((owner) => owner['id'] !== id);
    this.localStorage.set(this.FAVLIST_KEY, this.favList);
    this.updateFavNr();
  }
}
