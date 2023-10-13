// const quote = {
//   "quote": {
//     "body": {
//       "maxLength": 500
//     },
//     "author": {
//       "maxLength": 500
//     },
//     "tags": [
//       {
//         "maxLength": 500
//       }
//     ]
//   },
//   "description": {
//     "type": "String",
//     "required": true
//   }
// }

// const quote = {
//   "_id": "L0Qr5x-lLcc",
//   "content": "Anticipate the difficult by managing the easy.",
//   "author": "Laozi",
//   "tags": [
//     "Wisdom"
//   ],
//   "authorSlug": "laozi",
//   "length": 46,
//   "dateAdded": "2020-09-29",
//   "dateModified": "2023-04-14"
// }

import { generateId } from "../utils/GenerateId.js"

export class Quote {
  constructor(data) {
    this.id = data._id || generateId()
    this.quote = data.content || 'Totally Uninspirational Content'
    this.author = data.author || 'Unknown Author'
    this.tags = data.tags || ["untagged"]
  }
}



