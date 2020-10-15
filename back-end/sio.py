import time

import socketio

from game import game
from models.user import users

sio = socketio.Server(async_mode="threading", cors_allowed_origins="*")


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
        if u.name.lower() == name.lower():
            user = u
    if user:
        game.add_user(user)
        sio.emit("login", to=sid)
        return
    sio.emit("error", {"msg": "Cannot login"})


@sio.on("play")
def play(sid, data):
    game.shuffle_questions()

    sio.emit("play", {})
    for i in range(7):
        sio.emit("add_cover_card", {"num": i + 1})
        time.sleep(0.3)
    for i in range(7):
        sio.emit("add_flash_card", {"num": i, "question": game.get_question(i)})
        time.sleep(0.3)
