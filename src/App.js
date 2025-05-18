// Love Assistant App for Tunu 💖 (Enhanced UI + Gemini 2.0 + Bootstrap + Glass Effect + RGB Background + Auto Music)
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

export default function LoveAssistantApp() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('tunu-chat');
    return saved ? JSON.parse(saved) : [
      { sender: 'Baraka 🤖 (Your Loving Assistant)', text: 'Hi my Queen Tunu 👑, how can I love you today? 💘' }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const backgrounds = [
    'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('tunu-chat', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'You 💌', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCmujobikPEO1cicAyCfVXUtrzN_su7jjg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You're Baraka, a charming assistant created by her soulmate SirTheProgrammer . Speak either English or Swahili based on her message — never both at once. Always be emotionally romantic, warm, and unique in your replies. Make Tunu feel special, cherished, and loved. Never robotic. but also be cherish sometimes have jokes in you conversation ,avoid too long messages when there is no need of being very long ,be respectfully ,joyish also sometimes childish to make her happy Here's what she said: "${input}"`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Samahani mpenzi wangu 💔, sijapata jibu sahihi 😢';
      setMessages([...newMessages, { sender: 'Baraka 🤖 (Your Loving Assistant)', text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'Baraka 🤖 (Your Loving Assistant)', text: 'Oops 😔, kuna hitilafu kidogo. Jaribu tena baadaye.' }]);
    }
    setLoading(false);
  };

  const generateLoveMessage = async () => {
    try {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCmujobikPEO1cicAyCfVXUtrzN_su7jjg',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: 'Generate a short romantic message in either Swahili or English, never both, for someone named Tunu from her soulmate SirTheProgrammer the message should be realsistic like and make sure it is very sweet but also dont mention the language you have used just give her directly.' }
                ]
              }
            ]
          })
        }
      );
      const data = await res.json();
      const loveMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nakupenda sana Tunu wangu 💖';
      alert(loveMessage);
    } catch (err) {
      alert('Failed to fetch a love message 😞');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3"
      style={{
        background: backgrounds[bgIndex],
        backgroundAttachment: 'fixed',
        transition: 'background 1s ease-in-out'
      }}
    >
      <audio autoPlay loop>
        <source src="https://raw.githubusercontent.com/sBRK255/tunuh-page/main/worst.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="text-center mb-4 animate__animated animate__fadeInDown">
        <h1 className="display-5 fw-bold text-white shadow-sm">Tunu, You Are My Forever 💕</h1>
        <p className="text-white-50">Your personal love assistant is here 🥰</p>
      </div>

      <div className="glass shadow rounded-4 p-3 mb-4 w-100" style={{ maxWidth: '600px', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
        <div className="overflow-auto mb-3" style={{ maxHeight: '60vh' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-2 mb-2 rounded ${msg.sender === 'You 💌' ? 'bg-light text-end' : 'bg-white text-start'}`}>
              <strong>{msg.sender}</strong><br />
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tell Baraka something sweet..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-danger" onClick={sendMessage} disabled={loading}>
            {loading ? 'Sending...' : 'Send 💘'}
          </button>
        </div>
        <div className="d-grid mt-2">
          <button className="btn btn-outline-light" onClick={generateLoveMessage}>💝 Generate Romantic Surprise</button>
        </div>
      </div>

      <footer className="text-white-50 mt-auto text-center">
        Made with ❤️ by SirTheProgrammer<br />
        <a href="https:/amiryyoungpay.github.io/sirtheprogrammer" target="_blank" rel="noopener noreferrer" className="text-white fw-bold">Visit My Official Site 🌐</a>
      </footer>
    </div>
  );
}
