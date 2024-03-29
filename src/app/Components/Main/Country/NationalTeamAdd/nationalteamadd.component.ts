import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NationalTeam } from 'src/app/Model/nationalTeam';
import { NationalteamService } from 'src/app/Service/nationalteam.service';

@Component({
  selector: 'app-nationalteamadd',
  templateUrl: './nationalteamadd.component.html',
  styleUrls: ['./nationalteamadd.component.css']
})
export class NationalteamaddComponent implements OnInit{
  
  constructor(private formBuilder : FormBuilder, 
              private nationalTeamService : NationalteamService, 
              private activatedRoute : ActivatedRoute,
              private router : Router){}

  ngOnInit(): void {
      this.createNationalTeamForm()
  }

  nationalTeamAddForm : FormGroup;
  @Input() countryId : number;
  
  createNationalTeamForm(){
    this.nationalTeamAddForm = this.formBuilder.group({
      nationalTeamLevel : ["", Validators.required],
      nationalTeamName : ["", Validators.required],
      squadSize : ["", Validators.required],
      averageAge : ["", Validators.required],
      marketValue : ["", Validators.required]
    })
  }

  nationalTeamAdd(){
    let model = Object.assign({}, this.nationalTeamAddForm.value);
    let nationalTeamModel = <NationalTeam>{
      countryId : this.countryId,
      nationalTeamLevel : model.nationalTeamLevel,
      nationalTeamName : model.nationalTeamName,
      squadSize : model.squadSize, 
      averageAge : model.averageAge,  
      marketValue : model.marketValue 
    }
    
    this.nationalTeamService.addNationalTeam(nationalTeamModel).subscribe(response => {
      window.location.reload()
    })
  }

}
