#元になるイメージ
FROM centos:latest

#作成者
MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

#ビルド時に実行されるコマンド
ADD ./nginx.repo /etc/yum.repos.d/nginx.repo
ADD ./default.conf /etc/nginx/conf.d/default.conf
RUN chown root:root /etc/yum.repos.d/nginx.repo
RUN chown root:root /etc/nginx/conf.d/default.conf
RUN chmod 644 /etc/yum.repos.d/nginx.repo
RUN chmod 644 /etc/nginx/conf.d/default.conf
RUN yum install -y nginx
#ポート開放
EXPOSE 80

#runした時にbind起動
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
