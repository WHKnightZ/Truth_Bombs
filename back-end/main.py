import socketio
from flask import Flask

from sio import sio

app = Flask(__name__)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)


app.run(host="0.0.0.0", port=5012, threaded=True, debug=True)
