import { Component, OnInit } from '@angular/core';
import { AbogadoService } from '../../services/abogado.service';
import { IAbogado } from '../../Interfaces/IAbogado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  abogados: IAbogado[] = [];
  cargando: boolean = false;
  error: string | null = null;

  constructor(private abogadoService: AbogadoService) {}

  ngOnInit(): void {
    this.listarAbogados();
  }

  listarAbogados(): void {
    console.log("Estoy aca")
    this.cargando = true;

    this.abogadoService.getAbogados().subscribe({
      next: (data) => {

        this.abogados = data;
        console.log(this.abogados)
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar abogados';
        this.cargando = false;
      }
    });
  }
}
