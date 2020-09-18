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

  private ownersList: Array<any> = [];
  public maxPages: number = this.ownersList.length;
  public maxPagesChanged = new Subject<number>();
  public list: Array<any> = [];
  public listCanged = new Subject<Array<any>>();

  private searchList: Array<any> = [];
  private search: string = '';
  private lastSearch: string = '';
  public searchPages: number = 0;
  public maxSearchPagesChanged = new Subject<number>();

  private CALLS_KEY: string = 'killedKitties';
  public killedKitties: number = this.localStorage.get(this.CALLS_KEY) || 0;
  public kittiesChanged = new Subject<number>();

  public status: string = '';
  public statusChanged = new Subject<string>();

  public commentsList: Array<any> = [];
  private lastId: number;
  public commentsChanged = new Subject<Array<any>>();

  // Functions
  getOwners = (page: number = 1): void => {
    const index: number = page - 1;
    if (!this.ownersList[index]) {
      this.http
        .get(`https://gorest.co.in/public-api/users?page=${page}`, {
          headers: {
            authorization: this.token,
          },
        })
        .subscribe((res) => {
          this.ownersList[index] = res['data'];
          this.maxPages = res['meta'].pagination.pages;
          this.maxPagesChanged.next(this.maxPages);
          this.killOneKittie();
          this.listCanged.next(this.ownersList[index]);
        });
      return;
    }
    this.listCanged.next(this.ownersList[index]);
  };
  getSearch = (page: number = 1): void => {
    const index: number = page - 1;
    if (!this.searchList[index] || this.lastSearch !== this.search) {
      this.lastSearch = this.search;
      this.http
        .get(
          `https://gorest.co.in/public-api/users?name=${this.search}&page=${page}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
        .subscribe((res) => {
          this.searchPages = res['meta'].pagination.pages;
          this.maxSearchPagesChanged.next(this.searchPages);
          this.killOneKittie();
          this.searchList[index] = res['data'];
          this.listCanged.next(this.searchList[index]);
        });
      return;
    }
    this.listCanged.next(this.searchList[index]);
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

  setSearch = (query: string): void => {
    this.search = query;
  };

  killOneKittie = (): void => {
    this.killedKitties++;
    this.kittiesChanged.next(this.killedKitties);
  };

  getComments = (id: number): void => {
    if (this.lastId !== id) {
      this.lastId = id;
      this.http
        .get(`https://gorest.co.in/public-api/posts/${id}/comments`, {
          headers: {
            authorization: this.token,
          },
        })
        .subscribe((res) => {
          this.commentsList = res['data'];
          this.commentsChanged.next(this.commentsList);
          this.killOneKittie();
        });
    }
  };
}
