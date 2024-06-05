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
    content = "Sân chơi cho trẻ em vẫn chỉ là khẩu hiệu.Mỗi khi hè về, \"Tháng hành động vì trẻ em\" tới, chuyện sân chơi cho thiếu nhi lại được nhiều người quan tâm hơn. Nhưng hè nào cũng vậy, trẻ vẫn cứ thiếu chỗ chơi. Những đô thị lớn như HN và TP HCM cũng không là ngoại lệ. Thường ngày, các điểm sinh hoạt văn hoá - thể thao dành cho thiếu nhi ở HN đã luôn quá tải. Đặc biệt là ở Cung Thiếu nhi, người ta đã phải tận dụng tối đa cơ sở vật chất, huy động thêm nhiều cộng tác viên, tăng ca học cả buổi tối. Công viên nước Hồ Tây cũng là một điểm thu hút đông trẻ em tới tham gia sinh hoạt, cho dù nơi đây giá vé không phải là \"mềm\" và không phải các trò chơi đều phù hợp với thiếu nhi. Trong khi đó, công viên Thủ Lệ (hay còn gọi là Vườn thú HN) có diện tích rộng, nhưng lại không \"bắt mắt\" trẻ, bởi chuồng thú thì hôi, hàng quán choán hết lối đi. Công viên Thống Nhất có địa thế đẹp, gần trung tâm thành phố, dễ tổ chức các khu vui chơi giải trí cho trẻ, nhưng lại rất ít các trò chơi mới. Những trò như: nhà gương, đu quay. . đã nhàm chán. Trong công viên, đây đó còn xuất hiện những chợ cóc bán tạp nham đủ thứ. Cảnh \"tình tự\" ở nhiều công viên diễn ra vô tư trước mắt trẻ. Các bậc phu huynh rất ngại cho con mình chơi đùa, sợ giẫm phải kim tiêm của dân chích hút. Trong khi các công viên chưa đáp ứng được nhu cầu chính đáng của mọi người dân, đặc biệt là trẻ em, thì hệ thống các nhà văn hoá thiếu nhi ở HN lại rất thiếu, nặng về hình thức. Phần lớn số 1.700 điểm vui chơi cấp phường, xã trên địa bàn HN chưa được xây dựng hoàn chỉnh, hoặc để đất trống. Thậm chí ở nhiều khu dân cư, các điểm vui chơi của trẻ em đã bị thu hẹp lại hoặc bị lấn chiếm, sử dụng sai mục đích. Tại khu chung cư Thanh Xuân Bắc, đơn vị thi công đã tự ý thay đổi công năng diện tích dành cho thiếu nhi. Rạp Kim Đồng - nơi một thuở chuyên chiếu phim cho thiếu nhi - nay bị chiếm làm quán bán bia. Một vài điểm vui chơi như Sega, Star Bowl, Cosmos. . luôn có nhiều thiếu nhi tới chơi, nhưng chủ yếu là con em gia đình khá giả, bởi giá vé ở đây khá cao. Tại TPHCM hiện cũng chưa một công trình nào được xây dựng đúng nghĩa là sân chơi dành cho thiếu nhi. Nhà văn hoá thiếu nhi thành phố có mặt bằng rộng, thu hút đông bạn nhỏ, đang trở thành quá tải, nhất là trong dịp hè và lễ hội. 24 nhà văn hoá thiếu nhi quận, huyện ngoài việc có dành chỗ cho thiếu nhi sinh hoạt, thì còn cho thuê mướn mặt bằng, hoặc \"tranh thủ\" mở đủ loại dịch vụ cho người lớn. Trong 4 \"Ngày hội tuổi thơ\" dịp 1.6, Nhà văn hoá thiếu nhi thành phố có trên 15.000 lượt người đến vui chơi. Trong khi đó, vào ngày thường, nơi đây chỉ đủ đón 1.000-1.500 trẻ. Trung bình mỗi tuần có trên 20.000 lượt trẻ tập trung ở khu vực này. Cũng hằng tuần, từ các tỉnh như Bình Dương, Đồng Nai, có hàng đoàn xe chở trẻ em đến Nhà văn hoá thiếu nhi của TP HCM để sinh hoạt, học các môn năng khiếu. Học sinh các huyện Hóc Môn, Củ Chi cũng đổ về đây cuối tuần. Do không đủ chỗ, các em vẫn phải ra ngồi học ở ghế đá. Lớp học chia làm nhiều suất. Phụ huynh phải trải chiếu ngồi đợi con em mình. Thỉnh thoảng, nhà văn hoá thiếu nhi thành phố lại đón trẻ ở các mái ấm, nhà mở về vui chơi, nên càng quá tải hơn. Khi dự án mở rộng đường Nam Kỳ Khởi Nghĩa thực thi, một phần diện tích không nhỏ của nơi này sẽ bị mất đi. Sân chơi vốn đã chật sẽ càng hẹp hơn. Ban lãnh đạo Nhà văn hoá thiếu nhi đang đề xuất UBND TP cho mở địa điểm ở vùng ven, hoặc xây dựng nhà văn hoá thiếu nhi mới quy mô hơn, nhưng đến nay vẫn chưa thực hiện được. Tại quận 1, Nhà văn hoá thiếu nhi khá khang trang, nhưng hội trường chính đã trở thành. . rạp kịch của sân khấu Idecaf. Ở đây chỉ có phòng để học, chứ không có trò chơi hay khoảng sân rộng cho trẻ em vui chơi (khoảng sân này đã được trưng dụng thành bãi để xe và quán cà phê). Khu đô thị mới Phú Mỹ Hưng, dù được thiết kế phục vụ an sinh của cộng đồng, nhưng khu vui chơi của trẻ con vẫn thường bị \"bỏ quên\" trong dự án. Theo kiến trúc sư Võ Thành Lân, ở TPHCM chưa có công trình nào dành cho trẻ em đạt chuẩn. Nhiều dự án nhấn mạnh yếu tố làm sân chơi cho thiếu nhi, nhưng làm hay không là chuyện khác."
    content = text
    
    contents_parsed = parseText(content)

    sentences = nltk.sent_tokenize(contents_parsed) 

    w2v = KeyedVectors.load_word2vec_format("./Model/word2vec/vi.vec")
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
    else:
        textRank(X, max_sentences, sentences)

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

#
# def semantic_based(summary, full_text):
#     try:
#         summary_sentences = sent_tokenize(summary)
#         full_text_sentences = sent_tokenize(full_text)

#         vectorizer = CountVectorizer(ngram_range=(1, 3)).fit(full_text_sentences)
#         smr_matrix = vectorizer.transform(summary_sentences).T.toarray()
#         full_text_matrix = vectorizer.transform(full_text_sentences).T.toarray()
#         U0, S0, VT0 = np.linalg.svd(full_text_matrix)
#         U1, S1, VT1 = np.linalg.svd(smr_matrix)

#         vectors0 = [(np.dot(S0, U0[0, :]), np.dot(S0, U0[i, :])) for i in range(len(U0))]
#         vectors1 = [(np.dot(S1, U1[0, :]), np.dot(S1, U1[i, :])) for i in range(len(U1))]
#         angles = [np.arccos(np.dot(a, b) / (norm(a, 2) * norm(b, 2))) for a in vectors0 for b in vectors1]

#         return abs(1 - float(angles[1]) / float(pi / 2))
#     except:
#         print("Bug with semantic based evaluation")
#         return 0.0

if __name__ == "__main__":
    main()