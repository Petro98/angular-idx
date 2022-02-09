import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ListUsersApiService} from "./shared/services/list-users-api.service";
import {HttpClientModule} from '@angular/common/http'
import {ModalInfoUserComponent} from "./layout/pages/modals/modal-info-user/modal-info-user.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ModalInfoUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,

  ],
  entryComponents: [ModalInfoUserComponent],

  providers: [ListUsersApiService ,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
