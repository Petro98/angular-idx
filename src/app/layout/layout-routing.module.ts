import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";
import {ListUsersComponent} from "./pages/list-users/list-users.component";


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [{
      path: 'one',
      component: ListUsersComponent
    }]
  },

  {path: "**", redirectTo: "not-found"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
