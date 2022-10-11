import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistEmployee } from 'src/app/models/histEmployee';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html',
  styleUrls: ['./marcaje.component.css']
})
export class MarcajeComponent implements OnInit {
  
  fecha = "";
  hora ="";
  json = "";

  tipo_entrada:boolean=true;
  id= 0;
  histEmployee : HistEmployee[] = [];

  constructor(
    private history: HistoryService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.Formato_Fecha();
    
    this.history.historialUsuario(this.id,this.fecha).subscribe((data: HistEmployee[]) => {
      
      this.json = JSON.stringify(data);
      var dato = JSON.parse(this.json);
      console.log(dato[0].date);
      if(dato != null){
        this.tipo_entrada = false;
        this.fecha = dato[0].date;
        this.hora = dato[0].hour;
      }
    });
}
//Funcion marcaje
Marcar(){    
  if(this.tipo_entrada!=false){
  this.tipo_entrada = false;
  //this.marcar(1);
  }else{
  //this.marcar(2);
  }
}

Formato_Fecha(){
  this.fecha = formatDate(Date.now(), 'YYYY-dd-MM', 'en-US');
  this.hora = formatDate(Date.now(), 'hh:mm:ss a', 'en-US');
}

/*
//funcion marcar/recibe estado, devulve informacion de marcaje
  marcar(id_estado: number){
    this.setDate();
    this.marcado.usuario_id=this.id_usuario;
    this.marcado.tipo_marcaje_id=id_estado;
    this.marcado.fecha=this.fecha;
    this.marcado.hora =this.hora;
    this.marcajeService.createMarcaje(this.marcado).subscribe((res:any) => {
    })    
      alert("Marcaje con exito, tu ultimo marcaje fue a las "+this.fecha +this.hora);
    
  }
*/
}
