import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '' , component : HomeComponent},
  {path: 'counter', loadChildren: ()=> import('./countr/counter.module').then((m)=> m.CounterModule)},
  {path: 'posts', loadChildren: () =>import ('./post/posts.module').then(m=> m.PostsModule )},
  {path : 'auth', loadChildren: ()=> import ('./auth/auth.module').then(m=> m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
