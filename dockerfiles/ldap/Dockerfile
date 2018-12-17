FROM centos:latest

#作成者
MAINTAINER yume_yu <c0116248c3@edu.teu.ac.jp>

RUN yum install -y openldap openldap-clients openldap-devel openldap-servers
RUN cp -a /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
RUN systemctl enable slapd
COPY init.sh /init.sh
COPY add_rootpw.ldif /add_rootpw.ldif
COPY add_object.ldif /add_object.ldif
COPY add_users.ldif /add_users.ldif
COPY changedomain.ldif /changedomain.ldif
RUN chmod +x init.sh

CMD ["./init.sh"]
