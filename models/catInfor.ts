import api from "../request/file";

interface CatInfoFromApi {
    id: number,
    name: string,
    breed: string,
    gender: string
}

export class Cat {
  id: number;
  name: string;
  breed: string;
  gender: string;
  url: string;

  constructor(catInfo: CatInfoFromApi) {
    this.id = catInfo.id;
    this.name = catInfo.name;
    this.breed = catInfo.breed;
    this.gender = catInfo.gender;

    this.url = api.fetchStaticFile("images/cats/" + this.id + ".jpg");
  }
}