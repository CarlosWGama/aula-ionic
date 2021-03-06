import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  public static podeAcessar = false;

  public constructor(private storage:Storage, private router:Router) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.storage.get('podeAcessar').then(podeAcessar => {
        if (!podeAcessar)
          this.router.navigateByUrl('login');
      });
      
      return this.storage.get('podeAcessar');
  }
}
