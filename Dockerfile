FROM python:3.9-alpine3.20
WORKDIR /app
# Copy and download dependencies
# COPY package.json package-lock.json ./  
# RUN npm ci 
# Copy the source files into the image
COPY . .
EXPOSE 3000
RUN apk update
# RUN apk add --update --no-cache curl py-pip
RUN source Model/tutorial-env/bin/activate
RUN pip install --upgrade pip
# RUN pip install --upgrade pip setuptools wheel
RUN pip install torch
RUN pip install transformers
RUN pip install sentencepiecel
# RUN apk add --no-cache python3-dev libstdc++ && \
#     apk add --no-cache g++ && \
#     ln -s /usr/include/locale.h /usr/include/xlocale.h && \
#     pip3 install numpy
RUN pip install numpy
# RUN apk add openblas-dev
# RUN apk add pkgconf
# RUN apk add gfortran
RUN pip install --default-timeout=100 gensim

RUN apk add py3-scikit-learn
RUN pip install nltk
RUN pip install networkx
RUN pip install pyvi
CMD npm start