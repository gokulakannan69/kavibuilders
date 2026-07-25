import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectsDir = './public/projects';
const tempDir = './public/projects_compressed';

// Create temp directory
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.jpg'));
console.log(`Found ${files.length} images to compress...\n`);

for (const file of files) {
  const inputPath = path.join(projectsDir, file);
  const outputPath = path.join(tempDir, file);
  const originalSize = fs.statSync(inputPath).size;
  
  await sharp(inputPath)
    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toFile(outputPath);
  
  const newSize = fs.statSync(outputPath).size;
  const savedMB = ((originalSize - newSize) / 1024 / 1024).toFixed(1);
  console.log(`${file}: ${(originalSize/1024/1024).toFixed(1)}MB -> ${(newSize/1024/1024).toFixed(1)}MB (saved ${savedMB}MB)`);
}

// Now replace originals with compressed versions
console.log('\nReplacing originals with compressed versions...');
for (const file of files) {
  const originalPath = path.join(projectsDir, file);
  const compressedPath = path.join(tempDir, file);
  fs.unlinkSync(originalPath);
  fs.renameSync(compressedPath, originalPath);
}

// Remove temp directory
fs.rmdirSync(tempDir);

console.log('\n✅ All images compressed successfully!');
