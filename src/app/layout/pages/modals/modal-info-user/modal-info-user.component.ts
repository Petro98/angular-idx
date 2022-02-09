import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserInfoInterface} from "../../../../shared/interfaces/user-info";



@Component({
  selector: 'app-modal-info-user',
  templateUrl: './modal-info-user.component.html',
  styleUrls: ['./modal-info-user.component.scss']
})
export class ModalInfoUserComponent implements OnInit, OnDestroy {
  userInfo: UserInfoInterface<string>

  constructor( private dialogRef: MatDialogRef<ModalInfoUserComponent>,
               @Inject(MAT_DIALOG_DATA) data: {card:  UserInfoInterface<string>}) {
    this.userInfo = data.card
  }

  ngOnInit(): void {
    console.log(this.userInfo)

  }



  ngOnDestroy() {

  }

}
