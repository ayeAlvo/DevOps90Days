# docker run -d -p 9999:80 --name portfolio-website nginx:1.29-alpine
# docker cp . portfolio-website:/usr/share/nginx/html/
# docker exec portfolio-website ls -l /usr/share/nginx/html/


## blind mount
# docker run -d -p 9999:80 --name portfolio-website -v $(pwd):/usr/share/nginx/html nginx:1.29-alpine
# docker exec portfolio-website ls -l /usr/share/nginx/html/

## volumen
# docker volume create portfolio-vol
# docker run -d -p 9999:80 --name portfolio-website -v portfolio-vol:/usr/share/nginx/html nginx:1.29-alpine
# docker exec portfolio-website ls -l /usr/share/nginx/html/

## tipos de lectura y escritura
## RO solo lectura
## RW lectura y escritura