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
    this.id = data.id || generateId()
    this.completed = data.completed || false
    this.description = data.description || 'No Content'
    this.creatorId = data.creatorId
  }

  get listTemplate() {
    return `
    
    `
  }

  get cardTemplate() {
    return `
    
    `
  }
}