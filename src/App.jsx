import React, { useState, useEffect, useCallback, memo } from 'react';
import { Terminal, Shield, Lock, AlertTriangle, ChevronRight, X } from 'lucide-react';

const VaporLabs = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSelectedLab('locfile');
      performSearch(searchParam);
    }
  }, []);

  const performSearch = useCallback((query) => {
    setMessage('');

    if (query === '../../../../etc/passwd' || query === '../../../etc/passwd') {
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
    } else if (query === '../../../../flag.txt' || query === '../../../flag.txt') {
      setOutput(`🚩 FLAG FOUND!

flag{tr4v3rs4l_1s_just_th3_b3g1nn1ng}

`);
    } else if (query === '/../../../root/flag.txt' || query === '../../../root/flag.txt') {
      setOutput(`🎯 REAL FLAG DISCOVERED!

flag{d33p3r_r00ts_h1dd3n_tr3asur3s_4wa1t}

[✓] Submit this flag to complete the challenge!`);
    } else if (query.includes('..') || query.includes('/')) {
      setOutput(`[ERROR] No results found.
Directory traversal detected but path invalid.`);
    } else {
      setOutput('[ERROR] No results found.\nTry searching with a valid file path.');
    }
  }, []);

  const handleSearchClick = useCallback(() => {
    performSearch(searchQuery);
  }, [searchQuery, performSearch]);

  const handleFlagSubmitClick = useCallback(() => {
    if (flagInput === 'flag{d33p3r_r00ts_h1dd3n_tr3asur3s_4wa1t}') {
      setMessage('🎉 SUCCESS! Challenge completed. You\'ve mastered path traversal!');
    } else if (flagInput === 'flag{tr4v3rs4l_1s_just_th3_b3g1nn1ng}') {
      setMessage('❌ Invalid flag. Hint: Tall the tree goes down the same...');
    } else if (flagInput.trim() !== '') {
      setMessage('❌ Incorrect flag. Keep exploring!');
    }
  }, [flagInput]);

  const handleExitLab = useCallback(() => {
    setSelectedLab(null);
    setSearchQuery('');
    setOutput('');
    setFlagInput('');
    setMessage('');
  }, []);

  // Handle Lab Card Click - External redirect for Lab 2
  const handleLabClick = useCallback((labId, externalUrl) => {
    if (externalUrl) {
      // Open external lab in new tab
      window.open(externalUrl, '_blank');
    } else if (labId === 'locfile') {
      // Internal lab
      setSelectedLab(labId);
    }
  }, []);

  if (selectedLab === 'locfile') {
    return (
      <div style={styles.labContainer}>
        <div style={styles.labContent}>
          <div style={styles.labHeader}>
            <div>
              <h1 style={styles.labTitle}>LocFile Challenge</h1>
              <p style={styles.labSubtitle}>Find the hidden flag through path traversal</p>
            </div>
            <button onClick={handleExitLab} style={styles.exitButton}>
              <X style={styles.exitIcon} />
              Exit Lab
            </button>
          </div>

          <div style={styles.labGrid}>
            <div style={styles.sidebar}>
              <h3 style={styles.sidebarTitle}>
                <AlertTriangle style={styles.warningIcon} />
                Available Files
              </h3>
              <div style={styles.fileList}>
                {Object.entries(fileSystem).map(([name, desc]) => (
                  <div key={name} style={styles.fileItem}>
                    <p style={styles.fileName}>{name}</p>
                    <p style={styles.fileDesc}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.mainContent}>
              <div style={styles.searchSection}>
                <h3 style={styles.sectionTitle}>File Search System</h3>
                <div style={styles.searchBar}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                    placeholder="Enter file path (e.g., Operation Vapor)"
                    style={styles.searchInput}
                  />
                  <button onClick={handleSearchClick} style={styles.searchButton}>
                    Search
                  </button>
                </div>
              </div>

              {output && (
                <div style={styles.outputSection}>
                  <h3 style={styles.sectionTitle}>Output</h3>
                  <pre style={styles.outputPre}>{output}</pre>
                </div>
              )}

              {output.includes('flag{') && (
                <div style={styles.flagSection}>
                  <h3 style={styles.sectionTitle}>Submit Flag</h3>
                  <div style={styles.flagBar}>
                    <input
                      type="text"
                      value={flagInput}
                      onChange={(e) => setFlagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleFlagSubmitClick()}
                      placeholder="flag{...}"
                      style={styles.flagInput}
                    />
                    <button onClick={handleFlagSubmitClick} style={styles.submitButton}>
                      Submit
                    </button>
                  </div>
                  {message && (
                    <div style={message.includes('SUCCESS') ? styles.successMessage : styles.errorMessage}>
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
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.headerInner}>
            <Terminal style={styles.logo} />
            <h1 style={styles.title}>V.A.P.O.R</h1>
          </div>
          <p style={styles.subtitle}>Vulnerabilities • Analysis • Practice • Operations • Research</p>
          <p style={styles.description}>
            High-intensity cybersecurity practice platform simulating realistic web application vulnerabilities.
            Train like real bug bounty hunters.
          </p>
        </div>

        <div style={styles.labsSection}>
          <div style={styles.labsHeader}>
            <h2 style={styles.labsTitle}>Available Labs</h2>
            <div style={styles.liveIndicator}>
              <div style={styles.pulse}></div>
              <span style={styles.liveText}>3 Labs Live</span>
            </div>
          </div>
          
          <div style={styles.labsGrid}>
            {labs.map((lab) => (
              <LabCard 
                key={lab.id} 
                lab={lab} 
                onClick={() => handleLabClick(lab.id, lab.externalUrl)} 
              />
            ))}
          </div>
        </div>

        <div style={styles.aboutSection}>
          <h3 style={styles.aboutTitle}>About VAPOR</h3>
          <div style={styles.aboutGrid}>
            <div>
              <h4 style={styles.aboutSubtitle}>🎯 Bug Bounty Focused</h4>
              <p style={styles.aboutText}>Designed for $100k+ earning potential with realistic vulnerability chains</p>
            </div>
            <div>
              <h4 style={styles.aboutSubtitle}>🔗 Bug Chain Simulations</h4>
              <p style={styles.aboutText}>Cross-endpoint exploitation, blind-to-visible chains, auth bypass sequences</p>
            </div>
            <div>
              <h4 style={styles.aboutSubtitle}>📚 100 Mental Models</h4>
              <p style={styles.aboutText}>Structured learning path covering all OWASP Top 10 categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LabCard = memo(({ lab, onClick }) => {
  const Icon = lab.icon;
  const isComingSoon = lab.status === 'Coming Soon';
  const isExternal = !!lab.externalUrl;

  return (
    <div 
      onClick={() => !isComingSoon && onClick()}
      style={{
        ...styles.labCard,
        ...(isComingSoon ? styles.labCardDisabled : styles.labCardActive),
      }}
    >
      {isComingSoon && <div style={styles.comingSoonBadge}>Coming Soon</div>}
      {isExternal && <div style={styles.externalBadge}>🔗 External Lab</div>}
      
      <div style={{
        ...styles.iconContainer,
        background: lab.color === 'from-green-500 to-emerald-600' 
          ? 'linear-gradient(to bottom right, #22c55e, #059669)'
          : lab.color === 'from-purple-500 to-pink-600'
          ? 'linear-gradient(to bottom right, #a855f7, #db2777)'
          : 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
      }}>
        <Icon style={styles.icon} />
      </div>
      
      <h3 style={styles.labCardTitle}>{lab.title}</h3>
      <p style={styles.labCardCategory}>{lab.category}</p>
      <p style={styles.labCardDescription}>{lab.description}</p>
      
      <div style={styles.labCardFooter}>
        <span style={lab.difficulty === 'Hard' ? styles.difficultyBadgeHard : styles.difficultyBadgeMedium}>
          {lab.difficulty}
        </span>
        {!isComingSoon && <ChevronRight style={styles.chevron} />}
      </div>
    </div>
  );
});

const labs = [
  {
    id: 'locfile',
    title: 'LocFile: Path Traversal',
    difficulty: 'Medium',
    category: 'A01 - Broken Access Control',
    description: 'Explore a vulnerable file search system. Can you find the hidden flag?',
    icon: Terminal,
    color: 'from-green-500 to-emerald-600',
    status: 'Live',
    externalUrl: null // Internal lab
  },
  {
    id: 'cryptoweak',
    title: 'CryptoWeak: Token Forgery',
    difficulty: 'Hard',
    category: 'A02 - Cryptographic Failures',
    description: 'Break weak JWT implementation and escalate privileges.',
    icon: Lock,
    color: 'from-purple-500 to-pink-600',
    status: 'Live',
    externalUrl: 'https://vapor-lab2-cryptoweak.vercel.app/' // Replace with your actual URL
  },
  {
    id: 'idor-hunter',
    title: 'SuperLeak: Broken Access',
    difficulty: 'Medium',
    category: 'A01 - Broken Access Control',
    description: 'Exploit predictable references to access unauthorized data.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-600',
    status: 'Live',
    externalUrl: 'https://vapor-lab3-superleak.vercel.app/' // Replace with your actual URL
  }
];

const fileSystem = {
  'War Archive 1': '🗂️ Old deployment files (Empty)',
  'Project WaterPark': '🎢 Internal project docs (Access Denied)',
  'Config Backups': '⚙️ Configuration archives (Corrupted)',
  'Legacy Systems': '💾 Deprecated modules (No Data)',
  'Temp Storage': '📦 Temporary files (Cleared)',
};

const styles = {
  container: { minHeight: '100vh', background: '#000', padding: '2rem' },
  content: { maxWidth: '80rem', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '3rem' },
  headerInner: { display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
  logo: { width: '3rem', height: '3rem', color: '#22c55e' },
  title: { fontSize: '3.75rem', fontWeight: 'bold', color: 'white', margin: 0 },
  subtitle: { fontSize: '1.5rem', color: '#9ca3af', marginBottom: '0.5rem' },
  description: { color: '#6b7280', maxWidth: '42rem', margin: '0 auto' },
  
  labsSection: { marginBottom: '2rem' },
  labsHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' },
  labsTitle: { fontSize: '1.875rem', fontWeight: 'bold', color: 'white', margin: 0 },
  liveIndicator: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80' },
  pulse: { width: '0.5rem', height: '0.5rem', background: '#22c55e', borderRadius: '50%' },
  liveText: { fontSize: '0.875rem', fontWeight: '600' },
  
  labsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
  
  labCard: {
    position: 'relative',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '2px solid',
    transition: 'all 0.3s',
  },
  labCardActive: {
    borderColor: 'rgba(34, 197, 94, 0.3)',
    background: 'rgba(17, 24, 39, 0.5)',
    cursor: 'pointer',
  },
  labCardDisabled: {
    borderColor: '#374151',
    background: 'rgba(17, 24, 39, 0.3)',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  
  comingSoonBadge: {
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
  },
  
  externalBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  },
  
  iconContainer: { display: 'inline-flex', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' },
  icon: { width: '1.5rem', height: '1.5rem', color: 'white' },
  
  labCardTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' },
  labCardCategory: { color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem' },
  labCardDescription: { color: '#d1d5db', marginBottom: '1rem' },
  
  labCardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  difficultyBadgeHard: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171'
  },
  difficultyBadgeMedium: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    background: 'rgba(249, 115, 22, 0.2)',
    color: '#fb923c'
  },
  chevron: { width: '1.25rem', height: '1.25rem', color: '#22c55e' },
  
  aboutSection: {
    background: 'rgba(17, 24, 39, 0.5)',
    border: '1px solid #1f2937',
    borderRadius: '0.75rem',
    padding: '1.5rem'
  },
  aboutTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' },
  aboutGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', color: '#d1d5db' },
  aboutSubtitle: { color: '#4ade80', fontWeight: '600', marginBottom: '0.5rem' },
  aboutText: { fontSize: '0.875rem' },
  
  labContainer: { minHeight: '100vh', background: '#000', padding: '2rem' },
  labContent: { maxWidth: '72rem', margin: '0 auto' },
  labHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' },
  labTitle: { fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' },
  labSubtitle: { color: '#9ca3af' },
  
  exitButton: {
    padding: '0.5rem 1rem',
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    borderRadius: '0.5rem',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  exitIcon: { width: '1rem', height: '1rem' },
  
  labGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '1.5rem' },
  
  sidebar: { background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' },
  sidebarTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  warningIcon: { width: '1.25rem', height: '1.25rem', color: '#facc15' },
  fileList: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  fileItem: { padding: '0.75rem', background: 'rgba(31, 41, 55, 0.5)', borderRadius: '0.5rem', cursor: 'pointer' },
  fileName: { color: 'white', fontSize: '0.875rem', fontWeight: '500', margin: 0 },
  fileDesc: { color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem', margin: 0 },
  
  mainContent: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  
  searchSection: { background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' },
  sectionTitle: { fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' },
  searchBar: { display: 'flex', gap: '0.5rem' },
  searchInput: {
    flex: 1,
    background: '#1f2937',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #374151',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    outline: 'none'
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    background: '#22c55e',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer'
  },
  
  outputSection: { background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' },
  outputPre: {
    background: '#000',
    padding: '1rem',
    borderRadius: '0.5rem',
    color: '#4ade80',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    border: '1px solid #1f2937',
    margin: 0
  },
  
  flagSection: { background: '#111827', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #1f2937' },
  flagBar: { display: 'flex', gap: '0.5rem', marginBottom: '1rem' },
  flagInput: {
    flex: 1,
    background: '#1f2937',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #374151',
    fontFamily: 'monospace',
    outline: 'none'
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    background: '#3b82f6',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer'
  },
  
  successMessage: {
    padding: '1rem',
    borderRadius: '0.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    color: '#4ade80',
    border: '1px solid rgba(34, 197, 94, 0.3)'
  },
  errorMessage: {
    padding: '1rem',
    borderRadius: '0.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  }
};

export default VaporLabs;
