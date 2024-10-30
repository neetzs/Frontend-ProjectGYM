import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const token = localStorage.getItem("token") || "";
  const router = inject(Router);

  if(token != ""){
    return true
  }else{
    //1 forma
    router.navigateByUrl(""); //Aca va la Url como personalice que vacio es el form de Log deje asi
    return false;
    //Otra Forma: 
    // const url = router.createUrlTree([""])
    // return url;
  }
};
