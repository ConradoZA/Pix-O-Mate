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

  private token: string = API_TOKEN;

  private DATE_KEY: string = 'download-date';
  private OWNERS_KEY: string = 'owners';
  private CALLS_KEY: string = 'killedKitties';
  private MAX_KEY: string = 'maxPages';
  private FAV_KEY: string = 'favNr';
  private FAVLIST_KEY: string = 'favList';

  private owners: Array<{}> = this.localStorage.get(this.OWNERS_KEY) || [];
  private lastDownload = new Date(this.localStorage.get(this.DATE_KEY) || 1970);
  public killedKitties: number = this.localStorage.get(this.CALLS_KEY) || 0;
  public pages: number =
    this.localStorage.get(this.MAX_KEY) || this.killedKitties;
  public favoritesNumber: number = this.localStorage.get(this.FAV_KEY) || 0;
  private favoritesList: Array<{}> =
    this.localStorage.get(this.FAVLIST_KEY) || [];

  private date;
  public kittiesChanged = new Subject<number>();
  public favoritesChanged = new Subject<number>();

  differentYear(): boolean {
    return this.lastDownload.getFullYear() < this.date.getFullYear();
  }
  differentMonth(): boolean {
    return this.lastDownload.getMonth() < this.date.getMonth();
  }
  differentWeek(): boolean {
    return this.lastDownload.getDate() - this.date.getDate() >= 7;
  }
  beforeMonday(): boolean {
    return (
      (this.lastDownload.getDay() === 0 || this.lastDownload.getDay() > 4) &&
      this.date.getDay() > 1
    );
  }
  betweenTuesdayAndThursday(): boolean {
    return (
      this.lastDownload.getDay() <= 4 &&
      this.lastDownload.getDay() > 1 &&
      this.date.getDay() > 4
    );
  }
  addFavorite(owner: Object): void {
    this.favoritesNumber++;
    this.favoritesList.push(owner);
    this.localStorage.set(this.FAV_KEY, this.favoritesNumber);
    this.localStorage.set(this.FAVLIST_KEY, this.favoritesList);
    this.favoritesChanged.next(this.favoritesNumber);
  }
  reduceFavorite(id: number): void {
    this.favoritesList = this.favoritesList.filter(
      (owner) => owner['id'] !== id
    );
    this.localStorage.set(this.FAVLIST_KEY, this.favoritesList);
    this.favoritesNumber--;
    this.localStorage.set(this.FAV_KEY, this.favoritesNumber);
    this.favoritesChanged.next(this.favoritesNumber);
  }
  getFavoritesList(): Array<{}> {
    return this.favoritesList;
  }
  getOwners(): Array<{}> {
    return this.owners;
  }

  getAllOwners(): void {
    this.date = new Date();

    if (
      this.differentYear() ||
      this.differentMonth() ||
      this.differentWeek() ||
      this.beforeMonday() ||
      this.betweenTuesdayAndThursday()
    ) {
      console.log('hay que descargar');
      this.http
        .get('https://gorest.co.in/public-api/users', {
          headers: {
            authorization: this.token,
          },
        })
        .subscribe((res) => {
          this.pages = res['meta'].pagination.pages;
          this.owners.push(...res['data']);
          this.killedKitties++;
          for (let i = 2; i <= this.pages; i++) {
            this.http
              .get(`https://gorest.co.in/public-api/users?page=${i}`, {
                headers: {
                  authorization: this.token,
                },
              })
              .subscribe((res) => {
                this.owners.push(...res['data']);
                this.killedKitties++;
                this.localStorage.set(this.OWNERS_KEY, this.owners);
                this.localStorage.set(this.CALLS_KEY, this.killedKitties);
                this.localStorage.set(this.DATE_KEY, new Date());
                this.localStorage.set(this.MAX_KEY, this.pages);
                this.kittiesChanged.next(this.killedKitties);
              });
          }
        });
    }
  }
}
