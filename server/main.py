from flask import send_from_directory
from __init__ import create_app
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


app = create_app()

# app.config"SQLALCHEMY_DATABASE_URI") = os.environ.get("DATABASE_URL")
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


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
