const fs = require('fs');
const path = require('path');

const imgFolder = path.join(__dirname, 'img');
const outputFile = path.join(__dirname, 'veritabani.js');
const veri = {};

// img klasörü var mı kontrol et
if (fs.existsSync(imgFolder)) {
    const folders = fs.readdirSync(imgFolder);

    folders.forEach(folder => {
        const folderPath = path.join(imgFolder, folder);
        
        // Sadece klasörleri al
        if (fs.statSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath);
            const imageList = [];

            files.forEach(file => {
                // Sadece resim dosyalarını al
                if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
                    // Windows ters slaşlarını (\\) düz slaşa (/) çevir
                    imageList.push(`img/${folder}/${file}`);
                }
            });

            if (imageList.length > 0) {
                veri[folder] = imageList;
            }
        }
    });
}

const content = `const galeriVerisi = ${JSON.stringify(veri, null, 2)};`;
fs.writeFileSync(outputFile, content);

console.log("✅ Veritabanı başarıyla güncellendi!");