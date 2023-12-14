docker exec mysql-db bash -c "exec mysqldump -u root -p'password' --databases 'mrp' > '/root/backups/prueba.sql'" ;

docker cp mysql-db:root/backups/prueba.sql C:\Users\javie\OneDrive\Escritorio/prueba.sql ;

rclone -v copy "C:\Users\javie\OneDrive\Escritorio\prueba.sql" backups:backups ;