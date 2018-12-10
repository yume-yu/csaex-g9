FROM centos:latest

MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

#必要リポジトリの追加
RUN yum install -y epel-release http://rpms.famillecollet.com/enterprise/remi-release-7.rpm http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm http://repo.zabbix.com/zabbix/3.4/rhel/7/x86_64/zabbix-release-3.4-1.el7.centos.noarch.rpm
#nginxのインストール
RUN yum install -y nginx
#zabbixディレクトリをdocument_rootにするコンフィグを配置
COPY zabbix.conf /etc/nginx/conf.d/default.conf
#php v7.3のインストール
RUN yum install -y php73 php73-php-fpm php73-php-xml php73-php-ldap php73-php-gd php73-php-mbstring php73-php-bcmath php73-php-mysql
#php設定ファイルの配置
COPY php.ini /etc/opt/remi/php73/php.ini
#zabbix関連パッケージにインストール
RUN yum install -y zabbix-server-mysql zabbix-web-mysql zabbix-agent zabbix-web-japanese
#zabbixのwebページのディレクトリのシンボリックリンクをdocument_rootに作成
RUN ln -s /usr/share/zabbix /var/www/zabbix
RUN systemctl enable nginx
RUN systemctl enable php73-php-fpm
RUN systemctl enable zabbix-server
RUN systemctl enable zabbix-agent
RUN mkdir /var/log/nginx/zabbix
#zabbixWebUIを日本語表示するためのロケール追加設定
RUN localedef -f UTF-8 -i ja_JP ja_JP

CMD ["/sbin/init"]
