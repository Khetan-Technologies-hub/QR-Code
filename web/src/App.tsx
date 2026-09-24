import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Link, Download, Share2, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (url) setIsGenerated(true);
    else setIsGenerated(false);
  }, [url]);

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-on-accent overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-accent p-2 rounded-xl transition-transform group-hover:rotate-12 duration-300">
            <Zap className="text-on-accent w-6 h-6" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight">
            QR<span className="text-accent">Gen</span>
          </h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full">Home</a>
          <a href="#" className="hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full">Guide</a>
          <a href="#" className="hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full">Contact</a>
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Input */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider animate-bounce">
              <Sparkles className="w-3 h-3" />
              Instant Generation
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] tracking-tighter">
              Connect <br />
              <span className="text-accent italic">Everything.</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-md leading-relaxed">
              The most minimal way to bridge your digital content to the physical world.
              <span className="text-foreground font-medium"> Permanent. Free. Fast.</span>
            </p>
          </div>

          <div className="relative group max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-accent">
              <Link className="text-muted-foreground w-6 h-6" />
            </div>
            <input
              type="url"
              placeholder="Paste your link here..."
              className="w-full bg-card border-2 border-border text-foreground pl-14 pr-6 py-5 rounded-2xl focus:outline-none focus:border-accent transition-all placeholder:text-muted-foreground text-lg shadow-2xl group-hover:border-muted"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {url && (
              <div className="absolute right-4 inset-y-0 flex items-center">
                <CheckCircle2 className="text-accent w-5 h-5 animate-in fade-in slide-in-from-right-2" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              disabled={!url}
              className="bg-accent text-on-accent px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-3 group"
            >
              Generate Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="flex justify-center">
          <div className="relative group">
            {/* Decorative Ring */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] blur-xl group-hover:blur-2xl transition-all duration-500" />

            <div className="relative z-10 bg-card p-10 rounded-[3rem] border border-border shadow-2xl flex flex-col items-center gap-10 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="bg-white p-6 rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <QRCodeCanvas
                  id="qr-code-canvas"
                  value={url || 'https://github.com/Khetan-Technologies-hub/QR-Code'}
                  size={280}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={downloadQRCode}
                  disabled={!url}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-secondary text-on-secondary rounded-2xl font-bold hover:bg-muted transition-all active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  Download PNG
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!url}
                  className="p-4 bg-secondary text-on-secondary rounded-2xl hover:bg-muted transition-all active:scale-95 disabled:opacity-50 relative"
                >
                  {isCopied ? <CheckCircle2 className="w-6 h-6 text-accent" /> : <Share2 className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Geometric Pattern */}
      <footer className="relative z-10 mt-20 p-12 text-center text-muted-foreground text-sm border-t border-border/50">
        <p>© {new Date().getFullYear()} QRGen. Built for the modern web.</p>
      </footer>
    </div>
  );
}

export default App;
