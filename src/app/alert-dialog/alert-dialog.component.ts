import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  @Input() message: string;
  @Input() alertColor: string;
  colorClasses: Object;

  constructor() {
    this.alertColor = "green"
  }

  ngOnInit(): void {
    this.colorClasses = {
      bg: `bg-${this.alertColor}-100`,
      border: `border-${this.alertColor}-400`,
      text1: `text-${this.alertColor}-700`,
      text2: `text-${this.alertColor}-500`,
    }
  }

  closeAlert(): void {
    this.message = null
  }
}
