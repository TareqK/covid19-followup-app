/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { el, text, mount } from "redom";
import { Card } from "../component/card";
import * as api from "../utils/api";
export class Overview {
  constructor(attr, text) {
    <div class="container-fluid" this="el">
      <h4>Overview</h4>
      <div class="row">
        <div class="col-sm-12 col-xl-11 col-lg-9 col-md-8">
          <div class="ml-5 row pt-md-2">
            <Card title="Total Patients" this="totalPatients"></Card>
            <Card title="Unseen Symptoms" this="totalSymptoms"></Card>
            <Card title="Unseen Answers" this="totalAnswers"></Card>
          </div>
        </div>
      </div>
    </div>;
  }

  update(data) {

    this._updateTotalPatients();
    this._updateTotalSymptoms();
    this._updateTotalAnswers();

  }
  
  _updateTotalPatients(){
     api.getPatientsCount().then((json) => {
      this.totalPatients.update(json.count);
    });
  }
  
  _updateTotalSymptoms(){
     api.getUnarchivedSymptomsCount().then((json) => {
      this.totalSymptoms.update(json.count);
    });
  }
  
  _updateTotalAnswers(){
     api.getUnarchivedAnswersCount().then((json) => {
      this.totalAnswers.update(json.count);
    });
  }
}
