import pandas as pd
import os
import django



os.environ['DJANGO_SETTINGS_MODULE'] = 'books_api.settings.production'
django.setup()

from core_apps.recommender.models import Author, Publisher, Book



# Path to your CSV file
csv_file_path = 'data/Books.csv'

# Read the CSV file
data = pd.read_csv(csv_file_path)



# Iterate over rows and populate models
for index, row in data.iterrows():
    # Check if the book with the same ISBN already exists
    existing_book = Book.objects.filter(isbn=row['ISBN']).first()

    # If the book with the same ISBN exists, skip adding it again
    if existing_book:
        print(f"Skipping ISBN {row['ISBN']} because it already exists.")
        continue
    name_parts = row['Book-Author'].split()
    last_name = name_parts[-1]
    first_name = " ".join(name_parts[:-1])

    author, created = Author.objects.get_or_create(first_name=first_name, 
        last_name=last_name)
    publisher, created = Publisher.objects.get_or_create(name=row['Publisher'])
    book = Book.objects.create(isbn=row["ISBN"], title=row['Book-Title'], author=author, 
        release_year=row["Year-Of-Publication"], publisher=publisher, 
        cover_image=row["Image-URL-L"])

print("Data imported successfully!")