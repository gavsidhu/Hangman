from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import firebase_admin
from firebase_admin import credentials, db
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# Get the absolute path to the service account key file
key_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json'))

# Initialize Firebase
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://hangman-d0115-default-rtdb.firebaseio.com/'
})

# Define a route to generate a new game link
@app.route('/new_game', methods=['POST'])
def new_game():
    # Get the user's name and word from the request data
    name = request.json['name']
    # convert word to lowercase
    word = request.json['word'].lower()


    # Generate a new game ID
    new_game_id = db.reference('games').push().key

    # Store the new game ID and game data in the Firebase Realtime Database
    game_data = {
        'name': name,
        'word': word,
        'guesses': '',
        'misses': ''
    }
    db.reference('games').child(new_game_id).set(game_data)

    # Return the new game link as a JSON response
    return jsonify({'id': new_game_id})




@app.route('/game/<game_id>')
def get_game_data(game_id):
    # Get the game data from the Firebase Realtime Database
    game_data = db.reference('games').child(game_id).get()

    # Return the game data as a JSON response
    return jsonify(game_data)

# Define a route to display the leaderboard for a specific game
@app.route('/game/<game_id>/leaderboard')
def game_leaderboard(game_id):
    # Get the game data from the Firebase Realtime Database
    game_data = db.reference('games').child(game_id).get()

    scores_ref = db.reference('scores')
    scores_snapshot = scores_ref.order_by_child('game_id').equal_to(game_id).get()

    scores = {}
    for key, value in scores_snapshot.items():
        scores[key] = value
    # Return the leaderboard data as a JSON response
    return jsonify(scores)

# Save the score to the leaderboard when user wins hangman and enters their name
@app.route('/save_score', methods=['POST'])
def save_score():
    name = request.json['name']
    score = request.json['score']
    game_id = request.json['game_id']

    # Store the score in the Firebase Realtime Database
    db.reference('scores').push().set({
        'name': name,
        'score': score,
        'game_id': game_id
    })

    # Return a success message as a JSON response
    return jsonify({'message': 'Score submitted successfully.'})

# Define a route to display the leaderboard for a specific game
@app.route('/main_leaderboard')
def main_leaderboard():
    # Get the scores for the current game from the Firebase Realtime Database
    scores_ref = db.reference('scores')
    scores_snapshot = scores_ref.order_by_child('game_id').equal_to('').get()

    scores = {}
    for key, value in scores_snapshot.items():
        scores[key] = value
    # Return the leaderboard data as a JSON response
    return jsonify(scores)

@app.route('/')
def index():
    return main_leaderboard()


if __name__ == '__main__':
    app.run(debug=True)
