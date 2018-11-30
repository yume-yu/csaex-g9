#元になるイメージ
FROM centos:latest

#作成者
MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

#ビルド時に実行されるコマンド
RUN yum install -y epel-release http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
RUN yum install -y nginx php73-php-fpm php73 php73-php-mysql php73-php-pdo
COPY php.ini /etc/opt/remi/php73/php.ini
COPY php-fpm.conf /etc/opt/remi/php73/php-fpm.d/www.conf
COPY adminer.conf /etc/nginx/conf.d/default.conf
COPY adminer.php /usr/share/nginx/html/index.php
COPY tempdir.conf /etc/tmpfiles.d/php-fpm.conf
RUN rm /usr/share/nginx/html/index.html
RUN systemctl enable nginx
RUN systemctl enable php73-php-fpm
#ポート開放
EXPOSE 80

#runした時にbind起動
CMD ["/sbin/init"]
