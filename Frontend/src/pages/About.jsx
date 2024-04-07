import React, { useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import Adware from "../data/Adware_data_1.json";
import Backdoor from "../data/Backdoor_data_1.json";
import Cryptojacking from "../data/Cryptojacking_data_1.json";
import Databreach from "../data/Data Breach_data_1.json";
import Datapoisoning from "../data/Data Poisoning_data_1.json";
import Ddos from "../data/Ddos.json";
import DnsSpoofing from "../data/DNS Spoofing_data_1.json";
import Keylogger from "../data/Keylogger_data_1.json";
import Malware from "../data/Malvertising_data_1.json";
import PasswordAttack from "../data/Password Attack_data_1.json";
import Pharming from "../data/Pharming_data_1.json";
import Phishing from "../data/Phishing_data_1.json";
import Rootkit from "../data/Rootkit_data_1.json";
import Drive from "../data/Drive.json";
import Spyware from "../data/Spyware_data_1.json";
import SqlInjection from "../data/SQL Injection_data_1.json";
import TargetedAttack from "../data/Targeted Attack_data_1.json";
import Trojan from "../data/Trojan_data_1.json";
import Sector from "./Sector";

import "./About.css";
// import data from '../../src/sector_graph/sector.json';



defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const About = () => {
  const [selectedDataType, setSelectedDataType] = useState("Adware");

  const dataTypes = {
    Adware: { data: Adware, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources." },
    Backdoor: { data: Backdoor, description: "A backdoor is a method, often secret, for bypassing normal authentication or encryption in a computer system, a product, or an embedded device.", mitigation: "Keep software updated, use strong and unique passwords, employ multi-factor authentication, regularly monitor system logs." },
    Cryptojacking: { data: Cryptojacking, description: "Cryptojacking is the unauthorized use of someone else's computer to mine cryptocurrency.", mitigation: "Use ad blockers and antivirus software, keep software updated, use strong and unique passwords, monitor system performance for unexpected spikes." },
    Databreach: { data: Databreach, description: "A data breach is a security incident in which sensitive, protected, or confidential data is copied, transmitted, viewed, stolen, or used by an unauthorized individual.", mitigation: "Encrypt sensitive data, implement access controls, use firewalls and intrusion detection systems, conduct regular security audits." },
    Datapoisoning: { data: Datapoisoning, description: "Data poisoning is the corruption of a machine learning model's training data.", mitigation: "Use secure data sources, implement data validation and sanitization techniques, use anomaly detection to identify suspicious data." },
    Ddos: { data: Ddos, description: "A distributed denial-of-service (DDoS) attack occurs when multiple systems flood the bandwidth or resources of a targeted system, usually one or more web servers.", mitigation: "Use DDoS protection services, configure network devices to filter out malicious traffic, deploy redundant infrastructure." },
    DnsSpoofing: { data: DnsSpoofing, description: "DNS spoofing is a type of cyber attack that exploits the Domain Name System (DNS) to redirect web traffic to malicious sites.", mitigation: "Implement DNSSEC to authenticate DNS responses, use DNS filtering services, keep software updated." },
    Keylogger: { data: Keylogger, description: "A keylogger is a type of surveillance software that records every keystroke made by a computer user, especially in order to gain fraudulent access to passwords and other confidential information.", mitigation: "Use antivirus software, regularly scan for malware, be cautious of downloading files from untrusted sources." },
    Malware: { data: Malware, description: "Malware is any software intentionally designed to cause damage to a computer, server, client, or computer network.", mitigation: "Use antivirus software, keep software updated, avoid clicking on suspicious links or downloading files from untrusted sources." },
    PasswordAttack: { data: Pharming, description: "A password attack is a technique used to gain unauthorized access to a system or account by cracking passwords.", mitigation: "Use strong, unique passwords, implement multi-factor authentication, regularly change passwords." },
    Pharming: { data: PasswordAttack, description: "A password attack is a technique used to gain unauthorized access to a system or account by cracking passwords.", mitigation: "Use strong, unique passwords, implement multi-factor authentication, regularly change passwords." },
    Phishing: { data: Phishing, description: "Phishing is a cyber attack that uses disguised email as a weapon.", mitigation: "Educate users about phishing techniques, use spam filters, verify the identity of the sender before clicking on links or downloading attachments." },
    Rootkit: { data: Rootkit, description: "Phishing is a cyber attack that uses disguised email as a weapon.", mitigation: "Educate users about phishing techniques, use spam filters, verify the identity of the sender before clicking on links or downloading attachments." },
    Drive: { data: Drive, description: "Phishing is a cyber attack that uses disguised email as a weapon.", mitigation: "Educate users about phishing techniques, use spam filters, verify the identity of the sender before clicking on links or downloading attachments." },
    Spyware: { data: Spyware, description: "Phishing is a cyber attack that uses disguised email as a weapon.", mitigation: "Educate users about phishing techniques, use spam filters, verify the identity of the sender before clicking on links or downloading attachments." },
    SqlInjection: { data: SqlInjection, description: "SQL injection is a code injection technique used to attack data-driven applications, where malicious SQL statements are inserted into an entry field for execution.", mitigation: "Use parameterized queries or prepared statements, validate and sanitize input data, limit database permissions." },
    TargetedAttack: { data: TargetedAttack, description: "SQL injection is a code injection technique used to attack data-driven applications, where malicious SQL statements are inserted into an entry field for execution.", mitigation: "Use parameterized queries or prepared statements, validate and sanitize input data, limit database permissions." },
    Trojan: { data: Trojan, description: "SQL injection is a code injection technique used to attack data-driven applications, where malicious SQL statements are inserted into an entry field for execution.", mitigation: "Use parameterized queries or prepared statements, validate and sanitize input data, limit database permissions." },
  };

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };





  

 

  return (
    <div className="about-container">
      <div className="About">
        <div className="filterContainer">
          <h2>Forcasting Bayes LSTM</h2>
          <br></br>
          <label htmlFor="dataType">Filter by Attack Type:</label>
          <select id="dataType" value={selectedDataType} onChange={handleDataTypeChange}>
            {Object.keys(dataTypes).map((dataType) => (
              <option key={dataType} value={dataType}>
                {dataType}
              </option>
            ))}
          </select>
        </div>
        <div className="dataCard graph">
          {dataTypes[selectedDataType] && dataTypes[selectedDataType].data && dataTypes[selectedDataType].data.data && dataTypes[selectedDataType].data.options ? (
            <>
              <Line
                data={dataTypes[selectedDataType].data.data}
                options={{
                  ...dataTypes[selectedDataType].data.options,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Month",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Prediction",
                      },
                    },
                  },
                  plugins: {
                    ...dataTypes[selectedDataType].data.options.plugins,
                    annotation: {
                      annotations: {
                        line1: {
                          type: "line",
                          xMin: dataTypes[selectedDataType].data.data.labels.indexOf("January-2024"),
                          xMax: dataTypes[selectedDataType].data.data.labels.indexOf("January-2024"),
                          borderColor: "red",
                          borderWidth: 4,
                          zIndex: 1,
                        },
                      },
                    },
                  },
                }}
              />
            </>
          ) : (
            <p>No data available for the selected data type.</p>
          )}
        </div>
        
      </div>
      <div className='bigcontainer'>
        {dataTypes[selectedDataType] && dataTypes[selectedDataType].data && dataTypes[selectedDataType].data.data && dataTypes[selectedDataType].data.options ? (
            <> 
                <p>Description: {dataTypes[selectedDataType].description}</p>
                <p>Mitigation: {dataTypes[selectedDataType].mitigation}</p>
            </>
        ):(
          <p>No data available for the selected data type.</p>
        )}
        </div>
        <Sector/>
    </div>
    
  );
};