import { el, text, mount } from "redom";
import { App } from "redom-app";
import { PatientList } from "./view/patient-list";
import { PatientDetails } from "./view/patient-details";
import { Signin } from "./view/signin";
import { Home } from "./view/home";
import "@fortawesome/fontawesome-free/js/all";
import "./style/bootstrap.min.css";
import "./style/app.css";
import * as $ from "jquery";

window.auth = false;
class AuthenticationMiddleware {
  constructor() {}
  //this is what the auth function needs to look like
  exec(currentView, nextView, params) {
    // if (window.auth == false) {
    //   return "signin";
    // } else {
    //   return nextView;
    // }
  }
}

const app = new App()
  .routes({
    home: Home,
    default: Signin,
    default: Home,
    patients: PatientList,
    patient: PatientDetails,
  })
  .middlewares([new AuthenticationMiddleware()])
  .start();
