import { NgModule } from '@angular/core';

import { JhipsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    providers: [],
    exports: [JhipsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterSharedCommonModule {}
