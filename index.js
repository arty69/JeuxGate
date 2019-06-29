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
	console.log(`connecté : ${client.user.tag}! ${process.env.PORT} ${process.env.site}`)

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
								Erreur: 'Impossible de vous identifier, merci de bien vouloir ré-essayer ! <br> Erreure courrante lors d\'un rafraichissement de page'
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
							var i = 0;
							var guildsinlink = JSON.parse("{}");
							var guildsinlinklogo = JSON.parse("{}");
							client.guilds.filter(gui => gui.members.filter(u => u.id === inf.id).size !== 0).map(guildinquestion => {
								guildsinlink[i] = {
									a: guildinquestion.name
								};
								if (!guildinquestion.iconURL) {
									guildsinlinklogo[i] = {
										a: "https://is2-ssl.mzstatic.com/image/thumb/Purple122/v4/05/9c/af/059caf3b-115a-1fca-1419-89ec1463d0ab/source/1200x630bb.jpg"
									};
								} else {
									guildsinlinklogo[i] = {
										a: guildinquestion.iconURL
									};
								}
								i++;
							});
							if(inf.id === "244874298714619904" || inf.id === "474113083506425861" || inf.id === "471669236859928586"){
								var jgown = true
							}else{
								var jgown = false
							}
							res.writeHead(200, {
								'content-type': 'text/html;charset=utf-8',
							});
							res.write(ejs.render(fs.readFileSync(__dirname + '/tada.ejs', 'utf8'), {
								guildsname: JSON.stringify(guildsinlink),
								guildslogo: JSON.stringify(guildsinlinklogo),
								jgown: jgown
							}));
							res.end();
							client.fetchUser(inf.id, false);
							return
						}
						res.writeHead(404, {
							'content-type': 'text/html;charset=utf-8',
						});
						res.write("Erreur dev : 100");
						res.end();
					});
			} else {

				if (urlObj.pathname === '/') {
					res.writeHead(200, {
						'content-type': 'text/html;charset=utf-8',
					});
					res.write(ejs.render(fs.readFileSync(__dirname + '/index.ejs', 'utf8'), {
						nbusers: client.users.filter(u => !u.bot).size
					}));
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
