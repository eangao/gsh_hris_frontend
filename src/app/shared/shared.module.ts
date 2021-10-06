import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';



import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    // DurationPipe,
    // FormatMediumDatetimePipe,
    // FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
  ],
  exports: [
    SharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    // DurationPipe,
    // FormatMediumDatetimePipe,
    // FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
  ],
})
export class SharedModule {}
