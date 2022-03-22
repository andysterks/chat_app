from operator import methodcaller
import os
import requests
from flask import request, Blueprint
from flask_restx import Api, Resource

api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)

count = 3

messages = [
    {
        "text": "Some say that our lives are defined by the sum of our choices."
        " But it isn’t really our choices that distinguish who we are."
        " It’s our commitment to them.",
        "user": {"id": 2, "name": "Emily Thorne"},
    },
    {
        "text": "Wow...that's a little deep for an early morning, is it not? 😅",
        "user": {"id": 1, "name": "You"},
    },
    {
        "text": "@Emily - Babe, calm down! 😩",
        "user": {"id": 3, "name": "Jack Porter"},
    },
    {
        "text": "Confucius once said, 'Before you embark on a journey of revenge, dig two graves",
        "user": {"id": 2, "name": "Emily Thorne"},
    },
    {
        "text": "Your blood sugar sounds low, let's get breakfast at the Stowaway!",
        "user": {"id": 1, "name": "You"},
    },
    {
        "text": "@Emily - We agreed, no revenge before breakfast!",
        "user": {"id": 3, "name": "Jack Porter"},
    },
]

users = [{
    "id": "1",
    "name": "You"
},
{
    "id": "2",
    "name": "Emily Thorne"
}, 
{
    "id": "3",
    "name": "Jack Porter"
}


]


@api.route("/messages")
class Message(Resource):
    def get(self):
        # global count
        # count += 1

        return messages

    def post(self):
        global count
        req_data = request.get_json()
        text = req_data["text"]
        user = req_data["user"]

        # for x in data:
        #     if x["user"]["name"] == user["name"]:
        #         count = x["user"]["id"]

        # else:
        #     count +=1

        newMessage = {"id": {}, "text": text, "user": user}
        messages.append(newMessage)


@api.route("/users")
class Message(Resource):
    def get(self):
        return users

    def post(self):
         req_data = request.get_json()
         user = req_data["name"]

         newUser = {"name": user}

         users.append(newUser)
