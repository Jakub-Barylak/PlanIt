# Use an official Python runtime as a parent image
FROM python:3.11

# Install system dependencies
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for MySQL
ENV MYSQL_DATABASE=planit_db \
    MYSQL_USER=planit_user \
    MYSQL_HOST=localhost \
    MYSQL_PORT=3306 \
    MYSQL_PASSWORD=planit_password

# Allows docker to cache installed dependencies between builds
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Mounts the application code to the image
COPY . code
WORKDIR /code

# Expose the default MySQL port
EXPOSE 8000
EXPOSE 3306

# runs the production server
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]