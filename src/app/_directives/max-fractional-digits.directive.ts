import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[maxFractionalDigits]'
})
export class MaxFractionalDigitsDirective {

  @Input() maxFractionalDigits!: number;
  @Input() decimalSeparator!: string;

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
      event.key == 'Decimal' ? this.decimalSeparator : event.key,
      current.slice(position)
    ].join('');
    if (next && !String(next).match(
      new RegExp(`^-?[0-9]\\d*\\${this.decimalSeparator}?\\d{0,${this.maxFractionalDigits}}$`, 'g')
    )) {
      event.preventDefault();
    }
  }
}
