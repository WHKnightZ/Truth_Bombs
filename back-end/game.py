import random

from models.question import questions
from models.user import users


class Game:
    online_users = []
    questions = [*questions]

    target = None
    questioner = None

    is_playing = False
    is_idle = True

    def __init__(self):
        self.online_users = [*users]

    def add_user(self, user):
        if user not in self.online_users:
            self.online_users.append(user)

    def shuffle_questions(self):
        self.questions = [*questions]
        random.shuffle(self.questions)
        self.questions = self.questions[:7]

    def get_question(self, i):
        return self.questions[i]


game = Game()
