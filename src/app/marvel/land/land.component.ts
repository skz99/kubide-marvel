import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss']
})
export class LandComponent {
  // Booleans
  loadingBoolean = true;

  constructor(private router: Router,
    private toastr: ToastrService,) {
    setTimeout(() => {
      this.loadingBoolean = false;
    }, 500);
  }

  redirectTo(module: string) {
    if (module != 'characters') {
      this.toastr.info('Coming soon! :)');
    } else {
      this.loadingBoolean = true;
      this.router.navigateByUrl(`/${module}`).then(a => this.loadingBoolean = false);
    }
  }

}
