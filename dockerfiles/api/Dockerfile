#元になるイメージ
FROM python:latest

#作成者
MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

#ビルド時に実行されるコマンド
RUN pip install flask pymysql
#ポート開放
EXPOSE 5000

#runした時にbind起動
CMD ["python", "/home/python/api.py"]
