from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

class T5Summarizer:
    def __init__(self):
        self.model = T5ForConditionalGeneration.from_pretrained(
            "NlpHUST/t5-small-vi-summarization")
        self.tokenizer = T5Tokenizer.from_pretrained("NlpHUST/t5-small-vi-summarization")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu") #kiểm tra xem có GPU không
        self.model.to(self.device) 

    #min length ~~ 500 token = 5 sentences 
    def summarize(self, src: str, min_length = 200, max_length = 500) -> str: 
        tokenized_text = self.tokenizer.encode(src, return_tensors="pt").to(self.device)
        self.model.eval() 
        summary_ids = self.model.generate(
            tokenized_text,
            min_length = min_length, #số lượng token tối thiểu của output, tự tính compresion ratio
            max_length = max_length, 
            num_beams=5, 
            repetition_penalty=2.5, #để tránh lặp từ
            length_penalty=2.0, #để tránh output quá ngắn
            early_stopping=True #dừng sớm nếu kết quả đã đạt yêu cầu
        )
        output = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True) 
        return output
    
