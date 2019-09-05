import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurescriptsProduct } from './product.model';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'surescripts-product-dropdown',
  templateUrl: './product-dropdown.component.html',
  styleUrls: ['./product-dropdown.component.scss']
})
export class ProductDropdownComponent implements OnInit {

  @Input()
  ssoBaseUrl: string;

  constructor(private http: HttpClient) { }

  products: Array<SurescriptsProduct>;

  ngOnInit() {
    if (!this.ssoBaseUrl) {
      throw new Error('"ssoBaseUrl" is required.');
    }

    this.ssoBaseUrl = this.ssoBaseUrl.replace(/\/+$/, '');
    this.http.get<Array<SurescriptsProduct>>(`${this.ssoBaseUrl}/app/v1/user/menu`,
        { withCredentials: true }).pipe(map(resp => {
          const url = window.location.href.toLowerCase();
          let selected = [];
          const response = resp.map(x => {
              if (x.children && x.children.length > 0) {
                selected = selected.concat(x.children.filter(y => y.link && url.startsWith(y.link.toLowerCase())));
              } else {
                if (url.startsWith(x.link && x.link.toLowerCase())) {
                  selected = selected.concat(x);
                }
              }
              return new SurescriptsProduct(x);
            });
          const longest = selected.length > 0 ? selected.reduce(function (a, b) { return a.link.length > b.link.length ? a : b; }) : null;

          return response.map(x => {
            if (longest) {
              if (x.children && x.children.length > 0) {
                  x.children.map(y => y.selected = y.text === longest.text && y.link === longest.link);
              }
              x.selected = x.text === longest.text && x.link === longest.link;
            }
            return x;
          });
        }), tap(resp => this.products = resp)).subscribe();
  }
}
