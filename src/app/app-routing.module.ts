import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.gaurd';
import { PostDetailsComponent } from './post/post-details/post-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'counter',
    loadChildren: () =>
      import('./countr/counter.module').then((m) => m.CounterModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./post/posts.module').then((m) => m.PostsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/details/:id',
    component: PostDetailsComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
