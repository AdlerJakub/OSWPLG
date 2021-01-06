import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dish} from './dish.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishesListService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<any>('/dishes/').pipe(
      map((res) => {
        return res.results;
      })
    );
  }

}
