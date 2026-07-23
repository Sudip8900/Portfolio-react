import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

const PdfModal = ({ pdfUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Lock body scroll while modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!pdfUrl) return null;

    // Remove forced toolbar params to prevent browser PDF viewers from displaying white/grey toolbar bars at the bottom
    const formattedUrl = pdfUrl.includes('#') ? pdfUrl : `${pdfUrl}#toolbar=0&navpanes=0`;

    return (
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-8 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="w-full max-w-6xl h-[94vh] sm:h-[90vh] border-2 border-orange-600/40 bg-[#111111] flex flex-col relative shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-4 border-b border-white/10 bg-[#181818] text-[#eae8e4] shrink-0 select-none">
                    <div className="text-[#eae8e4] uppercase tracking-widest text-xs sm:text-sm font-bold flex items-center gap-2 sm:gap-3 truncate max-w-[45%] sm:max-w-none">
                        <span className="w-2.5 h-2.5 bg-orange-600 rounded-full animate-pulse shrink-0" />
                        <span className="truncate">[ DOCUMENT.PREVIEW ]</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        {/* Open in New Tab Button (Best for Mobile Browsers) */}
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] sm:text-xs bg-transparent text-[#eae8e4] border border-white/20 px-2.5 sm:px-3 py-1.5 uppercase tracking-wider font-bold hover:bg-white hover:text-[#111111] transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                            title="Open full PDF in new tab"
                        >
                            <Icon icon="carbon:launch" width="14" height="14" className="shrink-0" />
                            <span className="hidden xs:inline">FULLSCREEN</span>
                        </a>

                        {/* Download Button */}
                        <a
                            href={pdfUrl}
                            download
                            className="text-[10px] sm:text-xs bg-orange-600 text-white border border-orange-600 px-2.5 sm:px-3 py-1.5 uppercase tracking-wider font-bold hover:bg-orange-500 transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                            title="Download PDF file"
                        >
                            <Icon icon="carbon:cloud-download" width="14" height="14" className="shrink-0" />
                            <span className="hidden xs:inline">DOWNLOAD</span>
                        </a>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="text-[10px] sm:text-xs border border-white/20 bg-[#222222] text-[#eae8e4] px-2.5 sm:px-3 py-1.5 uppercase tracking-wider font-bold hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            title="Close preview"
                        >
                            <Icon icon="carbon:close" width="16" height="16" className="shrink-0 sm:hidden" />
                            <span className="hidden sm:inline">CLOSE</span>
                        </button>
                    </div>
                </div>

                {/* PDF Viewer Container */}
                <div className="flex-1 w-full bg-[#141414] relative overflow-hidden flex flex-col">
                    <iframe
                        src={formattedUrl}
                        className="block w-full h-full border-none min-h-0 flex-1 bg-[#141414]"
                        title="Document Preview"
                        style={{ webkitOverflowScrolling: 'touch' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PdfModal;
