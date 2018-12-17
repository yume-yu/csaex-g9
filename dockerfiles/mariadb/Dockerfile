#元になるイメージ
FROM centos:latest

#作成者
MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

#ビルド時に実行されるコマンド
RUN curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup |  bash
RUN yum install -y MariaDB-server MariaDB-client
RUN systemctl enable mariadb
COPY init.sh /init.sh
RUN chmod +x init.sh

#CMD ["/start_mariadb.sh","&&","less /dev/null"]
CMD ["./init.sh"]
