from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from utils.genVideos import genVideos
from flask import render_template
import mimetypes
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/x-icon', '.ico')
mimetypes.add_type('image/jpeg', '.jpg')

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return Response(render_template('index.html'))

@app.route('/api/videos', methods=['POST'])
def generate_videos():
    if request.method == 'POST':
        params = request.form.to_dict()
        form = params['company']
        num = params['number']
        ideas = genVideos(form, num)
        return jsonify(ideas)

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"code": 200})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
