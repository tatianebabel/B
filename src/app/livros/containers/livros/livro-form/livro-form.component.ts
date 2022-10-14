import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Livro } from '../../../model/livro';
import { LivrosService } from '../../../services/livros.service';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    nome: ['', Validators.required],
    isbn: [''],
    titulo: ['', Validators.required],
    edicao: ['', Validators.required],



  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: LivrosService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
    // this.form
   }

  ngOnInit(): void {
    const livro: Livro = this.route.snapshot.data["livro"];
    if(livro.id != undefined){
    this.form.setValue({
      id: livro.id,
      nome: livro.nome,
      isbn: livro.isbn,
      titulo: livro.titulo,
      edicao: livro.edicao,

    });
  }
  }

  onSubmit() {
    this.service.salvar(this.form.value)
    .subscribe(result => this.onSucess(), error =>this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this._snackBar.open('Livro salvo com sucesso.','', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar livro.','', { duration: 5000 });
}
}
