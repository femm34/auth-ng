import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/routes/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', component: NotFoundComponent },
];
