/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { el, text, mount, list, unmount } from "redom";
import {getTitle} from "../utils/icpc"
import * as api from "../utils/api"
export class Symptoms {
  constructor(attr, text) {
    <div this="el" class="col-lg-6">
      <div class="bg-light-grey mx-2 my-4">
        <h5 class="p-3 text-info font-weight-bold">Patient Symptoms</h5>
        <div class="col-12">
          {this.symptoms = list('div.container-fluid', Symptom) }
        </div>
      </div>
    </div>;
  }

  update(patientId) {
    api.getPatientSymptoms(patientId).then((data) => {
      this.symptoms.update(data, {"patientId": patientId});
    })

  }

}

class Symptom {
  constructor(attr, text) {
    <div this="el" class="row">
      <div class="symptom-card card card-common rounded-lg w-100">
        <div class="card-header d-flex justify-content-start">
          <h6 this="name"></h6>
        </div>
        <div class="card-body w-100">
          <div class="symptom-note" this="note"></div>
          <p>
          <div class="d-flex justify-content-between w-100">
            <div>
              <div this="date"></div>
              <div class="d-flex">
                <i class="fa fa-clock"></i>&nbsp;
                <div this="time" ></div>
              </div>
            </div>
            <div>
              <button this="dismiss" class="btn btn-danger">Dismiss</button>
            </div>
          </div>
          </p>
        </div>
      </div>
    </div>
  }

  update(data, index, items, context) {
    this.data = data;
    this.patientId = context.patientId;
    this.name.textContent = getTitle(data.symptomCode);
    this.note.textContent = data.note;
    this.date.textContent = new Date(data.creationDate).toLocaleDateString()
    this.time.textContent = new Date(data.creationDate).toLocaleTimeString()
    this.dismiss.onclick = (e) => {
      this._dismiss().then((res) => {
        unmount(this.el.parentNode, this)
      })
    }
  }

  _dismiss() {
    return api.archiveSymptom(this.patientId, this.data.id);  
  }

}


