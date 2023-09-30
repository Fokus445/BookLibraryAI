import pandas as pd
import os
import django

# Get the current directory
current_directory = os.getcwd()

# Move up one level (equivalent to "cd .." in a command line terminal)
parent_directory = os.path.dirname(current_directory)

# Change the current working directory to the parent directory
os.chdir(parent_directory)

print(os.getcwd())

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'book-api.settings')
django.setup()

from core_apps.models import Author, Publisher, Book

# Path to your CSV file
csv_file_path = 'Book.csv'

# Read the CSV file
data = pd.read_csv(csv_file_path)

print(data[100])
exit()
# Iterate over rows and populate models
for index, row in data.iterrows():
    author, created = Author.objects.get_or_create(name=row['author'])
    publisher, created = Publisher.objects.get_or_create(name=row['publisher'])
    book = Book.objects.create(title=row['title'], author=author, publisher=publisher)

print("Data imported successfully!")