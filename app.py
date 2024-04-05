from flask import Flask, request, jsonify
from langchain_community.llms import HuggingFaceEndpoint
from langchain import PromptTemplate, LLMChain

app = Flask(__name__)

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

template = """<s>[INST] You are a helpful, respectful and honest assistant. Answer exactly in few words from the context and topics related to contextgit 
Answer the question below from context below:
{context}
{question} [/INST] </s>
"""
prompt = PromptTemplate(template=template, input_variables=["question", "context"])
llm_chain = LLMChain(prompt=prompt, llm=llm)

# Hardcoded context
context_p = """Certainly, let's delve deeper into each of these cyber attacks and their corresponding mitigation techniques:

1. **Phishing Attacks:**

   Phishing attacks involve sending deceptive emails or messages to trick recipients into divulging sensitive information or performing actions that compromise security. Mitigation strategies include:

   - **Employee Training:** Conduct regular security awareness training to educate employees on how to recognize phishing attempts, including spotting suspicious email addresses, checking for misspellings, and verifying the authenticity of requests.
   - **Email Filtering:** Implement advanced email filtering solutions that utilize machine learning algorithms and reputation-based systems to detect and block phishing emails before they reach users' inboxes.
   - **Multi-factor Authentication (MFA):** Enforce MFA for accessing critical systems or sensitive data to add an extra layer of security, requiring users to provide multiple forms of verification beyond passwords.

2. **Malware Attacks:**

   Malware encompasses a broad category of malicious software designed to infiltrate and damage computer systems. Mitigation techniques include:

   - **Antivirus Software:** Install reputable antivirus software on all endpoints and servers, and keep virus definitions up-to-date to detect and remove malware infections.
   - **Patch Management:** Regularly apply security patches and updates to operating systems, applications, and firmware to address known vulnerabilities exploited by malware.
   - **Application Whitelisting:** Implement application whitelisting to only allow approved programs to run on endpoints, preventing the execution of unauthorized or malicious software.

3. **Ransomware Attacks:**

   Ransomware is a type of malware that encrypts files or locks users out of their systems, demanding payment for decryption. Mitigation strategies include:

   - **Regular Backups:** Maintain frequent backups of critical data and store them securely offline or in a separate, isolated environment to facilitate recovery without paying ransom in the event of an attack.
   - **Network Segmentation:** Divide network resources into separate segments and apply access controls to limit the spread of ransomware across the network, containing the impact of an infection.
   - **Security Awareness Training:** Educate employees on the dangers of ransomware and how to recognize suspicious email attachments or links that may deliver ransomware payloads.

4. **DDoS Attacks:**

   Distributed Denial of Service (DDoS) attacks aim to overwhelm a network, server, or application with a flood of traffic, rendering it inaccessible to legitimate users. Mitigation techniques include:

   - **DDoS Protection Services:** Utilize specialized DDoS mitigation services or hardware appliances capable of detecting and mitigating volumetric attacks in real-time, filtering out malicious traffic while allowing legitimate traffic to pass through.
   - **Scalable Infrastructure:** Design network architecture to handle sudden increases in traffic by implementing load balancers, employing Content Delivery Networks (CDNs), and leveraging cloud-based services that can scale resources dynamically.
   - **Traffic Filtering:** Implement traffic filtering mechanisms such as rate limiting, IP blacklisting, and anomaly detection to distinguish legitimate traffic from malicious traffic and block or mitigate the impact of DDoS attacks.

5. **SQL Injection Attacks:**

   SQL injection attacks exploit vulnerabilities in web applications to execute malicious SQL queries against a database. Mitigation techniques include:

   - **Input Validation:** Validate and sanitize user input to prevent the injection of malicious SQL code into web forms or application parameters, reducing the risk of successful SQL injection attacks.
   - **Use of Prepared Statements:** Utilize parameterized queries or prepared statements in database interactions to separate user input from SQL commands, preventing attackers from injecting malicious SQL code into queries.
   - **Principle of Least Privilege:** Limit database access privileges to only what is necessary for users and applications, minimizing the potential impact of successful SQL injection attacks by restricting access to sensitive data and database functionality.

6. **Man-in-the-Middle (MitM) Attacks:**

   MitM attacks intercept communication between two parties, allowing attackers to eavesdrop on or manipulate data transmitted between them. Mitigation strategies include:

   - **Encryption:** Implement strong encryption protocols such as HTTPS for web traffic, SSL/TLS for email communication, and VPNs for remote access to protect data in transit from interception by MitM attackers.
   - **Public Key Infrastructure (PKI):** Deploy PKI to authenticate communication endpoints and establish secure connections using digital certificates, preventing MitM attackers from impersonating legitimate parties.
   - **Certificate Pinning:** Pin SSL certificates to specific domains or public keys to prevent MitM attackers from using fraudulent certificates to intercept or manipulate encrypted communication between clients and servers.

7. **Insider Threats:**

   Insider threats involve individuals within an organization who misuse their access privileges to compromise security, steal sensitive data, or disrupt operations. Mitigation techniques include:

   - **Access Control:** Implement stringent access controls and least privilege principles to restrict employees' access to sensitive data and critical systems based on their roles and responsibilities.
   - **Employee Monitoring:** Monitor user activities, including file access, system logins, and network traffic, to detect unusual behavior or unauthorized access indicative of insider threats, enabling timely intervention and response.
   - **Security Awareness Training:** Provide comprehensive security awareness training to employees, emphasizing the importance of protecting sensitive information, adhering to security policies and procedures, and reporting suspicious activities to the appropriate authorities.

8. **Zero-day Attacks:**

   Zero-day attacks exploit previously unknown vulnerabilities in software or hardware for which no patch or mitigation is available. Mitigation strategies include:

   - **Intrusion Detection Systems (IDS):** Deploy IDS solutions capable of detecting anomalous behavior or known attack patterns indicative of zero-day exploits, enabling timely detection and response to emerging threats.
   - **Threat Intelligence:** Stay abreast of the latest threat intelligence sources, including security advisories, vendor announcements, and industry reports, to identify emerging vulnerabilities and zero-day exploits, allowing organizations to prioritize patching and implement compensating controls.
   - **Application Sandboxing:** Isolate applications from critical system components and other applications using sandboxing techniques that restrict their access to resources and system privileges, limiting the impact of zero-day exploits on the broader IT environment.

By implementing these more elaborate mitigation techniques tailored to specific cyber threats, organizations can enhance their resilience against a wide range of security risks and better protect their valuable assets, data, and reputation from cyber attacks."""

@app.route('/answer', methods=['POST'])
def answer_question():
    data = request.json
    question_p = data.get('question', '')
    
    response = llm_chain.run({"question": question_p, "context": context_p})
    response_text = response
    index = response_text.find("[/INST] </s>")
    answer = response_text[index + len("[/INST] </s>"):].strip()

    return jsonify({"answer": answer})


if __name__ == '__main__':
    app.run(debug=True)
