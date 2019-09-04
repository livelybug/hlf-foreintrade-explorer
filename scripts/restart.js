'use strict';

const fs = require('fs');
var path = require('path');

function getFilenameinDir(dir) {
	if (dir) {
		const files = fs.readdirSync(dir);
		if (files && files.length > 0) {
			return files[0];
		}
		else
			console.error('No file found in dir: ' + dir);
	}
}

const explConfFile = '../examples/net1/connection-profile/first-network.json';
const rawdata = fs.readFileSync(explConfFile);
const explConf = JSON.parse(rawdata);

const orgKeyword1 = '/tmp/crypto/';
const orgKeyword2 = 'msp/keystore';
const regexOrg = new RegExp(orgKeyword2 + '.*');
let adminPriKeyPath = explConf.organizations.Org1TC.adminPrivateKey.path;
console.log('Admin key path in explorer config: ' + adminPriKeyPath);
let adminPriKeyDir = adminPriKeyPath.replace(orgKeyword1, '').replace(regexOrg, orgKeyword2);

const cryptDir = '../hyperledger-fabric/crypto-config';
adminPriKeyDir = path.join(cryptDir, adminPriKeyDir);
console.log('Admin key filename in fabric crypto dir: ' + getFilenameinDir(adminPriKeyDir));
const adminPriKeyFilename = getFilenameinDir(adminPriKeyDir);
adminPriKeyPath = path.join(adminPriKeyPath.replace(regexOrg, orgKeyword2), adminPriKeyFilename);
explConf.organizations.Org1TC.adminPrivateKey.path = adminPriKeyPath;

fs.writeFile(explConfFile, JSON.stringify(explConf, null, 4), (err) => {
	if (err) throw err;
	console.log('Explorer config data written to file');
});
