from email import message
from venv import create
from flask import Flask, send_from_directory
from . import create_app
from flask_restx import Api, Resource


app = create_app()


@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
    