import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 30;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval: any;
  progress: string="0";
  isQuizCompleted : boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    if(localStorage.getItem('name')! === '') {
      this.name = "Player1";
    }
    else {
      this.name = localStorage.getItem('name')!;
    }
 
    this.getAllQuestions();
    this.startCounter();
  }

  startCounter(): void {
    this.interval = interval(1000)
    .subscribe(val=> {
      this.counter--;
      if(this.counter===0) {
        this.currentQuestion++;
        this.counter=30;
      }
    });
    setTimeout(() => {
      this.interval.unsubscribe();
    }, 300000)
  }

  stopCounter(): void {
    this.interval.unsubscribe();
    this.counter=0;
  }

  resetCounter(): void {
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  getAllQuestions(): void {
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
    })
  }

  answer(currentQ: number, option: any): void {
    if(currentQ === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.correct) {
      this.points+=5;

      setTimeout(() => {
        this.currentQuestion++;
        this.correctAnswer++;
        this.getProgress();
      }, 1000);

    } else {
      this.points-=5;

      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgress();
      }, 1000);

    }
  }
  nextQuestion(): void {
    this.currentQuestion++;
  }
  previousQuestion(): void {
    this.currentQuestion--;
  }

  resetQuiz(): void {
    this.points=0;
    this.counter=30;
    this.currentQuestion=0;
    this.progress ="0";
    this.resetCounter();
    this.getAllQuestions();
  }

  getProgress() {
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
