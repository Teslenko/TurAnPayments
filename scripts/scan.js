const fetch = require('node-fetch');

async function scanPayments() {
  try {
    console.log('Starting payment scan...');
    
    const response = await fetch('http://localhost:3000/api/_cron/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (data.success) {
      console.log(`Scan completed: ${data.processed}/${data.total} payments processed`);
    } else {
      console.error('Scan failed:', data.error);
    }
  } catch (error) {
    console.error('Error running scan:', error);
  }
}

// Run scan if called directly
if (require.main === module) {
  scanPayments();
}

module.exports = { scanPayments };
