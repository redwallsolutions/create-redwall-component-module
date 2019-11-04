const chalk = require('chalk')
const path = require('path')
const fs = require('fs').promises
const readline = require('readline-sync')
const git = require('simple-git')()
const rimraf = require('rimraf')

const bold = chalk.bold
const successColor = bold.cyan
const redColor = bold.redBright
const muteColor = bold.rgb(100, 100, 100)

async function execute() {
	console.clear()
	console.log(
		bold(
			`Hello dev ${process.env.USER}, welcome to ${redColor(
				'Create Redwall Component Module (CRCM)'
			)} command line tool.`
		)
	)
	const projectname = getProjectName()
	console.log(successColor('Good name!'))
	const projectrepo = getProjectRepo(projectname)
	const skeletonFiles = await Promise.all([
		loadSkeletonFile('package.json'),
		loadSkeletonFile('demo/index.html'),
		loadSkeletonFile('src/lib/index.ts'),
		loadSkeletonFile('src/lib/components/index.tsx')
	])
	const replacedFiles = replaceDataInSkeletonFiles({
		skeletonFiles,
		projectname,
		projectrepo
	})
	await Promise.all(
		writeReadyFiles([
			{
				path: 'package.json',
				file: replacedFiles[0]
			},
			{
				path: 'demo/index.html',
				file: replacedFiles[1]
			},
			{
				path: 'src/lib/index.ts',
				file: replacedFiles[2]
			},
			{
				path: 'src/lib/components/index.tsx',
				file: replacedFiles[3]
			}
		])
	)
	console.log(successColor('Files were created!'))
	await prepareGitRepo(projectrepo)
	await clearConfigFiles()
	await writeNewReadmeFile()
	console.log(successColor("We're done."))
}

function getProjectName() {
	let projectname = path.basename(path.resolve())
	return readline.question(
		bold(`What's the project name? (${muteColor(projectname)}): `),
		{ defaultInput: projectname }
	)
}

function getProjectRepo(projectname) {
	let projectrepo = `https://github.com/redwallsolutions/${projectname}.git`
	return readline.question(
		`What's the git remote URL of it? (${muteColor(projectrepo)}): `,
		{
			defaultInput: projectrepo
		}
	)
}

function loadSkeletonFile(filePath) {
	return fs.readFile(filePath, { encoding: 'UTF-8' })
}

function replaceDataInSkeletonFiles({
	skeletonFiles,
	projectname,
	projectrepo
}) {
	return skeletonFiles.map(skeletonFile => {
		return skeletonFile
			.replace(/{{projectname}}|create-redwall-component-module/g, projectname)
			.replace(/{{projectname-ts}}/g, projectname.replace(/-/g, ''))
			.replace(/{{projectrepo}}/g, projectrepo)
			.replace(
				/\n    "setup": "yarn add -D chalk simple-git readline-sync && node setup.js && yarn remove chalk simple-git readline-sync",/,
				''
			)
	})
}

function writeReadyFiles(readyFiles) {
	return readyFiles.map(readyFile =>
		fs.writeFile(readyFile.path, readyFile.file)
	)
}

function prepareGitRepo(projectrepo) {
	return new Promise((resolve, reject) => {
		rimraf('.git', function() {
			git
				.init()
				.add('.')
				.commit('First commit create by CRCM')
				.addRemote('origin', projectrepo)
			resolve()
		})
	})
}

function clearConfigFiles(){
	return new Promise((resolve, reject)=> {
		rimraf('setup.js', resolve)
	})
}

async function writeNewReadmeFile(projectname) {
	await fs.readFile("README.md", {encoding: "UTF-8"})
	await fs.writeFile("README.md", `## ${projectname}`)
}

execute()
