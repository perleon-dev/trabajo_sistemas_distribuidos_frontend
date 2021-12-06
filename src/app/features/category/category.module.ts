import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
