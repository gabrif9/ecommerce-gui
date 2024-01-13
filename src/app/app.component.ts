import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Subscription, from, fromEvent, map, merge, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce-gui';

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  notificationService = inject(NotificationService)

  ngOnInit(): void {
    this.notificationService.allowNotification()
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
    .pipe(map(() => navigator.onLine))
    .subscribe(status => {
      if(!status) {
        console.log('status', status);
        this.notificationService.notify('You are offline')
      }

      this.networkStatus = status
    })
  }
}
