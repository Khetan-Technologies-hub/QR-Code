import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Link, Download, Share2, Zap } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-on-accent">
      {/* Header Section */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-2 rounded-lg">
            <Zap className="text-on-accent w-6 h-6" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight">
            QR<span className="text-accent">Gen</span>
          </h1>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Home</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Input */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Create your <br />
              <span className="text-accent">digital bridge.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Transform any link into a high-quality QR code instantly.
              Fast, minimal, and ready for your next project.
            </p>
          </div>

          <div className="relative group max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Link className="text-muted-foreground w-5 h-5" />
            </div>
            <input
              type="url"
              placeholder="https://your-link-here.com"
              className="w-full bg-card border-2 border-border text-foreground pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-accent transition-all placeholder:text-muted-foreground text-lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsGenerating(true)}
              disabled={!url}
              className="bg-accent text-on-accent px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              Generate QR Code
            </button>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="flex justify-center">
          <div className="bg-card p-8 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden group">
            {/* Geometric Accent Background */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="bg-white p-4 rounded-3xl shadow-inner">
                <QRCodeCanvas
                  id="qr-code-canvas"
                  value={url || 'https://github.com/Khetan-Technologies-hub/QR-Code'}
                  size={256}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadQRCode}
                  disabled={!url}
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-on-secondary rounded-xl font-semibold hover:bg-muted transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    alert('Link copied!');
                  }}
                  disabled={!url}
                  className="p-3 bg-secondary text-on-secondary rounded-xl hover:bg-muted transition-colors disabled:opacity-50"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Geometric Accents */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-accent opacity-20" />
    </div>
  );
}

export default App;
