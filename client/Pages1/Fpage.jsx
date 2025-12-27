import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Fpage({ onJoin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!username.trim()) {
      setError('Please enter a username!');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters!');
      return;
    }

    // Save username to localStorage
    localStorage.setItem('uname', username.trim());
    localStorage.setItem('char', Math.floor(Math.random()*11)%2==0?"boy":"sam");
    
    // Call onJoin callback to navigate
    if (onJoin) {
      onJoin(username.trim());
  
    }
        navigate("/gameplay");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8C8 40%, #90EE90 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Comic Sans MS", "Bubblegum Sans", cursive, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Clouds */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${100 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 30}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '100px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              animation: `float ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 5px 15px rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div style={{
        position: 'absolute',
        top: '50px',
        right: '100px',
        width: '120px',
        height: '120px',
        backgroundColor: '#FFD700',
        borderRadius: '50%',
        boxShadow: '0 0 60px rgba(255, 215, 0, 0.6)',
        animation: 'pulse 4s ease-in-out infinite'
      }}>
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '30px',
              backgroundColor: '#FFD700',
              top: '50%',
              left: '50%',
              transformOrigin: '4px 60px',
              transform: `rotate(${i * 45}deg)`,
              borderRadius: '4px'
            }}
          />
        ))}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap');
          
          @keyframes float {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100vw); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }

          @keyframes grow {
            0% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* Main Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        animation: 'grow 0.5s ease-out'
      }}>
        {/* Title */}
        <div style={{
          marginBottom: '30px',
          animation: 'bounce 2s ease-in-out infinite'
        }}>
          <h1 style={{
            fontSize: '64px',
            color: '#2E7D32',
            textShadow: '4px 4px 0px rgba(255, 255, 255, 0.8), 2px 2px 10px rgba(46, 125, 50, 0.3)',
            margin: '0 0 10px 0',
            fontFamily: '"Bubblegum Sans", cursive',
            letterSpacing: '2px'
          }}>
            🌻 Happy Town 🌻
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#558B2F',
            margin: '0',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'
          }}>
            Where friends grow together!
          </p>
        </div>

        {/* Decorative Elements */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '30px'
        }}>
          <span style={{ fontSize: '40px', animation: 'wiggle 2s ease-in-out infinite', animationDelay: '0s' }}>🌾</span>
          <span style={{ fontSize: '50px', animation: 'bounce 1.5s ease-in-out infinite', animationDelay: '0.2s' }}>🐄</span>
          <span style={{ fontSize: '40px', animation: 'wiggle 2s ease-in-out infinite', animationDelay: '0.4s' }}>🌻</span>
          <span style={{ fontSize: '50px', animation: 'bounce 1.5s ease-in-out infinite', animationDelay: '0.6s' }}>🐔</span>
          <span style={{ fontSize: '40px', animation: 'wiggle 2s ease-in-out infinite', animationDelay: '0.8s' }}>🌾</span>
        </div>

        {/* Input Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
          border: '6px solid #8BC34A',
          padding: '50px 60px',
          borderRadius: '30px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), inset 0 -5px 15px rgba(139, 195, 74, 0.2)',
          maxWidth: '500px',
          position: 'relative'
        }}>
          {/* Decorative corners */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            fontSize: '40px'
          }}>🌱</div>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            fontSize: '40px'
          }}>🦋</div>
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-20px',
            fontSize: '40px'
          }}>🍄</div>
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            fontSize: '40px'
          }}>🌼</div>

          <label style={{
            display: 'block',
            color: '#2E7D32',
            fontSize: '22px',
            marginBottom: '20px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: '"Bubblegum Sans", cursive'
          }}>
            What's your name, friend? 🙋
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter your name..."
            maxLength={20}
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '18px',
              fontFamily: '"Bubblegum Sans", cursive',
              backgroundColor: '#FFFFFF',
              color: '#2E7D32',
              border: '4px solid #8BC34A',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: error ? '15px' : '30px',
              textAlign: 'center',
              borderRadius: '15px',
              boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#689F38';
              e.target.style.transform = 'scale(1.02)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#8BC34A';
              e.target.style.transform = 'scale(1)';
            }}
          />

          {error && (
            <div style={{
              color: '#D32F2F',
              fontSize: '14px',
              marginBottom: '20px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '10px',
              borderRadius: '10px',
              animation: 'bounce 0.5s ease-in-out'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleJoin}
            style={{
              width: '100%',
              padding: '20px',
              fontSize: '24px',
              fontFamily: '"Bubblegum Sans", cursive',
              backgroundColor: '#66BB6A',
              color: '#FFFFFF',
              border: '5px solid #4CAF50',
              cursor: 'pointer',
              borderRadius: '20px',
              boxShadow: '0 8px 0px #388E3C, 0 12px 20px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.1s',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(6px)';
              e.target.style.boxShadow = '0 2px 0px #388E3C, 0 4px 10px rgba(0, 0, 0, 0.3)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 0px #388E3C, 0 12px 20px rgba(0, 0, 0, 0.3)';
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#81C784';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#66BB6A';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 0px #388E3C, 0 12px 20px rgba(0, 0, 0, 0.3)';
            }}
          >
            🚜 Join the Fun! 🎉
          </button>

          <div style={{
            marginTop: '20px',
            fontSize: '14px',
            color: '#558B2F',
            fontStyle: 'italic'
          }}>
            Press Enter to join quickly! ⌨️
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          fontSize: '16px',
          color: '#2E7D32',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
          fontWeight: 'bold'
        }}>
          <span style={{ fontSize: '20px' }}>🏡</span> A place to farm, chat & make friends! <span style={{ fontSize: '20px' }}>🌈</span>
        </div>
      </div>
    </div>
  );
}