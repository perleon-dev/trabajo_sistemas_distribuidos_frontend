import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReceiveComponent } from './components/receive/receive.component'

const routes: Routes = [
  {
    path: 'receive/:sessionId/:pageId',
    component: ReceiveComponent,
    data: { title: 'recieve' },
  },
  {
    path: 'receive/:sessionId/:pageId/:contractId/:templateId/:templateTypeId/:documentNumber/:process',
    component: ReceiveComponent,
    data: { title: 'recieve' },
  },
  {
    path: 'receive/:sessionId/:pageId/:templateId/:templateTypeId/:screen/:optional',
    component: ReceiveComponent,
    data: { title: 'recieve' },
  },
  {
    path: 'receive/:sessionId/:pageId/:templateId/:templateTypeId',
    component: ReceiveComponent,
    data: { title: 'recieve' },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
