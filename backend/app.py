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
    'databaseURL': 'https://hangman-3709c-default-rtdb.firebaseio.com'
})

# Define a route to generate a new game link
@app.route('/new_game', methods=['POST'])
def new_game():
    # Get the user's name and word from the request data
    name = request.json['name']
    word = request.json['word']

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
    return jsonify({'game_link': f'/game/{new_game_id}'})

# Define a route to submit a score
@app.route('/submit_score', methods=['POST'])
def submit_score():
    # Get the user's name, score, and game ID from the request data
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
@app.route('/game/<game_id>/leaderboard')
def game_leaderboard(game_id):
    # Get the game data from the Firebase Realtime Database
    game_data = db.reference('games').child(game_id).get()

    # Get the scores for the current game from the Firebase Realtime Database
    scores_ref = db.reference('scores').order_by_child('game_id').equal_to(game_id).order_by_child('score').limit_to_last(10)
    scores = scores_ref.get()

    # Reverse the order of the scores so that the highest scores are first
    scores = {k: v for k, v in reversed(scores.items())}

    # Create a list of leaderboard entries from the scores data
    leaderboard = []
    for score_id, score_data in scores.items():
        leaderboard.append({
            'name': score_data['name'],
            'score': score_data['score']
        })

    # Return the leaderboard data as a JSON response
    return jsonify({
        'game_data': game_data,
        'leaderboard': leaderboard
    })


@app.route('/')
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True)
