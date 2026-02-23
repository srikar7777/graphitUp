FROM mcr.microsoft.com/playwright/python:v1.40.0-jammy

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY app/ ./app/

# Expose port
EXPOSE 8000

# Run Uvicorn using the PORT env var provided by Railway (default 8000)
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
