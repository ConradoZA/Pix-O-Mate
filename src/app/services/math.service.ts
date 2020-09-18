import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  constructor() {}

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

  randomAvatar = (): string => {
    const number = Math.random();
    if (number > 0.5) return 'assets/img/kitten_face.png';
    else return 'assets/img/kitt-kat.png';
  };
}
