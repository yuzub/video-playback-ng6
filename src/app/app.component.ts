import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';

@Component({
  selector: 'vp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Custom HTML5 Video Playback';

  constructor(public videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.appSetup('videoDisplay');
    this.videoService.gatherPlaylist();
  }

}
