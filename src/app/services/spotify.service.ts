import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

//importar map reactive extentions
import { map } from "rxjs/operators";

// Por lo general cuando se trabaja con API
// Es necesario Centralizar la Informacion por eso este Service

// Este servicio se va a poder Inyectar en otros Componentes
@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    // console.log('Spotify Service Listo');
  }

  // Para  consulta generica
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    //Pipe transformacion de Datos
    // Defino Headers que API de Spotify Necesita
    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQCItPNevyVExFrIcz2Lu36MiTNW7A-6pmsZDcfD302RoQhiK97POPBWecTOu4B38DARuVmjJvBPZfI-Mvo"
    });

    return this.http.get(url, { headers });
  }

  //Cuando API Spotify envia la respuesta envia demasiada informacion y MAP
  //simplemente me filtra lo que a mi me sirve

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map(data => data["albums"].items)
    );
  }

  // Referente al Search

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data["tracks"])
    );
  }
}
