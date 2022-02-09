import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {UserInfoInterface} from "../interfaces/user-info";

@Injectable()
export class ListUsersApiService {

  private baseUrl: string = `http://api.jsdelivr.com/v1/jsdelivr/libraries`


  constructor(
    public http: HttpClient
  ) {

  }

  //квері параметр 'page' не працює , тому робив пагінацію через збільшення 'limit'

  private static createUrl(limit: number, baseUrl: string, name?: string) {
    return name ? baseUrl + `?name=${name}&fields=name,description,homepage,github,author` : baseUrl + `?limit=${limit}&fields=name,description,homepage,github,author`
  }

  getUsers(limit: number, name?: string): Observable<UserInfoInterface<string>[]> {
    const url = ListUsersApiService.createUrl(limit, this.baseUrl, name)
    return this.http.get<UserInfoInterface<string>[]>(url).pipe(
      tap(res => {
        console.log(res)
      }),
      map(res => {
        return res.slice(res.length - 10, res.length)
      })
    )
  }


}
