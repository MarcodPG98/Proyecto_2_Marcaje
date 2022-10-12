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
  
  fecha = formatDate(Date.now(), 'YYYY-dd-MM', 'en-US');
  hora = formatDate(Date.now(), 'hh:mm:ss a', 'en-US');

  newfecha = formatDate(Date.now(), 'YYYY-dd-MM', 'en-US');
  newhora = formatDate(Date.now(), 'hh:mm:ss a', 'en-US');

  json = "";

  tipo_entrada:boolean=true;
  id= 0;
  Employee : Employee = new Employee();

  constructor(
    private history: HistoryService,
    private route: ActivatedRoute,
    private token: TokenService,
    private router: Router,
    private logged: LoggedService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.history.historialUsuario(this.id,this.fecha).subscribe((data: HistEmployee[]) => {
      
      this.json = JSON.stringify(data);
      var dato = JSON.parse(this.json);
      
      var histEmployee = dato.at(-1);

      if(histEmployee != null){
        this.tipo_entrada = false;
        this.fecha = histEmployee.date;
        this.hora = histEmployee.hour;
      } else {
        this.tipo_entrada = true;
      }
    });
}
//Funcion marcaje
marcarEntrada(){    
  if(this.tipo_entrada==false){
    //mandamos el id del usuario
    this.ingreso(this.id);
  } else {
    //mandamos el id del usuario
    this.ingreso(this.id);
  }
}

ingreso(id : number){
  this.Employee.date = this.newfecha;
  this.Employee.hour = this.newhora;
  this.Employee.id_user = id;
  this.history.create(this.Employee).subscribe((data: any) => {
    window.alert("entrada recibida");
    this.token.remove();
    this.logged.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  });
}
}
