const fs = require('fs');

// Path to the report.json file
const reportPath = './report.json';

// Function to analyze unused JavaScript and CSS
function analyzeUnusedResources() {
    if (!fs.existsSync(reportPath)) {
        console.error('Error: report.json file not found.');
        return;
    }

    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

    // Extract unused JavaScript and CSS data from the audits section
    const unusedJsAudit = reportData.audits['unused-javascript'];
    const unusedCssAudit = reportData.audits['unused-css-rules'];

    console.log('--- Unused JavaScript Summary ---');
    if (unusedJsAudit && unusedJsAudit.details && unusedJsAudit.details.items) {
        unusedJsAudit.details.items.forEach((item, index) => {
            console.log(`${index + 1}. URL: ${item.url || 'N/A'}`);
            console.log(`   Wasted Bytes: ${item.wastedBytes || 0}`);
        });
    } else {
        console.log('No unused JavaScript detected.');
    }

    console.log('\n--- Unused CSS Summary ---');
    if (unusedCssAudit && unusedCssAudit.details && unusedCssAudit.details.items) {
        unusedCssAudit.details.items.forEach((item, index) => {
            console.log(`${index + 1}. URL: ${item.url || 'N/A'}`);
            console.log(`   Wasted Bytes: ${item.wastedBytes || 0}`);
        });
    } else {
        console.log('No unused CSS detected.');
    }
}

// Run the analysis
analyzeUnusedResources();