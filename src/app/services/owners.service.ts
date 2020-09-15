import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_TOKEN } from 'src/app/settings/api-token';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  DATE_KEY: string = 'download-date';
  OWNERS_KEY: string = 'owners';
  CALLS_KEY: string = 'killedKitties';
  date;
  pages: number;
  token: string = API_TOKEN;
  owners: Array<any> = this.localStorage.get(this.OWNERS_KEY) || [];
  lastDownload = new Date(this.localStorage.get(this.DATE_KEY) || 1970);
  killedKitties: number = this.localStorage.get(this.CALLS_KEY) || 0;

  differentYear(): boolean {
    console.log(this.lastDownload, this.date);
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

  constructor(
    public http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage: StorageService
  ) {}

  getAllOwners(): void {
    this.date = new Date();

    if (
      !this.lastDownload ||
      (this.lastDownload &&
        (this.differentYear() ||
          this.differentMonth() ||
          this.differentWeek() ||
          this.beforeMonday() ||
          this.betweenTuesdayAndThursday()))
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
              });
          }
        });
    }
  }
}
