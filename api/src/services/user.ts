import type { Models } from '../models';

interface User{
  id?:string;
  name?:string;
  email?:string;
  avater?:string;
}

class User {
  models: Models;
  constructor(models: Models) {
    this.models = models;
  }
  async findUser(userId:number){
    return  await this.models.user.findOne({ where: { id: userId } });
  }
  async updateUser(userId:number,data: User){
   return  await this.models.user.update(data, { where: { id: userId } })
  }
}

export default User;
