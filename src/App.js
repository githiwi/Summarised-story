import React, { useState } from 'react';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);


const handleSummarize = async () => {
  const cleanedStory = story.trim();

  if (!cleanedStory) {
    setSummary("Please write something first.");
    setIsDisabled(true);
    return;
  }

  setSummary("Summarizing...");
  setIsDisabled(true);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that summarizes stories." },
          { role: "user", content: `Summarize this story in 2-3 sentences:\n\n${cleanedStory}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    const result = data.choices?.[0]?.message?.content;
     

    if (result) {
      setSummary(result);
      setIsDisabled(false);
    } else {
      setSummary("Failed to summarize. Try again.");
    }
  } catch (error) {
    console.error("Error summarizing:", error);
    setSummary("Error occurred while summarizing.");
  }
};




  const handleSend = () => {
    setSubmitted(true);
    setIsDisabled(true); 
    setTimeout(() => {
      setStory('');
      setSummary('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Story Summarizer</h2>

      <textarea
        rows="10"
        style={{ width: '100%', marginBottom: '10px' }}
        value={story}
        placeholder="Write your story here..."
        onChange={(e) => setStory(e.target.value)}
      />

      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={handleSummarize} disabled={!story.trim()}>
          Summary
        </button>
      </div>

  
      {summary &&  (
        <div style={{ marginBottom: '10px' }}>
          <strong>Summary:</strong>
          <textarea
            rows="5"
            style={{ width: '100%' }}
            value={summary}
            readOnly
          />
        </div>
      )}


      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <button onClick={handleSend} disabled={!summary || isDisabled}>
          Send
        </button>
      </div>

      {submitted && (
        <p style={{ color: 'green' }}>✅ Story and summary sent! Ready for the next one.</p>
      )}
    </div>
  );
}

export default App;
