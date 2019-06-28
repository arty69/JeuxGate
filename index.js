const http = require('http');
const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const FormData = require('form-data');
const Discord = require('discord.js');
const client = new Discord.Client();
const ejs = require('ejs');

var list = fs.readFileSync('list.json', 'utf-8');
var vers = fs.readFileSync('vers', 'utf-8');

client.login(process.env.TOKEN)
client.on("ready", () => {
	console.log(`connecté : ${client.user.tag}! ${process.env.PORT}`)

	http.createServer((req, res) => {
			const urlObj = url.parse(req.url, true);

			if (urlObj.query.code) {
				const accessCode = urlObj.query.code;
				const data = new FormData();

				data.append('client_id', '515891064721244162');
				data.append('client_secret', process.env.client_secret);
				data.append('grant_type', 'authorization_code');
				data.append('redirect_uri', 'https://' + process.env.site);
				data.append('scope', 'identify');
				data.append('code', accessCode);

				fetch('https://discordapp.com/api/oauth2/token', {
						method: 'POST',
						body: data,
					})
					.then(discordRes => discordRes.json())
					.then(info => {
						return info;
					})
					.then(info => fetch('https://discordapp.com/api/users/@me', {
						headers: {
							authorization: `${info.token_type} ${info.access_token}`,
						},
					}))
					.then(userRes => userRes.json())
					.then(inf => {
						console.log(inf.id)
						if (!inf.id) {
							res.writeHead(200, {
								'content-type': 'text/html;charset=utf-8',
							});
							res.write(ejs.render(fs.readFileSync(__dirname + '/error.ejs', 'utf8'), {
								filename: 'error.ejs',
								Erreur: 'Impossible de vous identifier, merci de bien vouloir ré-essayer !'
							}));
							res.end();
							return
						}
						if (client.users.filter(u => u.id === inf.id).size === 0) {
							res.writeHead(200, {
								'content-type': 'text/html;charset=utf-8',
							});
							res.write(fs.readFileSync('./unknown.html'));
							res.end();
							return
						} else if (client.users.filter(u => u.id === inf.id).size >= 2) {
							res.writeHead(200, {
								'content-type': 'text/html;charset=utf-8',
							});
							res.write(ejs.render(fs.readFileSync(__dirname + '/error.ejs', 'utf8'), {
								filename: 'error.ejs',
								Erreur: 'Deux (ou plus) utilisateurs avec le même id trouvé !'
							}));
							res.end();
							return
						} else if (client.users.filter(u => u.id === inf.id).size === 1) {
							client.fetchUser(inf.id, true);
							var guildsinlink = "";
							client.guilds.filter(gui => gui.members.filter(u => u.id === inf.id).size !== 0).map(guildinquestion => {
								guildsinlink = guildsinlink + "|" + guildinquestion;
							});
							res.writeHead(200, {
								'content-type': 'text/html;charset=utf-8',
							});
							res.write(ejs.render(fs.readFileSync(__dirname + '/tada.ejs', 'utf8'), {guildsname: guildsinlink}));
							res.end();
							client.fetchUser(inf.id, false);
							return
						}
						res.writeHead(404, {
							'content-type': 'text/html;charset=utf-8',
						});
						res.write("Erreur dev : 100");
						res.end();
					})
			} else {

				if (urlObj.pathname === '/') {
					res.writeHead(200, {
						'content-type': 'text/html;charset=utf-8',
					});
					res.write(ejs.render(fs.readFileSync(__dirname + '/index.ejs', 'utf8'), {guildsname: guildsinlink}));
					res.end();
					return
				}
				res.writeHead(404, {
					'content-type': 'text/html;charset=utf-8',
				});
				res.write("Erreure 404");
				res.end();
			}




		})
		.listen(process.env.PORT || 53134);

});