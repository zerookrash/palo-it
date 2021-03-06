import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Notas } from 'src/app/shared/models/notas.interface';
import { ChoresService } from '../chores.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: 'test',
    },
  };

  nota: Notas;
  constructor(private router: Router, private notasSvc: ChoresService) {
    const navigation = this.router.getCurrentNavigation();
    this.nota = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (this.nota === undefined) {
      this.router.navigate(['list']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state!.value = this.nota;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(nId: any): Promise<void> {
    try {
      await this.notasSvc.onDeleteNote(nId);
      this.onGoToList();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu nota ha sido eliminada',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onGoToList(): void {
    this.router.navigate(['/']);
  }
}
