import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Lock, AlertTriangle, ChevronRight, X } from 'lucide-react';

const VaporLabs = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Check URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSelectedLab('locfile');
      handleSearch(searchParam);
    }
  }, []);

  const labs = [
    {
      id: 'locfile',
      title: 'LocFile: Path Traversal',
      difficulty: 'Medium',
      category: 'A01 - Injection',
      description: 'Explore a vulnerable file search system. Can you find the hidden flag?',
      icon: Terminal,
      color: 'from-green-500 to-emerald-600',
      status: 'Live'
    },
    {
      id: 'coming-soon-1',
      title: 'CryptoWeak: Token Forgery',
      difficulty: 'Hard',
      category: 'A02 - Cryptographic Failures',
      description: 'Break weak JWT implementation and escalate privileges.',
      icon: Lock,
      color: 'from-purple-500 to-pink-600',
      status: 'Coming Soon'
    },
    {
      id: 'coming-soon-2',
      title: 'IDOR Hunter: Broken Access',
      difficulty: 'Medium',
      category: 'A03 - Access Control',
      description: 'Exploit predictable references to access unauthorized data.',
      icon: Shield,
      color: 'from-blue-500 to-cyan-600',
      status: 'Coming Soon'
    }
  ];

  const fileSystem = {
    'War Archive 1': '🗂️ Old deployment files (Empty)',
    'Project WaterPark': '🎢 Internal project docs (Access Denied)',
    'Config Backups': '⚙️ Configuration archives (Corrupted)',
    'Legacy Systems': '💾 Deprecated modules (No Data)',
    'Temp Storage': '📦 Temporary files (Cleared)',
  };

  const handleSearch = (query) => {
    const trimmedQuery = query || searchQuery;
    setSearchQuery(trimmedQuery);
    setMessage('');
    setFlagInput('');

    if (trimmedQuery === '../../../../etc/passwd' || trimmedQuery === '../../../etc/passwd') {
      setOutput(`root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
vapor:x:1000:1000:VAPOR User:/home/vapor:/bin/bash`);
    } else if (trimmedQuery === '../../../../flag.txt' || trimmedQuery === '../../../flag.txt') {
      setOutput(`🚩 FLAG FOUND!

flag{tr4v3rs4l_1s_just_th3_b3g1nn1ng}

[!] This flag is invalid.
[?] Tall the tree goes down the same...`);
    } else if (trimmedQuery === '/../../../root/flag.txt' || trimmedQuery === '/../../root/flag.txt') {
      setOutput(`🎯 REAL FLAG DISCOVERED!

flag{d33p3r_r00ts_h1dd3n_tr3asur3s_4wa1t}

[✓] Submit this flag to complete the challenge!`);
    } else if (trimmedQuery.includes('..') || trimmedQuery.includes('/')) {
      setOutput(`[ERROR] No results found.
Directory traversal detected but path invalid.`);
    } else {
      setOutput('[ERROR] No results found.\nTry searching with a valid file path.');
    }
  };

  const handleFlagSubmit = () => {
    if (flagInput === 'flag{d33p3r_r00ts_h1dd3n_tr3asur3s_4wa1t}') {
      setMessage('🎉 SUCCESS! Challenge completed. You\'ve mastered path traversal!');
    } else if (flagInput === 'flag{tr4v3rs4l_1s_just_th3_b3g1nn1ng}') {
      setAttempts(attempts + 1);
      setMessage('❌ Invalid flag. Hint: Tall the tree goes down the same...');
    } else {
      setMessage('❌ Incorrect flag. Keep exploring!');
    }
  };

  const LabCard = ({ lab }) => {
    const Icon = lab.icon;
    const isComingSoon = lab.status === 'Coming Soon';

    return (
      <div 
        onClick={() => !isComingSoon && setSelectedLab(lab.id)}
        style={{
          position: 'relative',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: isComingSoon ? '2px solid #374151' : '2px solid rgba(34, 197, 94, 0.3)',
          background: isComingSoon ? 'rgba(17, 24, 39, 0.3)' : 'rgba(17, 24, 39, 0.5)',
          cursor: isComingSoon ? 'not-allowed' : 'pointer',
          opacity: isComingSoon ? 0.6 : 1,
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          if (!isComingSoon) {
            e.currentTarget.style.borderColor = '#22c55e';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isComingSoon) {
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {isComingSoon && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(234, 179, 8, 0.2)',
            color: '#facc15',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: '1px solid rgba(234, 179, 8, 0.3)'
          }}>
            Coming Soon
          </div>
        )}
        
        <div style={{
          display: 'inline-flex',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          background: lab.color === 'from-green-500 to-emerald-600' ? 'linear-gradient(to bottom right, #22c55e, #059669)' :
                      lab.color === 'from-purple-500 to-pink-600' ? 'linear-gradient(to bottom right, #a855f7, #db2777)' :
                      'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
          marginBottom: '1rem'
        }}>
          <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
        </div>
        
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{lab.title}</h3>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{lab.category}</p>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>{lab.description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: lab.difficulty === 'Hard' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 115, 22, 0.2)',
            color: lab.difficulty === 'Hard' ? '#f87171' : '#fb923c'
          }}>
            {lab.difficulty}
          </span>
          {!isComingSoon && (
            <ChevronRight style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} />
          )}
        </div>
      </div>
    );
  };

  const LocFileLab = () => (
    <div style={{ minHeight: '100vh', background: '#000', padding: '2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>LocFile Challenge</h1>
            <p style={{ color: '#9ca3af' }}>Find the hidden flag through path traversal</p>
          </div>
          <button 
            onClick={() => {
              setSelectedLab(null);
              setSearchQuery('');
              setOutput('');
              setFlagInput('');
              setMessage('');
              setAttempts(0);
            }}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              borderRadius: '0.5rem',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: '1rem', height: '1rem' }} />
            Exit Lab
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#facc15' }} />
              Available Files
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.entries(fileSystem).map(([name, desc]) => (
                <div key={name} style={{ padding: '0.75rem', background: 'rgba(31, 41, 55, 0.5)', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>{name}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>File Search System</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch(searchQuery);
                    }
                  }}
                  placeholder="Enter file path (e.g., Operation VAPOR)"
                  style={{
                    flex: 1,
                    background: '#1f2937',
                    color: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #374151',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#22c55e',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {output && (
              <div style={{ background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Output</h3>
                <pre style={{
                  background: '#000',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  color: '#4ade80',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  border: '1px solid #1f2937'
                }}>
                  {output}
                </pre>
              </div>
            )}

            {output.includes('flag{') && (
              <div style={{ background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Submit Flag</h3>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleFlagSubmit();
                      }
                    }}
                    placeholder="flag{...}"
                    style={{
                      flex: 1,
                      background: '#1f2937',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #374151',
                      fontFamily: 'monospace',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleFlagSubmit}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#3b82f6',
                      color: 'white',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Submit
                  </button>
                </div>
                {message && (
                  <div style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    background: message.includes('SUCCESS') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: message.includes('SUCCESS') ? '#4ade80' : '#f87171',
                    border: message.includes('SUCCESS') ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    {message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedLab === 'locfile') {
    return <LocFileLab />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '2rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Terminal style={{ width: '3rem', height: '3rem', color: '#22c55e' }} />
            <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', color: 'white' }}>V.A.P.O.R</h1>
          </div>
          <p style={{ fontSize: '1.5rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Vulnerabilities • Analysis • Practice • Operations • Research</p>
          <p style={{ color: '#6b7280', maxWidth: '42rem', margin: '0 auto' }}>
            High-intensity cybersecurity practice platform simulating realistic web application vulnerabilities.
            Train like real bug bounty hunters.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>Available Labs</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80' }}>
              <div style={{ width: '0.5rem', height: '0.5rem', background: '#22c55e', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>1 Lab Live</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(17, 24, 39, 0.5)', border: '1px solid #1f2937', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>About VAPOR</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', color: '#d1d5db' }}>
            <div>
              <h4 style={{ color: '#4ade80', fontWeight: '600', marginBottom: '0.5rem' }}>🎯 Bug Bounty Focused</h4>
              <p style={{ fontSize: '0.875rem' }}>Designed for $100k+ earning potential with realistic vulnerability chains</p>
            </div>
            <div>
              <h4 style={{ color: '#4ade80', fontWeight: '600', marginBottom: '0.5rem' }}>🔗 Bug Chain Simulations</h4>
              <p style={{ fontSize: '0.875rem' }}>Cross-endpoint exploitation, blind-to-visible chains, auth bypass sequences</p>
            </div>
            <div>
              <h4 style={{ color: '#4ade80', fontWeight: '600', marginBottom: '0.5rem' }}>📚 100 Mental Models</h4>
              <p style={{ fontSize: '0.875rem' }}>Structured learning path covering all OWASP Top 10 categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaporLabs;
