import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user/user.service.service';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router)


  const token = localStorage.getItem('token')

  if (token == '' || token == null || token == undefined || token == 'undefined') {
    router.navigateByUrl('/auth/login')
    return false
  }

  userService.get({}).subscribe(response => {
    if (response.code != 200) {
      router.navigateByUrl('/auth/login')
    }
  })

  return true

};
