import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id:number;
operacion: string = 'Agregar Mascota';

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private router: Router,
    private aRoute: ActivatedRoute)
    {
    this.form = this.fb.group({

      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],

    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

  }
  ngOnInit(): void {

    if(this.id != 0){
      this.operacion = 'Editar Mascota';
      this.obtenerMascota(this.id);
    }
  }


  obtenerMascota(id : number){
    this.loading = true;
    this.mascotaService.getMascota(id).subscribe(data =>{
      this.form.patchValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso,


      })
      this.loading = false;
    })

  }

  agregarEditarMascota(){

    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.get('raza')?.value,
      color: this.form.get('color')?.value,
      edad: this.form.get('edad')?.value,
      peso: this.form.get('peso')?.value,


    }

      if(this.id !=0) {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
      }


      else {
          this.agregarMascota(mascota);
      }




}


editarMascota(id:number ,mascota: Mascota){
  this.loading = true;
  this.mascotaService.UpdateMascota(id, mascota).subscribe(() => {
    this.mensajeExito('Editada');
    this.router.navigate(['/listado-mascotas']);
    this.loading = false;
  })
}

agregarMascota(mascota:Mascota){this.mascotaService.AddMascota(mascota).subscribe(data => {

  this.mensajeExito('Registrada');
  this.router.navigate(['/listado-mascotas']);
 })}



mensajeExito(text: string ){
  this._snackBar.open(`Mascota ${text} con exito`, ',,',{
    duration: 4000,
    horizontalPosition: 'right',
  });
}

}
