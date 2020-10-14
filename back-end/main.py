from flask import Flask
import socketio
import time
import random

from models.user import users
from models.question import questions

sio = socketio.Server(async_mode="threading", cors_allowed_origins="*")

app = Flask(__name__)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)


class Game:
    online_users = []
    questions = []

    target = None
    chooser = None

    def __init__(self):
        pass

    def add_user(self, user):
        self.online_users.append(user)

    def shuffle_questions(self):
        self.questions = [*questions]
        random.shuffle(self.questions)
        self.questions = self.questions[:7]

    def get_question(self, i):
        return self.questions[i]


game = Game()


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


app.run(host="0.0.0.0", port=5012, threaded=True, debug=True)
