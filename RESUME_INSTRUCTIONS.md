# William Osei Aborah - Resume Instructions

This document provides instructions for viewing and generating PDF versions of William's resume.

## 📋 Available Resume Formats

1. **HTML Version** (`resume.html`) - Interactive web version
2. **Markdown Version** (`resume.md`) - Plain text version
3. **PDF Version** - Generated from HTML using browser print functionality

## 🌐 Viewing the Resume

### Option 1: Local Web Server (Recommended)
```bash
# Clone or download the repository
cd portfolio

# Start a local web server
npm run serve
# OR
python3 -m http.server 8000
# OR
python -m http.server 8000

# Open in browser: http://localhost:8000/resume.html
```

### Option 2: Direct File Opening
Simply double-click `resume.html` to open it in your default web browser. The resume includes inline CSS fallbacks to ensure it displays correctly even with file:// protocol.

## 📄 Generating PDF

### Method 1: Using the "Download PDF" Button
1. Open `resume.html` in your web browser
2. Click the "📄 Download PDF" button
3. Follow the on-screen instructions to save as PDF

### Method 2: Browser Print Function
1. Open `resume.html` in any modern web browser
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Select "Save as PDF" as the destination
4. Recommended settings:
   - Paper size: A4 or Letter
   - Margins: Minimum or None
   - Options: ✅ Include background graphics
5. Click "Save" and choose your location

### Method 3: Command Line (if available)
```bash
# Generate PDF generation instructions
npm run generate-pdf

# Using wkhtmltopdf (if installed)
wkhtmltopdf resume.html William_Osei_Resume.pdf

# Using Chrome headless (if Chrome is installed)
google-chrome --headless --print-to-pdf=William_Osei_Resume.pdf resume.html
```

## 🎨 Resume Features

- **Professional Layout**: Clean, modern design optimized for both screen and print
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Print-Optimized**: Special CSS styles for high-quality PDF generation
- **Contact Links**: Clickable email, phone, and LinkedIn links
- **Comprehensive Content**: 
  - Career objective
  - Education details
  - Professional experience
  - Technical skills
  - Featured projects
  - Certifications and additional information

## 🛠️ Technical Details

- **HTML5/CSS3**: Modern web standards
- **Print CSS**: Optimized styles for PDF generation
- **No JavaScript Dependencies**: Works without internet connection
- **Cross-Browser Compatible**: Works in all modern browsers
- **File Protocol Compatible**: Can be opened directly from file system

## 📁 File Structure

```
├── resume.html              # Main resume file
├── resume.md               # Markdown version
├── css/
│   └── resume.css          # Resume-specific styles
├── generate-pdf.js         # PDF generation helper script
├── package.json            # npm scripts
└── RESUME_INSTRUCTIONS.md  # This file
```

## 💡 Tips for Best Results

1. **For PDF Generation**: Use Chrome, Edge, or Firefox for best print quality
2. **Background Graphics**: Enable "Background graphics" in print settings to preserve colors
3. **Page Breaks**: The resume is optimized to avoid awkward page breaks
4. **Mobile Viewing**: The resume is fully responsive and mobile-friendly
5. **Offline Access**: Once downloaded, the resume works without internet

## 🆘 Troubleshooting

### Issue: Resume doesn't display properly
- **Solution**: Try using the web server method instead of opening the file directly
- Use `npm run serve` or `python3 -m http.server 8000`

### Issue: PDF colors look faded
- **Solution**: Enable "Background graphics" in your browser's print settings

### Issue: PDF layout is cut off
- **Solution**: Adjust margins to "Minimum" or "None" in print settings

### Issue: Links not working in HTML version
- **Solution**: Make sure you're viewing via HTTP (localhost) rather than file:// protocol

## 📞 Contact Information

If you need a pre-generated PDF version or have any questions, please contact:

**William Osei Aborah**
- 📧 Email: trickskidwilliam@gmail.com
- 📞 Phone: +233 50 395 2204
- 🔗 LinkedIn: [linkedin.com/in/william-osei](https://linkedin.com/in/william-osei)

---

*Last updated: September 2025*