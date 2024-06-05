# script.py
import sys

def parseText(text):
    contents_parsed = text.lower()
    contents_parsed = contents_parsed.replace('\n', '. ')
    contents_parsed = contents_parsed.strip()
    contents_parsed = contents_parsed.replace(';', '')
    contents_parsed = contents_parsed.replace(',', '')
    # result = ""
    # for i in range(0, len(contents_parsed)):
    #     if contents_parsed[i] in range(97,122) or contents_parsed[i] == ' ' or contents_parsed[i] == '.':
    #         result += contents_parsed[i]
    # return result
    return contents_parsed
if __name__ == "__main__":
    text = ""
    with open('Model/tempInput.txt', 'r') as file:
        text = file.read()
    print(text)