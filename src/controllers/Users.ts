import UserModel, { IUserModel } from '../models/UserModel';
const {errorName} =require("../config/errorContant");
class UserController {
    public getListUsers({filter}, req): Array<IUserModel> | Object {
       
        return UserModel
          .find(filter)
          .then((data) => {
            return data;
          })
          .catch((error: Error) => {
            var err = new Error("INTERNALSERVER");
            err.stack = error.message;
            throw err;
          });
      }
        
    public getUser({id}, req): any {
			
      return UserModel
      .findById(id)
      .then((data) => {
        return data;
      })
      .catch((error: Error) => {
        var err = new Error(errorName.NOTFOUND);
            err.stack = error.message;
            throw err;
      });
    }
    
    public updateUser({id,input}): any {
        let updatePayload: any = {};
        return UserModel.update({_id:id},input)
        .then((update) => {
         return  { count: update.nModified|| 0 }
        })
        .catch((error: Error) => {
            return {};
        });
    }
}

export default new UserController();
