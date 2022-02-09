import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ListUsersApiService} from "./shared/services/list-users-api.service";
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ListUsersApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
