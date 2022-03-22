#  $ flask run を実行する前に
※ 階層構造勝手ながら変更したので。。。

src/ ディレクトリにて
    ## Macの場合
    export FLASK_APP=app
    export FLASK_ENV=development

    ## Windowsの場合
    set FLASK_APP=app
    set FLASK_ENV=development
と打ち込んで環境変数の値を変更してください。

$ pwd
2022_b/src
$ echo $FLASK_APP
app
$ echo $FLASK_ENV
development

これらを確認した状態で
$ flask run
すると動作すると思います！
