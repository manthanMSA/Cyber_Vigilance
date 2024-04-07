from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from langchain_community.llms import HuggingFaceEndpoint
from langchain import PromptTemplate, LLMChain
import json

app = Flask(__name__)
CORS(app)

ENDPOINT_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
llm = HuggingFaceEndpoint(
    endpoint_url=ENDPOINT_URL,
    max_new_tokens=512,
    top_k=10,
    top_p=0.95,
    typical_p=0.95,
    temperature=0.01,
    repetition_penalty=1.03,
    huggingfacehub_api_token="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"
)
# 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

template = """<s>[INST] You are a helpful, respectful and honest assistant. Answer exactly in few words from the context and topics related to contextgit 
Answer the question below from context below:
{context}
{question} [/INST] </s>
"""
prompt = PromptTemplate(template=template, input_variables=["question", "context"])
llm_chain = LLMChain(prompt=prompt, llm=llm)

# Hardcoded context
context_p = """Certainly, let's delve deeper into each of these cyber attacks and their corresponding mitigation techniques:"""



@app.route('/answer', methods=['POST'])
@cross_origin()
def answer_question():
    data = request.get_json()
    question_p = data.get('msg', '')
    response = llm_chain.run({"question": question_p, "context": context_p})
    response_text = response
    index = response_text.find("[/INST] </s>")
    answer = response_text[index + len("[/INST] </s>"):].strip()
    return jsonify({"answer": answer})



if __name__ == '__main__':
    app.run(debug=True)