import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';
import { __values } from 'tslib';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  titulo: string = '';

  perguntas: any;
  perguntaSelecionada: any;

  respostas: string[] = [];
  respostaSelecionada: string = '';

  perguntaIndx: number = 0;
  ultimaPergunta: number = 0;

  acabou: boolean = false;

  constructor() {}
  ngOnInit(): void {
    if (quizz_questions) {
      this.acabou = false;
      this.titulo = quizz_questions.title;
      this.perguntas = quizz_questions.questions;
      this.perguntaSelecionada = this.perguntas[this.perguntaIndx];
      this.perguntaIndx = 0;
      this.ultimaPergunta = this.perguntas.length;
    }
  }

  escolha(valor: string) {
    this.respostas.push(valor);
    this.proximaPergunta();
    console.log(this.respostas);
  }

  async proximaPergunta() {
    this.perguntaIndx += 1;

    if (this.ultimaPergunta > this.perguntaIndx) {
      this.perguntaSelecionada = this.perguntas[this.perguntaIndx];
    } else {
      const respostaFinal: string = await this.verificandoResultado(
        this.respostas
      );
      this.acabou = true;
      this.respostaSelecionada =
        quizz_questions.results[
          respostaFinal as keyof typeof quizz_questions.results
        ];
    }
  }

  verificandoResultado(resultados: string[]) {
    const result = resultados.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }
}
