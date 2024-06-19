import numpy as np
import nltk
# from underthesea import word_tokenize
from nltk import sent_tokenize
from nltk.corpus import stopwords
from gensim.utils import simple_preprocess
from pyvi.ViTokenizer import tokenize as word_tokenize

nltk.download('stopwords')
class Preprocessor:
    def __init__(self):
        self.word_tokenizer = word_tokenize
        self.sent_tokenizer = sent_tokenize
        self.normalizer = simple_preprocess
        with open('data/vietnamese_stopsword', 'r', encoding='utf-8') as reader:
            self.vietnamese_stop_words = reader.read().split("\n")
        self.english_stop_words = set(stopwords.words('english'))

    def preprocessing(self, paragraph, language = 'vietnamese'):
        sentences = self.sent_tokenizer(paragraph)
        for i in range(len(sentences)):
            sentence = sentences[i]
            # tokenize
            sent_tokenized = self.word_tokenizer(sentence)

            # remove stop word
            if language == 'vietnamese':
                for stop_word in self.vietnamese_stop_words:
                    if stop_word in sent_tokenized:
                        sent_tokenized = sent_tokenized.replace(stop_word, " ")
            
            else: # english
                for stop_word in self.english_stop_words:
                    if stop_word in sent_tokenized:
                        sent_tokenized = sent_tokenized.replace(stop_word, " ")

            # remove special sign, abundant space

            sent_normalized = self.normalizer(sent_tokenized)

            sentences[i] = " ".join(sent_normalized)
        return sentences
