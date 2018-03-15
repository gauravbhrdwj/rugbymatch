import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from "../game/game.service";
import {Teams} from "../game/Teams";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [GameService]
})
export class StartComponent implements OnInit {

  public stateMessage = "";
  public stateCode = 0;

  @Output() teamsForGame: EventEmitter<Teams> = new EventEmitter<Teams>();

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  startGame() {
    this.gameService.startGame().subscribe( answer => {
      this.stateMessage = answer.message;
      this.stateCode = answer.code;
      this.teamsForGame.emit(new Teams(answer.body.hostingTeam, answer.body.visitingTeam))
    });
  }

}