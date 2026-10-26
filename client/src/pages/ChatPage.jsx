import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import { useAuth } from '../context/AuthContext';
import { Send, User } from 'lucide-react';
import api from '../services/api';

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [activeContact, setActiveContact] = useState('Dr. Sarah Jenkins');

  const contacts = [
    { name: 'Dr. Sarah Jenkins', role: 'HCI Professor', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
    { name: 'Marcus Vance', role: 'Algorithms Faculty', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Elena Rostova', role: 'UI/UX Design Mentor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Study Group Delta', role: 'Peer Group', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80' },
  ];

  const loadMessages = async () => {
    try {
      const res = await api.getMessages();
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentText = inputText;
    setInputText('');

    try {
      const res = await api.sendMessage({ content: currentText });
      if (res.success && res.data) {
        setMessages((prev) => [...prev, res.data]);
      }
    } catch (err) {
      alert('Failed to send message: ' + err.message);
    }
  };

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Classroom & Faculty Messaging</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Communicate directly with course instructors, teaching assistants, and classmates.
          </p>
        </div>
      </div>

      <div className="chat-container">
        {/* Contact List */}
        <div className="chat-sidebar">
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Conversations
          </div>
          {contacts.map((c) => (
            <div
              key={c.name}
              className={`chat-contact-item ${activeContact === c.name ? 'active' : ''}`}
              onClick={() => setActiveContact(c.name)}
            >
              <img
                src={c.avatar}
                alt={c.name}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {c.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{c.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Thread Area */}
        <div className="chat-area">
          <div className="chat-header">
            <span>{activeContact}</span>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                Start a conversation with {activeContact}.
              </div>
            ) : (
              messages.map((m) => {
                const isMine = m.senderId === user?.id;
                return (
                  <div
                    key={m.id}
                    className={`chat-bubble ${isMine ? 'outgoing' : 'incoming'}`}
                  >
                    <div>{m.content}</div>
                    <div
                      style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        opacity: 0.75,
                        textAlign: isMine ? 'right' : 'left',
                      }}
                    >
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={handleSend} className="chat-input-row">
            <input
              type="text"
              className="form-input"
              placeholder={`Message ${activeContact}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '10px 18px' }}>
              <Send size={15} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
