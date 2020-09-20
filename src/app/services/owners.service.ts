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

  private KILLED_KEY = 'killKat';
  public killedKitties: number = this.localStorage.get(this.KILLED_KEY) || 0;
  public kittiesChanged = new Subject<number>();

  private STATUS_KEY = 'statusArray';
  private statusDetails: Array<any> =
    this.localStorage.get(this.STATUS_KEY) || [];
  public statusChanged = new Subject<string>();

  public commentsList: Array<any> = [];
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
          this.killOneKitten();
          this.listCanged.next(this.ownersList[index]);
        });
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
          this.killOneKitten();
          this.searchList[index] = res['data'];
          this.listCanged.next(this.searchList[index]);
        });
    }
    this.listCanged.next(this.searchList[index]);
  };
  getStatus = (id: number): void => {
    if (!this.statusDetails[id]) {
      this.updateStatus(id);
      return;
    }
    const today: number = new Date().getDay();
    const lastDownload: number = new Date(
      this.statusDetails[id]['lastInfo']
    ).getDay();
    const beforeMonday: boolean =
      (lastDownload === 0 || lastDownload > 4) && today > 1;
    const tuesdayToThursday: boolean =
      lastDownload <= 4 && lastDownload > 1 && today > 4;

    if (beforeMonday && tuesdayToThursday) {
      this.updateStatus(id);
    }
    this.statusChanged.next(this.statusDetails[id]);
  };
  private updateStatus = (id: number): void => {
    this.http
      .get(`https://gorest.co.in/public-api/users/${id}`, {
        headers: {
          authorization: this.token,
        },
      })
      .subscribe((res: Object) => {
        const date: Date = new Date();
        const gender: string = res['data']['gender'];
        let picture: string;
        if (gender === 'Male') picture = this.randomMale();
        else picture = this.randomFemale();
        this.statusDetails[id] = {
          lastInfo: date,
          img: picture,
          status: res['data']['status'],
        };
        this.localStorage.set(this.STATUS_KEY, this.statusDetails);
        this.killOneKitten();
        this.statusChanged.next(this.statusDetails[id]);
      });
  };

  setSearch = (query: string): void => {
    this.search = query;
  };

  killOneKitten = (): void => {
    this.killedKitties++;
    this.localStorage.set(this.KILLED_KEY, this.killedKitties);
    this.kittiesChanged.next(this.killedKitties);
  };

  getComments = (id: number): void => {
    if (!this.commentsList[id]) {
      this.http
        .get(`https://gorest.co.in/public-api/posts/${id}/comments`, {
          headers: {
            authorization: this.token,
          },
        })
        .subscribe((res) => {
          this.commentsList[id] = [this.newAvatar(), res['data']];
          this.commentsChanged.next(this.commentsList[id]);
          this.killOneKitten();
        });
    }
    this.commentsChanged.next(this.commentsList[id]);
  };

  randomMale = (): string => {
    const number = Math.random();
    if (number > 0.9) return 'assets/img/math-cat.jpg';
    else if (number > 0.7) return 'assets/img/cat1.jpg';
    else if (number > 0.4) return 'assets/img/cat3.jpg';
    else if (number > 0.1) return 'assets/img/cat5.jpg';
    else return 'assets/img/cat7.jpg';
  };
  randomFemale = (): string => {
    const number = Math.random();
    if (number > 0.9) return 'assets/img/math-cat.jpg';
    else if (number > 0.7) return 'assets/img/cat2.jpg';
    else if (number > 0.4) return 'assets/img/cat3.jpg';
    else if (number > 0.1) return 'assets/img/cat6.jpg';
    else return 'assets/img/cat8.jpg';
  };
  newAvatar = (): string => {
    const number = Math.random();
    if (number > 0.5) return 'assets/img/kitten_face.png';
    else return 'assets/img/kitt-kat.png';
  };

  getOwnersList = (): Array<[]> => {
    return this.ownersList;
  };
}
