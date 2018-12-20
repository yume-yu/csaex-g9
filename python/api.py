import json  #jsonを扱う?
from flask import Flask, session, request, redirect, jsonify ,make_response#flaskライブラリ
import pymysql #mysql関連ライブラリ
import os
from datetime import datetime

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False #日本語文字化け対策
app.config["JSON_SORT_KEYS"] = False #ソートをそのまま
app.config['SECRET_KEY'] = os.urandom(24)
#cookieをhttp以外も読めるようにするオプション。cookieが暗号化されてるのでそもそもjsで読んでも意味ない
#app.config['SESSION_COOKIE_HTTPONLY'] = False
app.secret_key = os.urandom(24)

from ldap3 import ObjectDef, AttrDef, Reader, Writer,Server, Connection, ALL

ldap_server_data = {"host":"ldap",
                    "port":389,
                    "password":"jikken2018"}

userdata = {"user":"c0116999xx",
            "password":"qwertyuiop"}

def do_nothing():
  return 0

def add_WA(flag):
  if flag:
    return " Where "
  else:
    return " AND "

@app.route('/login',methods=["POST"])
def login():
  #受け取ったのがjsonかどうか確認
  if request.headers['Content-Type'] != 'application/json':
    print(request.headers['Content-Type'])
    return jsonify(res='error'), 400 # jsonでなければエラーを返す

  try:
    #必要なデータの取り出し
    username = request.json["userid"]
    passwd = request.json["password"]
  except:
    return jsonify({'status':'NG'})

  #与えられたidとパスワードで検索文字列を生成
  search_filter = '(&(uid='+username+')(userPassword='+passwd+'))'
  #検索の実施
  if ldap_connect.search('ou=People,dc=group9,dc=local', search_filter, attributes=['uid','displayName']) :
    if len(ldap_connect.entries) == 1:
      session['username'] = username;
      session['displayName'] = str(ldap_connect.entries[0]['displayName'])
      return jsonify({'status':'OK'})
  return jsonify({'status':'NG'})

#ログイン状態の確認
@app.route('/check_auth')
def check_auth():
  if 'username' in session:
      return jsonify({'status':'OK','info':{'userid':session.get('username'),'displayName':session.get('displayName')}})
  return jsonify({'status':'NG'})

@app.route('/logout')
def logout():
  session.pop('username', None)      #クッキーの無効化
  session.pop('displayName', None)  #同上
  return jsonify({'status':'OK'})

#商品登録
@app.route('/insertItem',methods=["POST"])
def Insert():
  #受け取ったのがjsonかどうか確認
  if request.headers['Content-Type'] != 'application/json':
    print(request.headers['Content-Type'])
    return flask.jsonify(res='error'), 400 # jsonでなければエラーを返す


  try:
    db = getConnection()
    cur = db.cursor()
    check_count = "select count(*) from Products"
    cur.execute(check_count)
    count_data = cur.fetchall()
    print(count_data);
    now_count = count_data[0]['count(*)']
    cur.close()
    cur = db.cursor()
    sql = "INSERT INTO Products VALUES ("+str(now_count+1)+",'"+request.json["name"]+"','"+request.json["descript"]+"','"+request.json["image"]+"','"+str(request.json["owner"])+"');"
    print(sql)
    cur.execute(sql)
    db.commit()
    Items = cur.fetchall()


    cur.close()
    db.close()
  except:
    return jsonify({'status':'NG'})

  return jsonify({'status':'OK'})

#商品削除
@app.route('/deleteItem',methods=["POST"])
def Delete():
  #受け取ったのがjsonかどうか確認
  if request.headers['Content-Type'] != 'application/json':
    print(request.headers['Content-Type'])
    return flask.jsonify(res='error'), 400 # jsonでなければエラーを返す

  try:
    db = getConnection()
    cur = db.cursor()
    sql = "update Products set active = 0 WHERE id = "+request.json["id"]+";"
    print(sql)
    cur.execute(sql)

    db.commit()

    cur.close()
    db.close()

    return jsonify({
      'status':'OK'
      })

  except:
    return jsonify({'status':'NG'})

#データベース内容閲覧(詳細)
@app.route('/')
def Default():
  try:
    #データベースに接続
    db = getConnection()

    #操作方法(カーソル)を指定
    cur = db.cursor()

    #SQL文(メインステップ)
    sql = "SELECT count(*) FROM Products"

    #カーソルに対しSQL文実行
    cur.execute(sql)

    #フェッチ
    members = cur.fetchall()


    print(members[0]['count(*)'])
    #カーソル、データベースを閉じる
    cur.close()
    db.close()

    #jsonで返答
    return jsonify({'status':'OK','members':members})

  #catch相当
  except:
    return jsonify({'status':'NG'})


#データベースに接続する設定の汎用化
def getConnection():
  try:
    db=pymysql.connect(
    host='mariadb',
    user='api_user',
    password='jikken2018',
    db='TeuFreeMarket',
    charset='utf8',
    cursorclass=pymysql.cursors.DictCursor,
    )
  except:
    print('can not Connect DB')
  return db

@app.route('/test')
def check_move():
  test = "test"
  test = test + "hoge"
  return test

@app.route('/search',methods=["POST"])
def search_in_products():
  #受け取ったのがjsonかどうか確認
  if request.headers['Content-Type'] != 'application/json':
    print(request.headers['Content-Type'])
    return flask.jsonify(res='error'), 400 # jsonでなければエラーを返す
  is_first_arg = True
  sql = "select * from Products"
  #必要なデータの取り出し
  try:
    userid = request.json["userid"]
  except:
    do_nothing()
  else:
    sql = sql + add_WA(is_first_arg)
    sql = sql + "owner LIKE '" +str(userid)+ "'"

  try:
    productname = request.json["productname"]
  except:
    do_nothing()
  else:
    sql = sql + add_WA(is_first_arg)
    sql = sql + "name LIKE '%"+str(productname)+"%'"

  limit = 50 #検索上限値のデフォルト50
  try:
    limit = request.json["limit"]
  except:
    do_nothing()
  sql = sql + " LIMIT "+str(limit)

  db = getConnection() # db接続
  cur = db.cursor()
  cur.execute(sql)
  items = cur.fetchall()
  cur.close()
  db.close()
  return jsonify({'status':'OK',
                  'items':items})

def main():
  global ldap_connect
  ldap_connect= Connection(
      Server( host=ldap_server_data["host"],
              port=ldap_server_data["port"],
              use_ssl=False,
              get_info='ALL'),
              user='cn=Manager,dc=group9,dc=local',
              password=ldap_server_data["password"],
              auto_bind=True);
  app.run(debug=True, host='0.0.0.0', port=5000);

main();
