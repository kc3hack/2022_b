import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, render_template
import flask_cors
from werkzeug.utils import secure_filename
import gps_info

UPLOAD_FOLDER = './img'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg'])

app = Flask(__name__, static_folder='.', static_url_path='')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["SECRET_KEY"] = "sample1203"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET','POST'])
def upload_file():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part', "failed1")
			return redirect(request.url)
		
		file = request.files['file']
		if file.filename == '':
			flash('No selected file', "failed2")
			return redirect(request.url)
		
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			fname = './img/' + filename
			gpsdata = gps_info.get_gps(fname)
			print(gpsdata)
			return redirect(request.url)
	
	return render_template('index.html')

app.run(port=5000, debug=True)