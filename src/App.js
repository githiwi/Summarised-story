import React, { useState } from 'react';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);


const handleSummarize = () => {
  const cleanedStory = story.trim();

  if (!cleanedStory) {
    setSummary("Please write something first.");
    setIsDisabled(true);
    return;
  }

  
  let sentences = cleanedStory.match(/[^.!?]+[.!?]/g);

  if (!sentences || sentences.length === 0) {
    sentences = cleanedStory.split('.').filter(s => s.trim() !== '');
  }

  if (sentences.length === 0) {
    setSummary("Still couldn't find any sentences.");
    setIsDisabled(true);
    return;
  }

  const summarized = sentences.slice(0, 2).join('. ').trim();
  setSummary(summarized + (summarized.endsWith('.') ? '' : '.'));
  setIsDisabled(false);
  setSubmitted(false);
};



  const handleSend = () => {
    console.log('Story:', story);
    console.log('Summary:', summary);
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

  
      {summary && !isDisabled && (
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
