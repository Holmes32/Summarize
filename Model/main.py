# -*- coding: utf-8 -*-
import nltk
import numpy as np
import networkx as nx
import sys
from gensim.models import KeyedVectors
from pyvi import ViTokenizer
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from nltk import sent_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from numpy.linalg import norm
from t5 import T5Summarizer


def parseText(text):
    contents_parsed = text.lower()
    contents_parsed = contents_parsed.replace('\n', '. ')
    contents_parsed = contents_parsed.strip()
    # result = ""
    # for i in range(0, len(contents_parsed)):
    #     if contents_parsed[i] in range(97,122) or contents_parsed[i] == ' ' or contents_parsed[i] == '.':
    #         result += contents_parsed[i]
    # return result
    return contents_parsed

def main():
    text = ""
    with open('./Model/tempInput.txt', 'r') as file:
        text = file.read()
    algorithm = sys.argv[1]
    language = sys.argv[2]
    compression = int(sys.argv[3]) 
    content = text
    
    contents_parsed = parseText(content)

    sentences = nltk.sent_tokenize(contents_parsed) 
    if (language == "vietnamese"):
        w2v = KeyedVectors.load_word2vec_format("./Model/word2vec/vi.vec")
    else:
        w2v = KeyedVectors.load_word2vec_format("./Model/word2vec/GoogleNews-vectors-negative300.bin.gz", binary=True)
    vocab = w2v.key_to_index #Danh sách các từ trong từ điển
    X = []
    for sentence in sentences:
        sentence_tokenized = ViTokenizer.tokenize(sentence)
        words = sentence_tokenized.split(" ")
        sentence_vec = np.zeros((100))
        for word in words:
            if word in vocab:
                sentence_vec+=w2v.key_to_index[word]
        X.append(sentence_vec)

    max_sentences = int(len(sentences) * compression / 100) 
    if algorithm == "clustering":
        clustering(X, max_sentences, sentences)
    elif algorithm == "lsa":
        lsa(X, max_sentences, sentences)
    elif algorithm == "textRank":
        textRank(X, max_sentences, sentences)
    else:
        vit5 = T5Summarizer()
        summary = vit5.summarize(contents_parsed)
        print(summary)

def clustering(X, max_sentences, sentences):
   #Clustering
    kmeans = KMeans(n_clusters=max_sentences)
    kmeans = kmeans.fit(X)

    avg = []
    for j in range(max_sentences):
        idx = np.where(kmeans.labels_ == j)[0]
        avg.append(np.mean(idx))
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, X)
    top_sentences = sorted(range(max_sentences), key=lambda k: avg[k])
    summary = ' '.join([sentences[closest[idx]] for idx in top_sentences])
    print(summary) 

def lsa(X, max_sentences, sentences):
    # LSA
    sent_vectors_t = np.array(X).T
    U, S, VT = np.linalg.svd(sent_vectors_t)
    saliency_vec = np.dot(np.square(S), np.square(VT))
    top_sentences = saliency_vec.argsort()[-max_sentences:][::-1]
    top_sentences.sort()
    summary = ' '.join([sentences[idx] for idx in top_sentences])
    print(summary)

def textRank(X, max_sentences, sentences):
    # TextRank
    sim_mat = np.zeros([len(sentences), len(sentences)])
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i != j:
                sim_mat[i][j] = cosine_similarity(X[i].reshape(1, -1),
                                                    X[j].reshape(1, -1))[0][0]

    nx_graph = nx.from_numpy_array(sim_mat)
    scores = list(nx.pagerank(nx_graph).values())
    top_sentences = np.argsort(scores)[-max_sentences:][::-1]
    top_sentences.sort()
    summary = ' '.join([sentences[idx] for idx in top_sentences])
    print(summary)

#
def content_based(summary, full_text):
    sentences = sent_tokenize(full_text)

    vectorizer = CountVectorizer().fit(sentences)
    full_text_vector = vectorizer.transform([full_text])
    summary_vector = vectorizer.transform([summary])

    score = cosine_similarity(full_text_vector, summary_vector)[0][0]

    return score


if __name__ == "__main__":
    main()