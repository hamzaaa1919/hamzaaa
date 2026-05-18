import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: false,
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent implements OnInit, OnDestroy {
  glitchChars = '`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/'.split('');
  titleText = '404'.split('');
  messageText = 'Not found'.split('');

  private updateFn = (e: any) => {
    const root = document.documentElement;
    if (e.acceleration && e.acceleration.x !== null) {
      root.style.setProperty('--X', e.acceleration.x);
      root.style.setProperty('--Y', e.acceleration.y);
    } else {
      root.style.setProperty('--X', (e.pageX / window.innerWidth - 0.5).toString());
      root.style.setProperty('--Y', (e.pageY / window.innerHeight - 0.5).toString());
    }
  };

  ngOnInit() {
    document.body.addEventListener('mousemove', this.updateFn);
    window.addEventListener('devicemotion', this.updateFn);
  }

  ngOnDestroy() {
    document.body.removeEventListener('mousemove', this.updateFn);
    window.removeEventListener('devicemotion', this.updateFn);
  }

  getCharStyle() {
    const charStyle: any = {
      '--count': (Math.random() * 5 + 1).toString(),
    };
    for (let i = 0; i < 10; i++) {
      charStyle[`--char-${i}`] = `"${this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)]
        }"`;
    }
    return charStyle;
  }
}
