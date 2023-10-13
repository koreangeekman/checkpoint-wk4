// const bgimg = {
//   "url": {
//     "type": "String",
//     "maxLength": 5000
//   },
//   "imgUrl": {
//     "type": "String",
//     "maxLength": 5000
//   },
//   "query": {
//     "type": "String",
//     "maxLength": 5000
//   },
//   "author": {
//     "type": "String",
//     "maxLength": 5000
//   },
//   "largeImgUrl": {
//     "type": "String",
//     "maxLength": 5000
//   }
// }


// const images = {
//   "url": "https://pixabay.com/get/g4a8f256ae2fc6006997c756e0d1d8490152d923127461094024c133c7145ab9667becd2b2dcc7f6ff1daa6cf8fe60374_640.jpg",
//   "imgUrl": "https://pixabay.com/get/g4a8f256ae2fc6006997c756e0d1d8490152d923127461094024c133c7145ab9667becd2b2dcc7f6ff1daa6cf8fe60374_640.jpg",
//   "largeImgUrl": "https://pixabay.com/get/g81381d805f9e207304c963fd3007a320149031e5ccad3f4c081e0dd9b7e5edc53e95309c56e029eea13322bb0a0822ffc61e2922c905749dda59e7dca75d6bec_1280.jpg",
//   "tags": "mountains, village, trees",
//   "author": "jpeter2",
//   "query": "mountain"
// }

import { generateId } from "../utils/GenerateId.js"

export class BGImg {
  constructor(data) {
    this.id = data.id || generateId()
    this.url = data.url
    this.imgUrl = data.imgUrl
    this.largeImgUrl = data.largeImgUrl
    this.author = data.author || ''
    this.tags = data.tags || ["untagged"]
    this.query = data.query
  }
}


