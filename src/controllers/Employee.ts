import UserModel, { IUserModel } from '../models/UserModel';
import * as express from 'express';
import Auth from "../services/JwtToken";
const {errorName} =require("../config/errorContant");
class UserController {

  
    /**
     * @api {get} /user Get all users
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Doe"
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    public getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction): void {
			UserModel
				.find({})
				.then((data)=> {
					res.status(200).json({data});
				})
				.catch((error: Error) => {
					res.status(500).json({
						error: error.message,
						errorStack: error.stack
					});
					next(error);
				});
    }
    public getAll({filter}, req): Array<IUserModel> | Object {
       
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
      
     
    public getUser1(req: express.Request, res: express.Response, next: express.NextFunction): void {
			UserModel
				.findOne(
					req.params,
				)
				.then((data) => {
						res.status(200).json({ data });
				})
				.catch((error: Error) => {
						res.status(500).json({
								error: error.message,
								errorStack: error.stack
						});
						next(error);
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
    public create({id,input}): any {
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
