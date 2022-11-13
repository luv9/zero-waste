import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () =>
  import('./main/account/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}

  ngOnInit(): void {}
}
