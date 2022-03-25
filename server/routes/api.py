from flask import request, Blueprint, jsonify
from flask_restx import Api, Resource
import hashlib
from server.data import *


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
    def get(self, topic):
        return jsonify(getMessagesByTopic(topic))