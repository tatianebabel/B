import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Livro } from '../../model/livro';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html',
  styleUrls: ['./livros-list.component.css']
})
export class LivrosListComponent implements OnInit {

  @Output() adicionar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() deletar = new EventEmitter(false);
  dataSource!: MatTableDataSource<Livro>;


  readonly displayedColumns = ['id', 'nome', 'acoes'];

  constructor(private livrosService: LivrosService) {
    this.livrosService.listarTodos().subscribe((dados) => {
      console.log(dados);
      this.dataSource = new MatTableDataSource(dados);
    }
   );
 }
  ngOnInit(): void {
  }

  onAdicionar() {
    this.adicionar.emit(true);
  }

  onEditar(livro: Livro) {
    this.editar.emit(livro);
  }

  onDeletar(livro: Livro) {
    this.deletar.emit(livro);
  }

  doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }
}
