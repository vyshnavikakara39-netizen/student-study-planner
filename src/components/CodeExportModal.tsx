import React, { useState } from 'react';
import { STANDALONE_HTML, STANDALONE_CSS, STANDALONE_JS } from '../constants/portfolioCode';
import { X, Copy, Check, Download, FileCode, ExternalLink } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode = 
    activeFile === 'html' ? STANDALONE_HTML :
    activeFile === 'css' ? STANDALONE_CSS : STANDALONE_JS;

  const fileName = 
    activeFile === 'html' ? 'index.html' :
    activeFile === 'css' ? 'style.css' : 'app.js';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCurrent = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // Download all 3 files sequentially
    const files = [
      { name: 'index.html', content: STANDALONE_HTML },
      { name: 'style.css', content: STANDALONE_CSS },
      { name: 'app.js', content: STANDALONE_JS },
    ];

    files.forEach((f, idx) => {
      setTimeout(() => {
        const blob = new Blob([f.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = f.name;
        link.click();
        URL.revokeObjectURL(url);
      }, idx * 250);
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Standalone HTML, CSS & JavaScript Code
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Organized into separate beginner-friendly files, zero backend needed, ready for college portfolio submission.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setActiveFile('html')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFile === 'html'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveFile('css')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFile === 'css'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              style.css
            </button>
            <button
              onClick={() => setActiveFile('js')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFile === 'js'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              app.js
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {fileName}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadCurrent}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {fileName}</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All 3 Files</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-6 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed selection:bg-blue-900 selection:text-white">
          <pre className="whitespace-pre overflow-x-auto">{currentCode}</pre>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Tip: Place <code>index.html</code>, <code>style.css</code>, and <code>app.js</code> in the same folder and open in any browser or push to GitHub Pages!
          </span>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
