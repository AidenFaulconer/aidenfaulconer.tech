FROM liquibase/liquibase

ADD ./changelog /liquibase/changelog

CMD ["sh", "-c", "docker-entrypoint.sh --url=${URL} --username=${USERNAME} --password=${PASSWORD} --classpath=/liquibase/changelog --changeLogFile=dbchangelog.xml update"]