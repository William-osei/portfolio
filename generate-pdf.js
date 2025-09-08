#!/usr/bin/env node

/**
 * PDF Generation Script for William Osei Aborah's Resume
 * 
 * This script provides instructions for generating a PDF from the resume.html file.
 * Since puppeteer installation is blocked, we provide alternative methods.
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('📄 RESUME PDF GENERATION GUIDE');
console.log('='.repeat(60));

console.log(`
William Osei Aborah's Resume PDF Generation

There are several ways to generate a PDF from your resume:

🌐 METHOD 1: Browser Print to PDF (Recommended)
   1. Open resume.html in any modern web browser
   2. Press Ctrl+P (Windows/Linux) or Cmd+P (Mac)
   3. Select "Save as PDF" as the destination
   4. Choose your preferred settings:
      - Paper size: A4 or Letter
      - Margins: Minimum or None
      - Options: Include background graphics
   5. Click "Save" and choose your location

📱 METHOD 2: Online HTML to PDF Converters
   - Upload resume.html to services like:
     * HTML to PDF API
     * PDFShift
     * wkhtmltopdf online tools

💻 METHOD 3: Command Line Tools (if available)
   - wkhtmltopdf: wkhtmltopdf resume.html resume.pdf
   - Chrome headless: chrome --headless --print-to-pdf resume.html

🔧 METHOD 4: Developer Tools
   - Open resume.html in Chrome/Edge
   - Press F12 to open Developer Tools
   - Press Ctrl+Shift+P, type "pdf", select "Print to PDF"

📋 CURRENT RESUME FILES:
   - HTML Version: resume.html
   - Markdown Version: resume.md
   - CSS Styles: css/resume.css
`);

// Check if resume files exist
const resumeFiles = ['resume.html', 'resume.md', 'css/resume.css'];
console.log('📁 FILE STATUS:');
resumeFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    const exists = fs.existsSync(filePath);
    const status = exists ? '✅' : '❌';
    const size = exists ? `(${Math.round(fs.statSync(filePath).size / 1024)}KB)` : '';
    console.log(`   ${status} ${file} ${size}`);
});

console.log(`
📌 TIP: The resume.html file has been optimized for PDF generation with:
   - High-quality print styles
   - Proper page breaks
   - Readable fonts and colors
   - Professional layout

🎯 For best results, use Method 1 (Browser Print to PDF) as it's the most reliable
   and preserves all styling and formatting.

💡 Need help? The resume also includes a "Download PDF" button that provides
   step-by-step instructions when clicked.
`);

console.log('='.repeat(60));