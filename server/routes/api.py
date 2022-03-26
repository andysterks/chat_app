from flask import request, Blueprint, jsonify
from flask_restx import Api, Resource
import hashlib
from server.data import *
from flask_jwt_extended import create_access_token, unset_jwt_cookies,\
    jwt_required


api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)




@api.route("/messages")
class Message(Resource):
    # @jwt_required()
    def get(self):

        return jsonify(getMessages())

    def post(self):
        req_data = request.get_json()
        userId = req_data["userId"]
        text = req_data["text"]
        topic = req_data["topic"]

        return jsonify(createMessage(userId, text, topic))


@api.route("/users")
class GetAllUsers(Resource):
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


# @api.route("/messages/<messageId>")
# class GetSingleMessage(Resource):
#     def get(self, messageId):
#         return jsonify(getSingleMessage(messageId))


@api.route("/messages/<topic>")
class GetMessagesByTopic(Resource):
    # @jwt_required()
    def get(self, topic):
        return jsonify(getMessagesByTopic(topic))





@api.route("/token", methods=["POST"])
class CreateToken(Resource):
    def post(self):
        
        req_data = request.get_json()
        username = req_data["username"]
        password = req_data["password"]
        if username != "test" or password != "test":
            return {"msg": "Username or password incorrect"}, 401

        access_token = create_access_token(identity=username)
        response = {"access_token":access_token}
        return response


@api.route("/logout", methods=["POST"])
class Logout(Resource):
    def post(self):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response