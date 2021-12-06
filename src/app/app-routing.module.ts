import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { NotFoundComponent } from './core/components/error/notfound.component'
import { AppPreloader } from './app-routing-loader'
import { SharedModule } from './shared/shared.module'
import { LayoutMainComponent } from './core/components/main/main.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'mantenimiento/category',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'contratos/marketplace/cargamasiva',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/carga-masiva/carga-masiva.module').then(m => m.CargaMasivaComponentModule),
      },
      {
        path: 'contratos/marketplace/cargamasiva',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/carga-masiva/carga-masiva.module').then(m => m.CargaMasivaComponentModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  }
]

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloader }),
  ],
  exports: [RouterModule],
  providers: [AppPreloader],
})
export class AppRoutingModule {}