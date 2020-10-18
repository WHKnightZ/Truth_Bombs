import time

import socketio
import random

from game import game
from models.user import users

sio = socketio.Server(async_mode="threading", cors_allowed_origins="*")


def choose_player(_type):
    online_users = game.online_users
    num_users = len(online_users)
    u = random.randint(0, num_users - 1)
    for i in range(num_users * 2 + u):
        sio.emit("choose_player", online_users[i % num_users]["name"])
        time.sleep(0.05)
    delay = 0.05
    for i in range(num_users * 2 + u, num_users * 3 + u):
        sio.emit("choose_player", online_users[i % num_users]["name"])
        delay += 0.02
        time.sleep(delay)
    sio.emit("choose_target", {"name": online_users[u]["name"], "type": _type})
    return online_users[u]


def choose_questioner():
    pass


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
    if name:
        for u in users:
            if u["name"].lower() == name.lower():
                user = u
        if user:
            game.add_user(user)
            sio.emit("login", data=game.online_users, to=sid)
            return
    sio.emit("login", data=game.online_users, to=sid)
    # sio.emit("error", {"msg": "Cannot login"})


@sio.on("play")
def play(sid, data):
    if game.is_playing:
        return
    game.is_playing = True
    game.is_idle = False
    sio.emit("choosing", "Choosing a Target")
    game.target = choose_player("target")
    game.online_users.remove(game.target)
    time.sleep(2)
    sio.emit("choosing", "Choosing a Questioner")
    game.questioner = choose_player("questioner")
    time.sleep(3)

    game.shuffle_questions()

    sio.emit("play", {})
    for i in range(7):
        sio.emit("add_cover_card", {"num": i + 1})
        time.sleep(0.3)
    # for i in range(7):
    #     sio.emit("add_flash_card", {"num": i, "question": game.get_question(i)})
    #     time.sleep(0.3)


@sio.on("choose_question")
def on_choose_question(sid, data):
    i = data["name"]
    # if chooser != questioner return
    sio.emit("add_flash_card", {"num": i, "question": game.get_question(i)})
