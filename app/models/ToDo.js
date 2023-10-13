import { generateId } from "../utils/GenerateId.js"

// const todo = {
//   "completed": {
//     "type": "Boolean",
//     "required": true,
//     "default": false
//   },
//   "description": {
//     "type": "String",
//     "required": true,
//     "maxLength": 500
//   },
//   "creatorId": {
//     "type": "ObjectId",
//     "required": true,
//     "ref": "Account"
//   }
// }

export class ToDo {
  constructor(data) {
    this.id = data.id || null
    this.completed = data.completed || false
    this.description = data.description || 'No Content'
    this.creatorId = data.creatorId || null
  }

  get listTemplate() {
    if (this.completed) {
      return `
        <span class="d-flex align-items-center justify-content-between p-1">
          <span class="d-flex">
            <input type="checkbox" onchange="app.ToDoController.toggle('${this.id}')" checked>
            <p class="listItem px-1 ms-1 mb-0 shadow"><s>${this.description}</s></p>
          </span>
          <i class="fs-4 text-danger mdi mdi-trash-can" type="button" onclick="app.ToDoController.removeTask('${this.id}')"></i>
        </span>
        `
    }
    return `
      <span class="d-flex align-items-center justify-content-between p-1">
        <span class="d-flex">
          <input type="checkbox" onchange="app.ToDoController.toggle('${this.id}')">
          <p class="listItem px-1 ms-1 mb-0 shadow">${this.description}</p>
        </span>
        <i class="fs-4 text-danger mdi mdi-trash-can" type="button" onclick="app.ToDoController.removeTask('${this.id}')"></i>
      </span>
    `
  }
}