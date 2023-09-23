import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


model_filename = 'cosine_similarity_model.pkl'

# Load the model from the file
book_pivot = joblib.load(model_filename)

similarity_scores = cosine_similarity(book_pivot)

books = pd.read_csv('data/Books.csv')

def recommend(book_name):
    # index fetch
    index = np.where(book_pivot.index==book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == book_pivot.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        
        data.append(item)
    
    return data

print(recommend('Harry Potter and the Chamber of Secrets (Book 2)'))

print()