import time

import socketio
import random

from game import game
from models.user import users

sio = socketio.Server(async_mode="threading", cors_allowed_origins="*")


def choose_player():
    num_users = len(users)
    u = random.randint(0, num_users)
    # for i in range(num_users * 3):
    #     sio.emit("choose_player", i % num_users)
    #     time.sleep(0.05)
    # delay = 0.05
    # for i in range(num_users * 3, u + num_users * 4):
    #     sio.emit("choose_player", i % num_users)
    #     delay += 0.02
    #     time.sleep(delay)
    sio.emit("choose_target", u)
    return None


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
        if u["name"].lower() == name.lower():
            user = u
    if user:
        game.add_user(user)
        sio.emit("login", data=game.online_users, to=sid)
        return
    sio.emit("error", {"msg": "Cannot login"})


@sio.on("play")
def play(sid, data):
    game.target = choose_player()
    return
    # game.chooser = choose_player()

    game.shuffle_questions()

    sio.emit("play", {})
    for i in range(7):
        sio.emit("add_cover_card", {"num": i + 1})
        time.sleep(0.3)
    for i in range(7):
        sio.emit("add_flash_card", {"num": i, "question": game.get_question(i)})
        time.sleep(0.3)
