import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private render: Renderer2, private elmn: ElementRef) { }

  ngOnInit() {
    // const scripts = [
    //   "assets/js/custom.js"
    // ];

    // scripts.forEach(src => {
    //   const script = this.render.createElement('script');
    //   script.src = src;
    //   this.render.appendChild(this.elmn.nativeElement, script);
    // });

    // const styles = [
    //   "assets/css/style.css",
    // ];

    // styles.forEach(href => {
    //   const link = this.render.createElement('link');
    //   link.rel = 'stylesheet';
    //   link.href = href;
    //   this.render.appendChild(this.elmn.nativeElement, link);
    // });
  }


}
