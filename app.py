import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, render_template
import flask_cors
from werkzeug.utils import secure_filename
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import time

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
			return redirect(request.url)
	
	return render_template('index.html')

class ChangeHandler(FileSystemEventHandler):
    # すべてのイベント
    def on_any_event(self, event):
        print('[全て]',event)

    # 作成された時のイベント
    def on_created(self, event):
        print('[作成]',event)

    # 変更されたときのイベント
    def on_modified(self, event):
        print('[変更]', event)

    # 削除された時のイベント
    def on_deleted(self, event):
        print('[削除]',event)

    # 移動した時のイベント
    def on_moved(self, event):
        print('[移動]',event)

observer = Observer()
# 監視するフォルダを第２引数に指定
observer.schedule(ChangeHandler(), './img', recursive=True)
# 監視を開始する
observer.start()

while True:
    time.sleep(5)

app.run(port=5000, debug=True)