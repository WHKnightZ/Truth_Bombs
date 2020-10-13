from flask import Flask
import socketio
import time

from models.user import users
from models.question import questions

sio = socketio.Server(async_mode="threading", cors_allowed_origins="*")

app = Flask(__name__)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

online_users = []


@sio.event
def connect(sid, environ):
    print("connect: ", sid)


@sio.event
def disconnect(sid):
    print("disconnect: ", sid)


@sio.on("login")
def on_login(sid, data):
    name = data["name"]
    user = None
    for u in users:
        if u.name == name:
            user = u
    if user:
        if user not in online_users:
            online_users.append(user)
        user = {"name": user.name, "gender": user.gender}
        sio.emit("login", user, to=sid)
        return
    sio.emit("error", {"msg": "Cannot login"})


@sio.on("play")
def play(sid, data):
    sio.emit("play", {})
    for i in range(7):
        sio.emit("add_cover_card", {"num": i + 1})
        time.sleep(0.5)
    for i in range(7):
        sio.emit("add_flash_card", {"num": i, "question": "xxx"})
        time.sleep(0.5)


app.run(host="0.0.0.0", port=5012, threaded=True, debug=True)
