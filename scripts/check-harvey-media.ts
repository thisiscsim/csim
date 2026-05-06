import 'dotenv/config';

const storageZone = process.env.BUNNY_STORAGE_ZONE;
const apiKey = process.env.BUNNY_STORAGE_API_KEY;
const region = process.env.BUNNY_STORAGE_REGION || 'de';
const pullZoneUrl = process.env.BUNNY_PULL_ZONE_URL;

if (!storageZone || !apiKey || !pullZoneUrl) {
  console.error(
    'Missing env vars. Need BUNNY_STORAGE_ZONE, BUNNY_STORAGE_API_KEY, BUNNY_PULL_ZONE_URL'
  );
  process.exit(1);
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const videoExtensions = ['.mp4', '.webm', '.mov'];
const allMediaExtensions = [...imageExtensions, ...videoExtensions];

const storageHost = region === 'de' ? 'storage.bunnycdn.com' : `${region}.storage.bunnycdn.com`;

interface BunnyFile {
  ObjectName: string;
  Length: number;
  LastChanged: string;
  IsDirectory: boolean;
}

function isMediaFile(file: BunnyFile) {
  const ext = file.ObjectName.toLowerCase();
  return allMediaExtensions.some((mediaExt) => ext.endsWith(mediaExt));
}

function isVideoFile(file: BunnyFile) {
  const ext = file.ObjectName.toLowerCase();
  return videoExtensions.some((videoExt) => ext.endsWith(videoExt));
}

async function listFiles(path: string): Promise<BunnyFile[]> {
  const apiUrl = `https://${storageHost}/${storageZone}/${path}`;
  console.log(`\nFetching: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: { AccessKey: apiKey! },
  });

  if (!response.ok) {
    console.error(`  API error: ${response.status} ${response.statusText}`);
    return [];
  }

  return response.json() as Promise<BunnyFile[]>;
}

async function main() {
  console.log('=== Bunny CDN Harvey Media Diagnostic ===\n');
  console.log(`Storage Zone: ${storageZone}`);
  console.log(`Region: ${region}`);
  console.log(`Pull Zone: ${pullZoneUrl}`);

  // 1. List root /Projects/ directory
  const projectFiles = await listFiles('Projects/');

  console.log(`\n--- /Projects/ root listing ---`);
  console.log(`Total entries returned: ${projectFiles.length}`);

  const directories = projectFiles.filter((file) => file.IsDirectory);
  const files = projectFiles.filter((file) => !file.IsDirectory);

  console.log(`Directories: ${directories.length}`);
  console.log(`Files: ${files.length}`);

  if (projectFiles.length >= 1000) {
    console.warn(
      '\n⚠️  WARNING: API returned exactly 1000+ entries — pagination limit likely hit!'
    );
    console.warn('   The Bunny Storage API returns max 1000 items per request.');
    console.warn('   New files may be missing because the code does not paginate.');
  }

  // 2. Show all harvey_ files
  const harveyFiles = files.filter((file) => file.ObjectName.toLowerCase().startsWith('harvey'));
  const harveyMedia = harveyFiles.filter(isMediaFile);
  const harveyFiltered = harveyFiles.filter((file) => !isMediaFile(file));

  console.log(`\n--- Harvey files in /Projects/ root ---`);
  console.log(`Total harvey* files: ${harveyFiles.length}`);
  console.log(`Harvey media (pass filter): ${harveyMedia.length}`);
  console.log(`Harvey non-media (filtered out): ${harveyFiltered.length}`);

  if (harveyFiltered.length > 0) {
    console.log('\n  Filtered OUT (extension not recognized):');
    harveyFiltered.forEach((file) => console.log(`    - ${file.ObjectName}`));
  }

  console.log('\n  Harvey media files found:');
  harveyMedia.forEach((file) => {
    const isVideo = isVideoFile(file);
    console.log(
      `    ${isVideo ? '🎬' : '🖼️ '} ${file.ObjectName} (${(file.Length / 1024 / 1024).toFixed(1)} MB, modified: ${file.LastChanged})`
    );
  });

  // 3. Show harvey-* directories
  const harveyDirs = directories.filter((file) =>
    file.ObjectName.toLowerCase().startsWith('harvey')
  );

  if (harveyDirs.length > 0) {
    console.log(`\n--- Harvey subdirectories in /Projects/ ---`);
    for (const dir of harveyDirs) {
      const subFiles = await listFiles(`Projects/${dir.ObjectName}`);
      const subMedia = subFiles.filter((file) => !file.IsDirectory && isMediaFile(file));
      console.log(`  📁 ${dir.ObjectName} → ${subMedia.length} media files`);
      subMedia.forEach((file) => {
        const isVideo = isVideoFile(file);
        console.log(`       ${isVideo ? '🎬' : '🖼️ '} ${file.ObjectName}`);
      });
    }
    console.log('\n  ⚠️  NOTE: Files in subdirectories are NOT returned by fetchProjectMedia().');
    console.log('     The current code only lists the root /Projects/ directory.');
  }

  // 4. Check all non-harvey files for context
  const nonHarveyMedia = files.filter((file) => {
    if (file.ObjectName.toLowerCase().startsWith('harvey')) return false;
    return isMediaFile(file);
  });

  console.log(`\n--- Non-Harvey media in /Projects/ root ---`);
  console.log(`Count: ${nonHarveyMedia.length}`);
  nonHarveyMedia.forEach((file) => {
    const isVideo = isVideoFile(file);
    console.log(`    ${isVideo ? '🎬' : '🖼️ '} ${file.ObjectName}`);
  });

  console.log('\n=== Done ===');
}

main().catch(console.error);
