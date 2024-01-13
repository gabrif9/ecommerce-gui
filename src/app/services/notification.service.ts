import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private router: Router) { }

  allowNotification() {
    if(Notification.permission !== "granted") {
      Notification.requestPermission()
    }
  }


  notify(message: string, id: string = '') {
    if(Notification.permission !== 'granted') {
      this.allowNotification()
    } else if (id === ''){
      var notification = new Notification('New Notification', {
        body: message
      })

      notification.onclick = function () {
        window.location.reload()
      }
    } else if (id != '') {
      var notification = new Notification('New Notification', {
        body: message
      })

      notification.onclick = () => {
        window.location.reload()
      }
    }
  }
}
