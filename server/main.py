from flask import Flask, send_from_directory
from . import create_app
from flask_restx import Api, Resource
from datetime import date, datetime, timedelta
import os
from flask_jwt_extended import JWTManager, get_jwt, get_jwt_identity, create_access_token, \
    unset_jwt_cookies, jwt_required
from pytz import timezone
import json

app = create_app()

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
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



@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
   
    return send_from_directory(app.static_folder, 'index.html')

# @app.route('/chat')
# def Hello():
    
#     return "Hello World"
  



if __name__ == '__main__':
    app.run(debug=True)
    