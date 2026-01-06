import React, { useState } from 'react';
import { Terminal, Shield, Lock, AlertTriangle, ChevronRight, X } from 'lucide-react';

const VaporLabs = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

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

  // Simulated file system
  const fileSystem = {
    'War Archive 1': '🗂️ Old deployment files (Empty)',
    'Project WaterPark': '🎢 Internal project docs (Access Denied)',
    'Config Backups': '⚙️ Configuration archives (Corrupted)',
    'Legacy Systems': '💾 Deprecated modules (No Data)',
    'Temp Storage': '📦 Temporary files (Cleared)',
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setMessage('');
    setFlagInput('');

    // Backend logic simulation
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

[!] This flag is invalid.
[?] Tall the tree goes down the same...`);
    } else if (query === '/../../../root/flag.txt' || query === '/../../root/flag.txt') {
      setOutput(`🎯 REAL FLAG DISCOVERED!

flag{d33p3r_r00ts_h1dd3n_tr3asur3s_4wa1t}

[✓] Submit this flag to complete the challenge!`);
    } else if (query.includes('..') || query.includes('/')) {
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
        className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
          isComingSoon 
            ? 'border-gray-700 bg-gray-900/30 cursor-not-allowed opacity-60' 
            : 'border-green-500/30 bg-gray-900/50 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer hover:scale-105'
        }`}
      >
        {isComingSoon && (
          <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/30">
            Coming Soon
          </div>
        )}
        
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${lab.color} mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{lab.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{lab.category}</p>
        <p className="text-gray-300 mb-4">{lab.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            lab.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
          }`}>
            {lab.difficulty}
          </span>
          {!isComingSoon && (
            <ChevronRight className="w-5 h-5 text-green-500" />
          )}
        </div>
      </div>
    );
  };

  const LocFileLab = () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">LocFile Challenge</h1>
            <p className="text-gray-400">Find the hidden flag through path traversal</p>
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
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 border border-red-500/30 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Exit Lab
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Available Files
            </h3>
            <div className="space-y-2">
              {Object.entries(fileSystem).map(([name, desc]) => (
                <div key={name} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-gray-500 text-xs mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">File Search System</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  placeholder="Enter file path (e.g., ../../../../etc/passwd)"
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none font-mono text-sm"
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {output && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Output</h3>
                <pre className="bg-black p-4 rounded-lg text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap border border-gray-800">
                  {output}
                </pre>
              </div>
            )}

            {output.includes('flag{') && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Submit Flag</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleFlagSubmit()}
                    placeholder="flag{...}"
                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none font-mono"
                  />
                  <button
                    onClick={handleFlagSubmit}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                  >
                    Submit
                  </button>
                </div>
                {message && (
                  <div className={`p-4 rounded-lg ${
                    message.includes('SUCCESS') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
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
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Terminal className="w-12 h-12 text-green-500" />
            <h1 className="text-6xl font-bold text-white">V.A.P.O.R</h1>
          </div>
          <p className="text-2xl text-gray-400 mb-2">Vulnerabilities • Analysis • Practice • Operations • Research</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            High-intensity cybersecurity practice platform simulating realistic web application vulnerabilities.
            Train like real bug bounty hunters.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Available Labs</h2>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">1 Lab Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">About VAPOR</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h4 className="text-green-400 font-semibold mb-2">🎯 Bug Bounty Focused</h4>
              <p className="text-sm">Designed for $100k+ earning potential with realistic vulnerability chains</p>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold mb-2">🔗 Bug Chain Simulations</h4>
              <p className="text-sm">Cross-endpoint exploitation, blind-to-visible chains, auth bypass sequences</p>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold mb-2">📚 100 Mental Models</h4>
              <p className="text-sm">Structured learning path covering all OWASP Top 10 categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaporLabs;
