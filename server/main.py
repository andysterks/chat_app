from distutils.log import debug
from socket import SocketIO, socket
from flask import send_from_directory
import socketio

# from __init__ import create_app
from . import create_app, get_jwt 
from flask_restx import Api, Resource
from datetime import date, datetime, timedelta
import os
from flask_jwt_extended import (
    JWTManager,
    get_jwt,
    get_jwt_identity,
    create_access_token,
)
import json
from flask_socketio import SocketIO, send


app = create_app()
jwt = get_jwt()

# socketio = SocketIO(app, cors_allowed_origins="*")

# socketio.emit("new_message", {"text":"Hello"})


# @socketio.on("message")
# def handleMessage(msg):
#     print("Message: " + msg)
#     send(msg, broadcast=True)
#     return None


# @socketio.on("connect")
# def handleConnect():
#     print("connected now")


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.utcnow()
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response

    except (RuntimeError, KeyError):
        return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):

    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True)
    # socketio.run(app, debug=True)
