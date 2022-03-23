#  $ flask run を実行する前に

src/ ディレクトリにて
    ## Windowsの場合（コマンドプロンプト）
    set FLASK_APP=app
    set FLASK_ENV=development

    ## Macの場合（terminal）
    export FLASK_APP=app
    export FLASK_ENV=development
と打ち込んで環境変数の値を変更してください。

環境変数の確認の仕方（Windowsは正しいか分かりません）
    ## Windowsの場合（コマンドプロンプト））
    $ @cd
    2022_b/
    $ echo %FLASK_APP%
    app
    $ echo %FLASK_ENV%
    development

    ## Macの場合（terminal））
    $ pwd
    2022_b/
    $ echo $FLASK_APP
    app
    $ echo $FLASK_ENV
    development


これらを確認した状態で
$ flask run
すると動作すると思います！

(追記)
$ pip install geojson
も必要です。