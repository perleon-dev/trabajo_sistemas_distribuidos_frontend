import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'

import { LoadingComponent } from './components/loading/loading.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';


const MODULES = [CommonModule, RouterModule, NgZorroAntdModule,ReactiveFormsModule,FormsModule]
const COMPONENT = [LoadingComponent,LoadingComponent]
//const PIPES = []

@NgModule({
  declarations: [...COMPONENT], //,...PIPES
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENT],  //,...PIPES
  providers: [] //PIPES
})
export class SharedModule {}
