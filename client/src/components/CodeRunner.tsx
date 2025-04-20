// src/components/CodeRunner.tsx
import React, { useState } from 'react';
import axios from 'axios';
import api from '../utils/api';
import './CodeRunner.css'; // 💡 Important: We'll create this file

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python3' },
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Rust', value: 'rust' },
  { label: 'Swift', value: 'swift' },
  { label: 'TypeScript', value: 'typescript' },
];

const jdoodleLanguageMap: Record<string, { language: string; versionIndex: string }> = {
  javascript: { language: 'nodejs', versionIndex: '4' },
  python3: { language: 'python3', versionIndex: '3' },
  c: { language: 'c', versionIndex: '5' },
  cpp: { language: 'cpp17', versionIndex: '0' },
  java: { language: 'java', versionIndex: '4' },
  go: { language: 'go', versionIndex: '3' },
  php: { language: 'php', versionIndex: '3' },
  ruby: { language: 'ruby', versionIndex: '3' },
  rust: { language: 'rust', versionIndex: '3' },
  swift: { language: 'swift', versionIndex: '3' },
  typescript: { language: 'typescript', versionIndex: '0' },
};

const CodeRunner: React.FC = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    setOutput('⏳ Running your code...');

    const mapped = jdoodleLanguageMap[language];

    if (!mapped) {
      setOutput('❌ Unsupported language selected.');
      return;
    }

    try {
      const response = await api.post('/run', {
        code,
        language: mapped.language,
        versionIndex: mapped.versionIndex,
      });

      setOutput(response.data.output);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setOutput(`❌ Server Error: ${error.response.data.error}`);
        } else if (error.request) {
          setOutput('❌ Error: No response from server.');
        } else {
          setOutput(`❌ Error: ${error.message}`);
        }
      } else {
        setOutput('❌ Unknown error occurred.');
      }
    }
  };

  return (
    <div className="runner-container">
      <h2 className="runner-title">🚀 Multi-Language Code Runner</h2>

      <div className="runner-field">
        <label className="runner-label">Select Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="runner-select"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="runner-field">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          className="runner-textarea"
          placeholder="// Write your code here..."
        />
      </div>

      <div className="runner-button-container">
        <button onClick={runCode} className="runner-button">
          ▶️ Run Code
        </button>
      </div>

      <div className="runner-output">
        <strong className="runner-output-title">🖥️ Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeRunner;
