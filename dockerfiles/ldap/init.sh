#!/bin/bash
#echo olcRootPW:$(slappasswd -s jikken2018) >> /add_rootpw.ldif
#ldapadd -Y EXTERNAL -H ldapi:/// -f /add_rootpw.ldif
#ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/cosine.ldif
#ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/nis.ldif
#ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/inetorgperson.ldif
#echo olcRootPW:$(slappasswd -s jikken2018) >> /changedomain.ldif
#ldapmodify -Y EXTERNAL -H ldapi:/// -f /changedomain.ldif
#cat /etc/openldap/slapd.d/cn\=config/olcDatabase\=\{2\}hdb.ldif
#ldapadd -x -D "cn=Manager,dc=group9,dc=local" -w jikken2018 -f /add_object.ldif
#ldapadd -x -D "cn=Manager,dc=group9,dc=local" -w jikken2018 -f /add_users.ldif
#ldapsearch -x -w jikken2018 -D "cn=Manager,dc=group9,dc=local" -b "ou=People,dc=group9,dc=local"
chown -R ldap:ldap /var/lib/ldap
chown -R ldap:ldap /etc/openldap/slapd.d
exec /sbin/init
