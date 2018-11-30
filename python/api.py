import json	#jsonを扱う?
from flask import Flask, request, jsonify #flaskライブラリ
import pymysql #mysql関連ライブラリ

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False #日本語文字化け対策
app.config["JSON_SORT_KEYS"] = False #ソートをそのまま<Paste>

@app.route('/')
def hello():
	name = "Hoge"
	#db setting
	db = pymysql.connect(
		host='localhost',
		port=5353,
		#port=3600,
		user='root',
		password='example',
		db='manage_worker',
		charset='utf8',
		cursorclass=pymysql.cursors.DictCursor,
		)

	cur = db.cursor()
	sql = "select * from employer"
	cur.execute(sql)
	members = cur.fetchall()
	print(type(members));
	print(members);
	cur.close()
	db.close()

	return jsonify({
        'status':'OK',
        'members':members
        })

## おまじない
#if __name__ == "__main__":
#	app.run(debug=True)

def main():
	app.run(debug=True, host='0.0.0.0', port=5000);

main();
