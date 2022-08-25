import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

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
  interval$:any;
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
    //this.startCounter();


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
      //this.stopCounter();
    }
    if(option.correct) {
      this.points+=5;

    } else {
      this.points-=5;
    }
  }
  nextQuestion(): void {
    this.currentQuestion++;
  }
  previousQuestion(): void {
    this.currentQuestion--;
  }

  resetQuiz(): void {

  }



}
