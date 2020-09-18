import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) {}

  // Variables declaration
  private FAVLIST_KEY: string = 'favList';
  private favList: Array<{}> = this.localStorage.get(this.FAVLIST_KEY) || [];
  private FAV_KEY: string = 'favNr';
  public favNr: number =
    this.localStorage.get(this.FAV_KEY) || this.favList.length;
  public favChanged = new Subject<number>();

  // Functions
  updateFavNr = (): void => {
    this.favNr = this.favList.length;
    this.localStorage.set(this.FAV_KEY, this.favNr);
    this.favChanged.next(this.favNr);
  };

  getFavoritesList = (): Array<{}> => {
    return this.favList;
  };
  addFavorite = (owner: Object): void => {
    this.favList.push(owner);
    this.localStorage.set(this.FAVLIST_KEY, this.favList);
    this.updateFavNr();
  };

  reduceFavorite = (id: number): void => {
    this.favList = this.favList.filter((owner) => owner['id'] !== id);
    this.localStorage.set(this.FAVLIST_KEY, this.favList);
    this.updateFavNr();
  };
}
