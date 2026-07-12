import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Terminal.css';

const SOURCE = `const developer = {
  name: 'Twaran Gupta',
  skills: ['React', 'Node.js', 'PostgreSQL'],
  passion: 'Clean, maintainable code',
  status: 'Available for work'
};`;

const HELP_LINES = [
  'Available commands:',
  '  whoami         short bio',
  '  skills         tech stack',
  '  contact        email & links',
  '  resume         download resume (PDF)',
  '  ask <question> ask AI about my experience',
  '  cd projects    go to /projects',
  '  cd experience  go to /experience',
  '  clear          clear the terminal',
  '  help           show this list',
];

const TOKEN_REGEX = /(\bconst\b)|('(?:[^'\\]|\\.)*')|([{}[\],;])|([A-Za-z_$][A-Za-z0-9_$]*)(?=\s*:)/g;

function highlightLine(line, lineKey) {
  const parts = [];
  let lastIndex = 0;
  let match;
  let i = 0;
  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`${lineKey}-${i++}`}>{line.slice(lastIndex, match.index)}</span>);
    }
    if (match[1]) {
      parts.push(<span key={`${lineKey}-${i++}`} className="tok-keyword">{match[1]}</span>);
    } else if (match[2]) {
      parts.push(<span key={`${lineKey}-${i++}`} className="tok-string">{match[2]}</span>);
    } else if (match[3]) {
      parts.push(<span key={`${lineKey}-${i++}`} className="tok-punct">{match[3]}</span>);
    } else if (match[4]) {
      parts.push(<span key={`${lineKey}-${i++}`} className="tok-key">{match[4]}</span>);
    }
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < line.length) {
    parts.push(<span key={`${lineKey}-${i++}`}>{line.slice(lastIndex)}</span>);
  }
  return parts;
}

function runCommand(raw, navigate) {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case '':
      return null;
    case 'whoami':
      return 'Twaran Gupta — Software Development Engineer at ZS Associates. I build production systems for Fortune 500 enterprises, from React UIs to Node APIs to data pipelines.';
    case 'skills':
      return 'JavaScript, TypeScript, React, Angular, Node.js, Express.js, PostgreSQL, Snowflake, Redis, Docker, Git';
    case 'contact':
      return [
        'email:    twarangupta01@gmail.com',
        'github:   github.com/twarangupta',
        'linkedin: linkedin.com/in/twarangupta',
      ].join('\n');
    case 'resume':
      window.open('/resume.pdf', '_blank');
      return 'Opening resume.pdf ...';
    case 'cd projects':
      navigate('/projects');
      return 'Navigating to /projects ...';
    case 'cd experience':
      navigate('/experience');
      return 'Navigating to /experience ...';
    case 'help':
      return HELP_LINES.join('\n');
    case 'clear':
      return '__CLEAR__';
    default:
      return `command not found: ${raw}\ntype 'help' for a list of commands`;
  }
}

export default function Terminal() {
  const navigate = useNavigate();
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(SOURCE.slice(0, i));
      if (i >= SOURCE.length) {
        clearInterval(id);
        setTimeout(() => setTypingDone(true), 500);
      }
    }, 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, typed, typingDone]);

  useEffect(() => {
    if (typingDone) inputRef.current?.focus();
  }, [typingDone]);

  const askAI = async (command, question) => {
    const entryIndex = history.length;
    setHistory((prev) => [...prev, { command, output: 'Thinking...' }]);

    const setAnswer = (output) => {
      setHistory((prev) => prev.map((h, i) => (i === entryIndex ? { ...h, output } : h)));
    };

    if (!question) {
      setAnswer("Usage: ask <question>, e.g. ask 'what did you work on at ZS Associates?'");
      return;
    }

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(res.ok ? data.answer : data.error || 'Something went wrong.');
    } catch {
      setAnswer('Network error — try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input;
    setInput('');

    const trimmed = command.trim().toLowerCase();
    if (trimmed === 'ask' || trimmed.startsWith('ask ')) {
      askAI(command, command.trim().slice(3).trim());
      return;
    }

    const output = runCommand(command, navigate);
    if (output === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command, output }]);
    }
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-titlebar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-title">developer.js</span>
      </div>

      <div
        className="terminal-body"
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
      >
        <pre className="terminal-code">
          {typingDone
            ? SOURCE.split('\n').map((line, idx) => (
                <div key={idx}>{highlightLine(line, idx)}</div>
              ))
            : <code>{typed}</code>}
          {!typingDone && <span className="terminal-cursor" />}
        </pre>

        {typingDone && (
          <div className="terminal-session">
            <p className="terminal-hint">Type 'help' to list all commands.</p>

            {history.map((h, idx) => (
              <div className="terminal-entry" key={idx}>
                <div className="terminal-input-row">
                  <span className="terminal-prompt">$</span>
                  <span>{h.command}</span>
                </div>
                {h.output && <pre className="terminal-output">{h.output}</pre>}
              </div>
            ))}

            <form className="terminal-input-row" onSubmit={handleSubmit}>
              <span className="terminal-prompt">$</span>
              <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command input"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
