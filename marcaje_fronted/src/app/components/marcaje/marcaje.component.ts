import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { HistEmployee } from 'src/app/models/histEmployee';
import { HistoryService } from 'src/app/services/history.service';
import { LoggedService } from 'src/app/services/logged.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html',
  styleUrls: ['./marcaje.component.css']
})
export class MarcajeComponent implements OnInit {
  
  // Variables para obtener la fecha y hora actual
  date = formatDate(Date.now(), 'YYYY-dd-MM', 'en-US');
  checkTime = formatDate(Date.now(), 'hh:mm:ss a', 'en-US');

  newfecha = formatDate(Date.now(), 'YYYY-dd-MM', 'en-US');
  newhora = formatDate(Date.now(), 'hh:mm:ss a', 'en-US');

  // Variables para validar y recuperar datos
  json = "";

  tipo_entrada:boolean=true;
  id= 0;
  Employee : Employee = new Employee();

  constructor(
    // Servicios a consumir
    private history: HistoryService,
    private route: ActivatedRoute,
    private token: TokenService,
    private router: Router,
    private logged: LoggedService
  ) {}

  ngOnInit(): void {
    // almacenamos el id del usuario
    this.id = this.route.snapshot.params['id'];
    
    // verificamos si ya ha realizado algún marcaje, por medio del id y la fecha actual
    this.history.historialUsuario(this.id,this.date).subscribe((data: HistEmployee[]) => {
      
      /*
        Obtenemos los datos del usuario y
        los creamos como un json ya que
        nos devuelve un object
      */
      this.json = JSON.stringify(data);
      var dato = JSON.parse(this.json);
      
      // almacenamos el primer dato del json
      var histEmployee = dato[0];

      // validamos si tenemos datos
      if(histEmployee != null){
        if(histEmployee.entrada == 1){ // si la entrda es 1 mostramos hora de salida
          this.tipo_entrada = false;
          this.date = histEmployee.date;
          this.checkTime = histEmployee.departureTime;
        } else { // si la entrda es 0 mostramos hora de entrda
          this.tipo_entrada = false;
          this.date = histEmployee.date;
          this.checkTime = histEmployee.checkTime;
        }
      } else {
        this.tipo_entrada = true;
      }
    });
  }
  //Funcion marcaje
  marcarEntrada(){    
    if(this.tipo_entrada==false){
      //mandamos el id del usuario, para actualizar su hora de salida
      this.actualizarHora(this.id);
    } else {
      //mandamos el id del usuario
      this.ingreso(this.id);
    }
  }

  // método para guardar el primer marcaje del usuario
  ingreso(id : number){
    this.Employee.date = this.newfecha;
    this.Employee.checkTime = this.newhora;
    this.Employee.id_user = id;
    this.history.create(this.Employee).subscribe((data: any) => {
      window.alert("entrada recibida");
      this.token.remove();
      this.logged.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
    });
  }

  // Método para actualizar la hora de salida
  actualizarHora(id : number){
    this.history.validarEntrada(this.id).subscribe((data: any) => {
      window.alert("Nuevo Marcaje");
      this.token.remove();
      this.logged.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
    });
  }
}
