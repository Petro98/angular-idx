import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListUsersApiService} from "../../../../shared/services/list-users-api.service";
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  Subscription,
  switchMap,
  tap, timer
} from "rxjs";
import {UserInfoInterface, UserParensInterface} from "../../../../shared/interfaces/user-info";
import {ModalInfoUserComponent} from "../modals/modal-info-user/modal-info-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  public onSearch$ = new Subject<string>();
  private subscriptions: Subscription = new Subscription();
  private readonly loadUsersList$: BehaviorSubject<UserParensInterface> = new BehaviorSubject<UserParensInterface>({limit: 10});


  public usersList: UserInfoInterface<string>[] = []
  public limit: number = 10

  isSpinner: boolean = false;

  constructor(private usersApiService: ListUsersApiService,
              public dialog: MatDialog
  ) {
  }


  ngOnInit() {
    this.loadMenuItemList();
    this.onSearch()
  }

  public refreshUsersList(limit: number): void {
    this.limit = limit
    this.loadUsersList$.next({limit});
  }

  public nextOnSearch(inputVel: string) {
    this.onSearch$.next(inputVel)
  }


  private loadMenuItemList() {
    const $ = this.loadUsersList$
      .pipe(
        tap(res => this.isSpinner = true),
        switchMap(params =>
          this.usersApiService.getUsers(params.limit).pipe(
            tap(res => {
              if (res !== null)
                this.usersList = res

              this.isSpinner = false
            })
          )
        )
      )
      .subscribe({
        error: error => {
          alert('error');
          this.isSpinner = false
        }
      });
    this.subscriptions.add($);
  }

  private onSearch() {
    const $ = this.onSearch$.pipe(
      map(inputVel => inputVel.toLocaleLowerCase()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(inputVel => this.usersApiService.getUsers(10, inputVel)),
      tap(res => {
        if (res !== null)
          this.usersList = res
      })
    ).subscribe(
      {
        error: error => {
          alert('error');
          this.isSpinner = false
        }
      }
    )
    this.subscriptions.add($);
  }

  public openDialog(card: UserInfoInterface<string>) {
    const $ = timer(0).pipe(
      switchMap(_ => this.dialog.open(ModalInfoUserComponent, {
          data: {card},
          maxWidth: '800px'
        }).afterClosed()
      )
    ).subscribe(
      data => console.log("Dialog output:", data)
    );

    this.subscriptions.add($);
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
