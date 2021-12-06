import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { CoreRoutingModule } from './core-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NotFoundComponent } from './components/error/notfound.component'
import { LayoutMainComponent } from './components/main/main.component';
import { ReceiveComponent } from './components/receive/receive.component'

const COMPONENTS = [NotFoundComponent,ReceiveComponent,LayoutMainComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    // vendor
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreRoutingModule,
  ]
})
export class CoreModule {}
