# Uruchamianie kontenerów:
Aby uruchomić kontener należy wpisać następujące polecenie:
```
docker-compose up -d
```
Następnie trzeba zrestartować kontener z api:
```
docmer-compose restart web
```

# Migracje:

```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```
