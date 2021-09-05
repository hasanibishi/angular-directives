import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[maxFractionalDigits]'
})
export class MaxFractionalDigitsDirective implements OnInit {

  @Input() maxFractionalDigits!: number;

  private regex!: RegExp;

  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    '-',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete'
  ];

  ngOnInit() {
    this.generateRegex(this.maxFractionalDigits);
  }

  generateRegex(digits: number) {
    this.regex = new RegExp(`^-?[0-9]\\d*\\.?\\d{0,${digits}}$`, 'g');
  }

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key == 'Decimal' ? '.' : event.key,
      current.slice(position)
    ].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
