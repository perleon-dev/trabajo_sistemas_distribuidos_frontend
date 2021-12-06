import { NgModule } from '@angular/core';

import { CargaMasivaRoutingModule } from './carga-masiva-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CargaMasivaComponent } from './carga-masiva.component';
import { CargaMasivaModalComponent } from './carga-masiva-modal/carga-masiva-modal.component';


@NgModule({
  declarations: [CargaMasivaComponent, CargaMasivaModalComponent],
  imports: [
    SharedModule,
    CargaMasivaRoutingModule
  ]
})
export class CargaMasivaComponentModule { }
