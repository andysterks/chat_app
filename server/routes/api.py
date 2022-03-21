import os
import requests
from flask import request, Blueprint
from flask_restx import Api, Resource

api_blueprint = Blueprint("api", __name__, url_prefix='/api')
api = Api(api_blueprint)


@api.route("/chatinterface")
class Chat(Resource):
    def get():
        return "Hello World"