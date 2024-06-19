import numpy as np
from gensim.models import KeyedVectors
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer


class Vectorizer:

    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 3))

    def vectorize(self, sentences):
        return self.tfidf_vectorizer.fit_transform(sentences).toarray()

