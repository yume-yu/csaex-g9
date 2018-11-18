#元になるイメージ
FROM centos:latest

#作成者
MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

#ビルド時に実行されるコマンド
CMD curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup |  bash
CMD yum install MariaDB-server MariaDB-client
CMD systemctl enable mariadb

#RUNしたときに実行されるコマンド
RUN /sbin/init
