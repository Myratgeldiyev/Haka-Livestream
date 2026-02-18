/**
 * Patches react-native-svga-player android/build.gradle for Gradle 8 / AGP 8:
 * - Remove deprecated "apply plugin: 'maven'" (both occurrences)
 * - Add compileSdk in android block for AGP 8
 * - Remove afterEvaluate block (maven publishing) that references removed maven plugin
 * - Use SVGAPlayer-Android 2.6.1 (2.5.3 not available on JitPack)
 */
const path = require('path');
const fs = require('fs');

const buildGradlePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-svga-player',
  'android',
  'build.gradle'
);

if (!fs.existsSync(buildGradlePath)) {
  process.exit(0);
}

let content = fs.readFileSync(buildGradlePath, 'utf8');

// 1. Remove both "apply plugin: 'maven'" lines
content = content.replace(/\napply plugin: 'maven'\n/g, '\n');

// 2. Add compileSdk after "android {" (first occurrence of android { in the block we care about)
content = content.replace(
  /(android \{\s*\n)(\s*compileSdkVersion )/,
  '$1    compileSdk safeExtGet(\'compileSdkVersion\', 35)\n$2'
);

// 3. Remove configureReactNativePom and afterEvaluate block to end of file
const blockStart = content.indexOf('\n\ndef configureReactNativePom(def pom)');
if (blockStart !== -1) {
  content = content.slice(0, blockStart + 1); // keep trailing newline after "}\n"
}

// 4. Use SVGAPlayer-Android 2.6.1 (2.5.3 not resolvable on JitPack)
content = content.replace(
  /com\.github\.yyued:SVGAPlayer-Android:2\.5\.3/,
  'com.github.yyued:SVGAPlayer-Android:2.6.1'
);

fs.writeFileSync(buildGradlePath, content);
console.log('Patched react-native-svga-player android/build.gradle');
