import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { VideoService } from './video.service';

import { AppComponent } from './app.component';
import { ProgressComponent } from './components/progress.component';
import { ToolbarComponent } from './components/toolbar.component';
import { TimedisplayPipe } from './pipe/timedisplay.pipe';
import { OptionsComponent } from './components/options.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    ToolbarComponent,
    TimedisplayPipe,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
