import random

from models.question import questions


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
