const chalk = require('chalk')
const path = require('path')
const fs = require('fs').promises
const readline = require('readline-sync')
const git = require('simple-git')()

const bold = chalk.bold
const successColor = bold.cyan
const redColor = bold.redBright
const muteColor = bold.rgb(100, 100, 100)

async function execute() {
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
				path: 'package2.json',
				file: replacedFiles[0]
			},
			{
				path: 'demo/index2.html',
				file: replacedFiles[1]
			},
			{
				path: 'src/lib/index2.ts',
				file: replacedFiles[2]
			},
			{
				path: 'src/lib/components/index2.tsx',
				file: replacedFiles[3]
			}
		])
	)
	console.log(successColor('Files were created!'))
	prepareGitRepo()
	console.log(successColor("We're done."))
	console.log(bold("Now you can execute the following commands:"))
	
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
			.replace(/     "setup": "yarn add -D chalk simple-git readline-sync && node setup.js && yarn remove chalk simple-git readline-sync",/, '')
	})
}

function writeReadyFiles(readyFiles) {
	return readyFiles.map(readyFile =>
		fs.writeFile(readyFile.path, readyFile.file)
	)
}

function prepareGitRepo(projectrepo) {
	git.init().add(".").commit("First commit create by CRCM").addRemote("origin", projectrepo)
}

execute()
