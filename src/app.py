from curses import flash
import os
from flask import Flask, request, redirect, url_for, send_from_directory
import flask_cors
from werkzeug.utils import secure_filename
from src import app

UPLOAD_FOLDER = './imgs'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg'])

app = Flask(__name__, static_folder='.', static_url_path='')
app.config[UPLOAD_FOLDER] = UPLOAD_FOLDER

def allwed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		
		file = request.files['file']
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		
		if file and allwed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			return redirect(url_for('uploaded_file', filename=filename))
		

	return app.send_static_file('templates/index.html')

app.run(port=5000, debug=True)
