# 学内フリマサイト
学部応用実験でフリマサイトをサーバも含めて作成する。

# 使い方
dockerとdocker-composeが使用できる環境を用意する
```
$ git clone https://github.com/yume-yu/csaex-g9.git
$ cd csaex-g9
$ docker-compose build
$ docker-commpose up
```

# 各コンテナについて
## Webサーバ
* サービス

  nginx
* ホスト名

  nginx
* ドキュメントルート

  web/
* ポートフォワード

  Container:80 -> host:80

## データベース
* サービス

  mariaDB(mysql)
* ホスト名

  mariadb
* ポートフォワード

  Container:3306 -> host:3306
* 認証情報

  User: api\_user<br>
  Password: jikken2018

## adminer
* ポートフォワード

  Container:80 -> host:8080
## api
* サービス

  python(flask)
* ホスト名

  api
* ポートフォワード

  Container:5000 -> host:5000<br>
  Container:5000/udp -> host:5000/udp

* 起動時実行ファイル

  python/api.py
