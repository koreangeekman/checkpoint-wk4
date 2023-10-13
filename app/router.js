import { BGImgController } from "./controllers/BGImgController.js";
import { InspirationalController } from "./controllers/InspirationalController.js";
import { ToDoController } from "./controllers/ToDoController.js";
import { WeatherController } from "./controllers/WeatherController.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [ToDoController, BGImgController, InspirationalController, WeatherController],
    view: null
  }
]


/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */