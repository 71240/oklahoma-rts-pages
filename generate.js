const fs = require('fs');

// Colors: medium blue, navy blue, green
const colors = ['#2563eb', '#1e40af', '#059669'];

// Read cities
const cities = fs.readFileSync('cities.txt', 'utf8').split('\n').filter(c => c.trim());

// Read template
const template = fs.readFileSync('template.html', 'utf8');

// Create pages folder
if (!fs.existsSync('pages')) {
    fs.mkdirSync('pages');
}

// Generate each city page
cities.forEach((city, index) => {
    const color = colors[index % colors.length];
    let html = template.replace(/{{city}}/g, city.trim());
    html = html.replace(/{{color}}/g, color);
    
    const filename = `pages/${city.trim().toLowerCase().replace(/ /g, '-')}.html`;
    fs.writeFileSync(filename, html);
    console.log(`Created: ${filename} with color ${color}`);
});

console.log('All city pages generated!');
