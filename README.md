 Tool requirement: nodejs npm, python3.9

Install packages nodejs:
npm install

Init env python:
python -m venv tutorial-env
On Windows, run:
tutorial-env\Scripts\activate
On Unix or MacOS, run:
source tutorial-env/bin/activate

Install packages python:
python -m pip install -r requirements.txt

Download ntlk:
python3 -c "import nltk; nltk.download('all')"

Run project:
npm start