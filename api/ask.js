import { experience, education, leadership } from '../src/data/experience.js';
import { skills } from '../src/data/skills.js';
import { projects } from '../src/data/projects.js';
import { profile } from '../src/data/profile.js';

const GROQ_MODEL = 'groq/compound-mini';
const GEMINI_MODEL = 'gemini-3.6-flash';
const MAX_QUESTION_LENGTH = 300;
const MAX_OUTPUT_TOKENS = 200;

function buildProfileText() {
  const lines = [];
  if (profile.age) lines.push(`Age: ${profile.age}`);
  if (profile.location) lines.push(`Location: ${profile.location}`);
  if (profile.bio) lines.push(`Bio: ${profile.bio}`);
  if (profile.workStyle) lines.push(`Work style: ${profile.workStyle}`);
  if (profile.availability) lines.push(`Availability: ${profile.availability}`);
  if (profile.workArrangement) lines.push(`Work arrangement: ${profile.workArrangement}`);
  if (profile.languages?.length) lines.push(`Languages: ${profile.languages.join(', ')}`);
  if (profile.interests?.length) lines.push(`Interests: ${profile.interests.join(', ')}`);
  if (profile.funFacts?.length) lines.push(`Fun facts: ${profile.funFacts.join('; ')}`);
  if (profile.lookingFor) lines.push(`Looking for: ${profile.lookingFor}`);
  return lines.join('\n');
}

function buildContext() {
  const expText = experience
    .map((job) => {
      const projLines = job.projects
        .map((p) => `${p.title ? `${p.title} (${p.clients || 'personal'}): ` : ''}${p.points.join(' ')}`)
        .join('\n');
      return `${job.role} at ${job.company} (${job.period}, ${job.location}):\n${projLines}`;
    })
    .join('\n\n');

  const skillsText = skills.map((s) => `${s.category}: ${s.items.join(', ')}`).join('\n');
  const projectsText = projects.map((p) => `${p.title}: ${p.summary} [${p.stack.join(', ')}]`).join('\n');
  const eduText = `${education.degree}, ${education.school} (${education.period}), CGPA ${education.gpa}`;
  const leadershipText = leadership.join('\n');
  const profileText = buildProfileText();

  return `You are a terminal assistant on Twaran Gupta's personal portfolio website. Answer questions about Twaran using only the information below, in third person, in 2-4 concise sentences. If the answer isn't in this data, say you don't have that information and suggest the Contact page.

${profileText ? `PERSONAL:\n${profileText}\n\n` : ''}WORK EXPERIENCE:
${expText}

SKILLS:
${skillsText}

PROJECTS:
${projectsText}

EDUCATION:
${eduText}

LEADERSHIP:
${leadershipText}`;
}

async function askGroq(context, question) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Missing GROQ_API_KEY');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: question },
      ],
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq error: ${await response.text()}`);
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('Groq returned no answer');
  return answer;
}

async function askGemini(context, question) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${context}\n\nQuestion: ${question}` }] }],
        generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.4 },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini error: ${await response.text()}`);
  }

  const data = await response.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!answer) throw new Error('Gemini returned no answer');
  return answer;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body || {};
  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Missing question' });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: 'Question too long' });
  }

  const context = buildContext();
  const trimmedQuestion = question.trim();

  try {
    const answer = await askGroq(context, trimmedQuestion);
    return res.status(200).json({ answer });
  } catch (groqErr) {
    console.error('Groq failed, falling back to Gemini:', groqErr.message);
  }

  try {
    const answer = await askGemini(context, trimmedQuestion);
    return res.status(200).json({ answer });
  } catch (geminiErr) {
    console.error('Gemini failed:', geminiErr.message);
    return res.status(502).json({ error: 'AI request failed — try again shortly' });
  }
}
