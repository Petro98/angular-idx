import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from "./layout-routing.module";
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule, LayoutRoutingModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, MatButtonModule
  ]
})
export class LayoutModule {
}
