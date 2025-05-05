import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-website-loader',
  templateUrl: './website-loader.component.html',
  styleUrls: ['./website-loader.component.css']
})
export class WebsiteLoaderComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Simulate a fake loading function like PlantZone.load()
    this.fakeLoad();

    // Add 'show' class after 500ms
    setTimeout(() => {
      const loadingArea = document.getElementById('loading-area');
      if (loadingArea) {
        this.renderer.addClass(loadingArea, 'show');
      }
    }, 500);

    // Add 'active' class and fade out after 1500ms
    setTimeout(() => {
      const loadingArea = document.getElementById('loading-area');
      if (loadingArea) {
        this.renderer.addClass(loadingArea, 'active');
        this.fadeOutElement(loadingArea, 2000);
      }
    }, 3000);

    // Handle accessibility focus outline toggling
    this.renderer.listen(document.body, 'keydown', () => {
      this.renderer.addClass(document.body, 'show-focus-outline');
    });

    this.renderer.listen(document.body, 'mousedown', () => {
      this.renderer.removeClass(document.body, 'show-focus-outline');
    });
  }

  // Optional: simulate any loading logic (like PlantZone.load())
  private fakeLoad(): void {
    console.log('Loading resources...');
  }

  // Fade out function (vanilla, replace jQuery fadeOut)
  private fadeOutElement(el: HTMLElement, duration: number): void {
    el.style.transition = `opacity ${duration}ms ease`;
    el.style.opacity = '0';

    setTimeout(() => {
      el.style.display = 'none';
    }, duration);
  }

}
