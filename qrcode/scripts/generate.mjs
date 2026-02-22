#!/usr/bin/env node
import fs from 'fs';
import QRCode from 'qrcode';
import sharp from 'sharp';

function usage() {
    console.error(`Usage: generate.mjs "text" [-o out.svg|out.png|out.jpg] [--format svg|png|jpg] [--size 1024] [--scale 1] [--margin 4] [--dot square|circle] [--eye square|circle|rounded] [--color #000000] [--background #ffffff] [--transparent] [--ec L|M|Q|H] [--quality 80]`);
    process.exit(2);
}

const argv = process.argv.slice(2);
if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help') usage();

const text = argv[0];
let out = null;
let size = 1024; // base pixel size
let scale = 1; // multiplier applied after size
let marginModules = 4;
let dot = 'square';
let eye = 'square';
let color = '#000000';
let background = '#ffffff';
let ec = 'M';
let format = 'svg';
let quality = 80; // jpeg quality
let transparent = false;

for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-o' || a === '--out') { out = argv[++i]; continue; }
    if (a === '--size') { size = Number(argv[++i]) || size; continue; }
    if (a === '--scale') { scale = Number(argv[++i]) || scale; continue; }
    if (a === '--margin' || a === '--quiet') { marginModules = Number(argv[++i]) || marginModules; continue; }
    if (a === '--dot') { dot = argv[++i] || dot; continue; }
    if (a === '--eye') { eye = argv[++i] || eye; continue; }
    if (a === '--color') { color = argv[++i] || color; continue; }
    if (a === '--background') { background = argv[++i] || background; continue; }
    if (a === '--ec') { ec = (argv[++i] || ec).toUpperCase(); continue; }
    if (a === '--format') { format = (argv[++i] || format).toLowerCase(); continue; }
    if (a === '--quality') { quality = Number(argv[++i]) || quality; continue; }
    if (a === '--transparent') { transparent = true; continue; }
    console.error(`Unknown arg: ${a}`);
    usage();
}

// Normalize format
if (format === 'jpeg') format = 'jpg';
if (!['svg', 'png', 'jpg'].includes(format)) {
    console.error('Unsupported format:', format);
    process.exit(2);
}

// Create QR code matrix using 'qrcode' package
const qr = QRCode.create(text, { errorCorrectionLevel: ec });
const modules = qr.modules;
const moduleCount = modules.size;

function getModule(x, y) {
    if (!modules) return false;
    if (typeof modules.get === 'function') return modules.get(x, y);
    if (Array.isArray(modules.data)) return !!(modules.data[y] && modules.data[y][x]);
    return false;
}

// Compute sizes
const targetSize = Math.max(1, Math.floor(size * scale));
const cellSize = Math.floor(targetSize / (moduleCount + marginModules * 2)) || 1;
const svgSize = cellSize * (moduleCount + marginModules * 2);
const offset = marginModules * cellSize;

// Helpers to check finder pattern areas (7x7 blocks at three corners)
function inFinder(x, y) {
    if (x >= 0 && x < 7 && y >= 0 && y < 7) return true;
    if (x >= moduleCount - 7 && x < moduleCount && y >= 0 && y < 7) return true;
    if (x >= 0 && x < 7 && y >= moduleCount - 7 && y < moduleCount) return true;
    return false;
}

// Start building svg
let svg = [];
svg.push(`<?xml version="1.0" encoding="utf-8"?>`);
svg.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">`);
svg.push(`<rect width="100%" height="100%" fill="${transparent ? 'none' : background}"/>`);

// Draw modules (skip finder areas - we'll render eyes separately)
for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
        if (!getModule(col, row)) continue;
        if (inFinder(col, row)) continue;
        const x = offset + col * cellSize;
        const y = offset + row * cellSize;
        if (dot === 'circle') {
            const cx = x + cellSize / 2;
            const cy = y + cellSize / 2;
            const r = Math.max(0, cellSize * 0.45);
            svg.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`);
        } else {
            svg.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}"/>`);
        }
    }
}

// Draw finder patterns (eyes)
const eyes = [[0, 0], [moduleCount - 7, 0], [0, moduleCount - 7]];
for (const [fx, fy] of eyes) {
    const x = offset + fx * cellSize;
    const y = offset + fy * cellSize;
    const w = 7 * cellSize;

    if (eye === 'circle') {
        const cx = x + 3.5 * cellSize;
        const cy = y + 3.5 * cellSize;
        const r = 3.5 * cellSize;
        svg.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`);
        svg.push(`<circle cx="${cx}" cy="${cy}" r="${2.5 * cellSize}" fill="${transparent ? 'none' : background}"/>`);
        svg.push(`<circle cx="${cx}" cy="${cy}" r="${1.1 * cellSize}" fill="${color}"/>`);
    } else if (eye === 'rounded') {
        const rx = cellSize * 1.2;
        svg.push(`<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="${rx}" ry="${rx}" fill="${color}"/>`);
        svg.push(`<rect x="${x + cellSize}" y="${y + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" rx="${cellSize}" ry="${cellSize}" fill="${transparent ? 'none' : background}"/>`);
        svg.push(`<rect x="${x + 2 * cellSize}" y="${y + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" rx="${cellSize * 0.5}" ry="${cellSize * 0.5}" fill="${color}"/>`);
    } else {
        svg.push(`<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="${color}"/>`);
        svg.push(`<rect x="${x + cellSize}" y="${y + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="${transparent ? 'none' : background}"/>`);
        svg.push(`<rect x="${x + 2 * cellSize}" y="${y + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="${color}"/>`);
    }
}

svg.push(`</svg>`);

const outSvg = svg.join('\n');

async function produce() {
    if (format === 'svg') {
        if (out) {
            fs.writeFileSync(out, outSvg, 'utf8');
            console.log(`Wrote ${out}`);
        } else {
            process.stdout.write(outSvg);
        }
        return;
    }

    // For PNG/JPG conversion we require an output file (binary stream to stdout is not supported here)
    if (!out) {
        console.error('Please specify --out <file> when using --format png|jpg');
        process.exit(2);
    }

    const svgBuffer = Buffer.from(outSvg, 'utf8');
    let image = sharp(svgBuffer, { density: 72 })
        .resize(svgSize, svgSize, { fit: 'contain' });

    if (format === 'png') {
        if (transparent) {
            image = image.png({ compressionLevel: 9 });
        } else {
            image = image.png({ compressionLevel: 9, background: { r: 255, g: 255, b: 255 } });
        }
    } else if (format === 'jpg') {
        const bg = transparent ? '#ffffff' : background;
        image = image.flatten({ background: bg }).jpeg({ quality: Math.max(1, Math.min(100, quality)) });
    }

    await image.toFile(out);
    console.log(`Wrote ${out}`);
}

produce().catch(err => {
    console.error('Error producing output:', err.message || err);
    process.exit(1);
});
