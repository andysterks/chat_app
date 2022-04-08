import json
from flask import request, Blueprint, jsonify
from flask_restx import Api, Resource
from server.data import *
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, get_jwt_identity
import bcrypt


api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)


@api.route("/messages")
class Message(Resource):
    
    def get(self):

        

        return jsonify(getMessages())

    def post(self):
        req_data = request.get_json()
        userId = req_data["userId"]
        text = req_data["text"]
        topic = req_data["topic"]

        return createMessage(userId, text, topic)


@api.route("/users")
class GetAllUsers(Resource):
    # @jwt_required()
    def get(self):
    
        return jsonify(getUsers())


    def post(self):
        req_data = request.get_json()
        username = req_data["username"]
        password = req_data["password"]

        return jsonify(createUser(username, password))


@api.route("/users/<id>")
class GetSingleUser(Resource):
    def get(self, id):

        return jsonify(getSingleUser(id))


@api.route("/messages/<topic>")
class GetMessagesByTopic(Resource):
    def get(self, topic):
        return jsonify(getMessagesByTopic(topic))


@api.route("/token", methods=["POST"])
class CreateToken(Resource):
   
    def post(self):

        req_data = request.get_json()
        username = req_data["username"]
        password = req_data["password"]

        for i in checkUser(username):
            if i["username"] == username and bcrypt.checkpw(
                password.encode(), i["password"].encode()
            ):
                
                access_token = create_access_token(identity=username)
                response = {"access_token": access_token}
                return response

        return {"msg": "Username or password incorrect"}, 401


@api.route("/logout", methods=["POST"])
class Logout(Resource):
    def post(self):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response


@api.route("/activeusers")
class activeUsers(Resource):
    def get(self):
        
        return jsonify(getActiveUsers())

@api.route("/activateuser", methods=["POST"])
class activeUsers(Resource):
    def post(self):

        req_data = request.get_json()
        username = req_data["username"]
        
        return jsonify(activateUser(username))
      


@api.route("/deactivateuser", methods=["POST"])
class activeUsers(Resource):
    def post(self):

        req_data = request.get_json()
        username = req_data["username"]
        
        return jsonify(deactiveUser(username))


