import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// https://github.com/ReactiveX/rxjs
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable()
export class VideoService {

    public videoElement: any;

    public currentPath: string = '';
    public currentTitle: string = 'Loading...';

    public currentTime: number = 0;
    public totalTime: number = 0;

    public calculatedWidth: number;
    public calculatedScrubY: number;

    public isMuted: boolean = false;
    public isPlaying: boolean = false;

    public showDetails: boolean = false;
    public currentDesc: string = 'A very nice video...';

    playlistUrl: string = './assets/data/playlist.json';
    public playlist: Object;

    constructor(private http: HttpClient) { }

    appSetup(v: string) {
        this.videoElement = <HTMLVideoElement>document.getElementById(v);
        this.videoElement.addEventListener('loadedmetadata', this.updateData);
        this.videoElement.addEventListener('timeupdate', this.updateTime);

        window.setInterval(this.timerFired, 500);
    }

    gatherPlaylist = () => {
        this.http.get(this.playlistUrl)
            .subscribe(data => {
                this.playlist = data;
                // console.log(data);
                // console.log(data[0].title);

                this.selectedVideo(1);
            });
    };

    selectedVideo = (i: number) => {
        this.currentTitle = this.playlist[i]['title']; 
        this.currentDesc = this.playlist[i]['description'];
        this.videoElement.src = this.playlist[i]['path'];
        this.videoElement.pause();
        this.isPlaying = false; 
    }

    seekVideo(e: any) {
        let w = document.getElementById('progressMeterFull').offsetWidth;
        let d = this.videoElement.duration;
        let s = Math.round(e.pageX / w * d);
        this.videoElement.currentTime = s;
    }

    muteVideo() {
        if (this.videoElement.volume == 0) {
            this.videoElement.volume = 1;
            this.isMuted = false;
        } else {
            this.videoElement.volume = 0;
            this.isMuted = true;
        }
    }

    playVideo() {
        if (this.videoElement.paused) {
            this.videoElement.play();
            this.isPlaying = true;
        } else {
            this.videoElement.pause();
            this.isPlaying = false;
        }
    }

    updateData = (e: any) => {
        this.totalTime = this.videoElement.duration;
    };

    updateTime = (e: any) => {
        this.currentTime = this.videoElement.currentTime;
    };

    timerFired = () => {
        this.calculatedScrubY = this.videoElement.offsetHeight;
        let t = this.videoElement.currentTime;
        let d = this.videoElement.duration;
        this.calculatedWidth = t / d * this.videoElement.offsetWidth;
    };

    details() {
        this.showDetails = this.showDetails ? false : true;
    }

    fullScreen() {
        if (this.videoElement.requestFullscreen) {
            this.videoElement.requestFullscreen();
        } else if (this.videoElement.mozRequestFullscreen) {
            this.videoElement.mozRequestFullscreen();
        } else if (this.videoElement.webkitRequestFullscreen) {
            this.videoElement.webkitRequestFullscreen();
        } else if (this.videoElement.msRequestFullscreen) {
            this.videoElement.msRequestFullscreen();
        }
    }

}