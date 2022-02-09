import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ListUsersApiService} from "../../../shared/services/list-users-api.service";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
  tap
} from "rxjs";
import {UserInfoInterface, UserParensInterface} from "../../../shared/interfaces/user-info";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  cardList: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  public onSearch$ = new Subject<string>();
  private subscriptions: Subscription = new Subscription();
  private readonly loadUsersList$: BehaviorSubject<UserParensInterface> = new BehaviorSubject<UserParensInterface>({limit: 10});


  public usersList: UserInfoInterface<string>[] = []


  isShowPlaceholder: boolean = false;

  constructor(private usersApiService: ListUsersApiService) {
  }


  ngOnInit() {
    this.loadMenuItemList();
    this.onSearch()
  }

  public refreshUsersList(limit: number): void {
    this.loadUsersList$.next({limit});
  }

  private loadMenuItemList() {
    const $ = this.loadUsersList$
      .pipe(
        switchMap(params =>
          this.usersApiService.getUsers(params.limit).pipe(
            tap(res => {
              this.usersList = res
              console.log(res)
            })
          )
        )
      )
      .subscribe();
    this.subscriptions.add($);
  }


  public nextOnSearch(inputVel: string) {
    this.onSearch$.next(inputVel)
  }

  public onSearch() {
    const $ = this.onSearch$.pipe(
      map(inputVel => inputVel.toLocaleLowerCase()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(inputVel => this.usersApiService.getUsers(10, inputVel)),
      tap(res => {
        this.usersList = res
      })
    ).subscribe()
    this.subscriptions.add($);
  }

}
