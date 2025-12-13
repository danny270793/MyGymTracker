import path from 'node:path'
import fs from 'node:fs'
import { version, versionCode } from '../../package.json'

async function main(): Promise<void> {
    const androidPath: string = path.join('.', 'android', 'app', 'build.gradle')
    const androidContent: string = fs.readFileSync(androidPath, 'utf8')
    const updatedAndroidContent = androidContent
        .split('\n')
        .map(line => line.includes('versionName') ? `        versionName "${version}"` : line)
        .map(line => line.includes('versionCode') ? `        versionCode ${versionCode}` : line)
        .join('\n');
    fs.writeFileSync(androidPath, updatedAndroidContent)

    const iOSPath: string = path.join('.', 'ios', 'App', 'App.xcodeproj', 'project.pbxproj')
    const iOSContent: string = fs.readFileSync(iOSPath, 'utf8')
    const updatediOSContent = iOSContent
        .split('\n')
        .map(line => line.includes('MARKETING_VERSION') ? `				MARKETING_VERSION = ${version};` : line)
        .map(line => line.includes('CURRENT_PROJECT_VERSION') ? `				CURRENT_PROJECT_VERSION = ${versionCode};` : line)
        .join('\n');
    fs.writeFileSync(iOSPath, updatediOSContent)
}

main().catch(console.error)
