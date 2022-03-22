from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import time

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