import { Injectable } from '@angular/core';
import * as distinctColors from 'distinct-colors';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  dc = distinctColors;
  constructor() { }

  getPalette(options: any) {
    return this.dc(options);
  }
}
