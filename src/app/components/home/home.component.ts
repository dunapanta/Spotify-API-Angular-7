import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    // En esta seccion se hace la peticion GET
    // Es necesario subscribirse cuando se ejecuta es decir estar escuchando los cambios
    // que este servicio puede regresar

    //La data es lo que regresa el servicio

    this.spotify.getNewReleases()
        .subscribe( (data: any) => {

          console.log(data);
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorServicio ) => {

          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;

        });

  }



}
