from flask import Flask
from flask_jwt_extended import (
    JWTManager,
    get_jwt,
    get_jwt_identity,
    create_access_token,
)
from datetime import date, datetime, timedelta
import os
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_folder="../frontend/build")
from server.routes.api import api_blueprint
app.register_blueprint(api_blueprint)
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.host = "localhost"
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

def create_app():

    return app


def get_socket():
    return socketio

def get_jwt():
    return jwt