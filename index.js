//Erreure :
// 1-- génération site
// 2-- socket
// 3-- link bot - dash

const http = require('http');
const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const FormData = require('form-data');
const Discord = require('discord.js');
const client = new Discord.Client();
const ejs = require('ejs');
var io = require('socket.io');
var codelist = JSON.parse(fs.readFileSync('code.json', 'utf-8'));


fs.writeFile('code.json', "{}", (err) => {
	if (!err) return
	console.log("impossible")
	process.exit(1)
});

function log(event, serveur) {

    if (!event) return;
    if (!serveur) return;
    if (client.guilds.filter(g => g.name === serveur).size !== 0) return
    console.log(`${event} dans ${serveur}`)
	const log_embed = new Discord.RichEmbed()
		.setColor(`RANDOM`)
		.addField("LOG : ", eventok)
		.setTimestamp()
		.setFooter("JeuxGate")
	const log = client.channels.filter(c => c.guild.name === serveur || c.guild.name === serveur + " backup" || c.guild.id === "509748831374802954" && c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
	log.map(z => z.send(log_embed).catch(O_o => {}))
    
}

var httpserveur = http.createServer((req, res) => {
	const urlObj = url.parse(req.url, true);

	if (urlObj.pathname === '/index.css') {
		res.writeHead(200, {
			'content-type': 'text/css;charset=utf-8',
		});
		res.write(fs.readFileSync('./page/index.css'));
		res.end();
		return
	}
	if (urlObj.pathname === 'error'){
		if (urlObj.query.code) {
			res.writeHead(200, {
				'content-type': 'text/html;charset=utf-8',
			});
			res.write(ejs.render(fs.readFileSync(__dirname + '/error.ejs', 'utf8'), {
				Erreur: urlObj.query.code
			}));
			res.end();
			return
		}else{
			res.writeHead(200, {
				'content-type': 'text/html;charset=utf-8',
			});
			res.write(ejs.render(fs.readFileSync(__dirname + '/error.ejs', 'utf8'), {
				Erreur: "Une erreure inconnue, ou une manipulation d'url, a été détecté."
			}));
			res.end();
			return
		}
	}
	if (urlObj.pathname === '/co') {
		if (urlObj.query.code) {
			const accessCode = urlObj.query.code;
			const data = new FormData();

			data.append('client_id', '515891064721244162');
			data.append('client_secret', process.env.client_secret);
			data.append('grant_type', 'authorization_code');
			data.append('redirect_uri', process.env.site + "/co");
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
							Erreur: 'Impossible de vous identifier, merci de bien vouloir ré-essayer ! Erreure courrante lors d\'un rafraichissement de page'
						}));
						res.end();
						return
					}
					if (client.users.filter(u => u.id === inf.id).size >= 2) {
						res.writeHead(200, {
							'content-type': 'text/html;charset=utf-8',
						});
						res.write(ejs.render(fs.readFileSync(__dirname + '/error.ejs', 'utf8'), {
							filename: 'error.ejs',
							Erreur: 'Deux (ou plus) utilisateurs avec le même id trouvé !'
						}));
						res.end();
						return
					} else if (client.users.filter(u => u.id === inf.id).size === 1 || client.users.filter(u => u.id === inf.id).size === 0) {
						client.fetchUser(inf.id, true);
						var i = 0;
						var guildsinlink = JSON.parse("{}");
						var guildsinlinklogo = JSON.parse("{}");
						var guildsinlinkid = JSON.parse("{}");
						var guildsinlinkmention = JSON.parse("{}");
						var guildsinsultes = JSON.parse("{}");
						var guildsadmin = JSON.parse("{}");
						client.guilds.filter(gui => gui.members.filter(u => u.id === inf.id).size !== 0).map(guildinquestion => {
							guildsinlink[i] = {
								a: guildinquestion.name
							};
							guildsinlinkid[i] = {
								a: guildinquestion.id
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
							if (guildinquestion.roles.filter(ro => ro.name === "🔇Ne pas mentionner🔇").size === 1) {
								if (guildinquestion.members.filter(u => u.id === inf.id).size !== 0) {
									if (guildinquestion.members.filter(u => u.id === inf.id).first().roles.filter(r => r.name === "🔇Ne pas mentionner🔇").size !== 0) {
										guildsinlinkmention[i] = {
											a: "yes"
										}
									} else {
										guildsinlinkmention[i] = {
											a: "no"
										}
									}
								} else {
									guildsinlinkmention[i] = {
										a: "dis"
									}
								}
							} else {
								guildsinlinkmention[i] = {
									a: "dis"
								}
							}
							if(guildinquestion.members.filter(u => u.id === inf.id).first().hasPermission("ADMINISTRATOR")){
								guildsadmin[i] ={
									a: "yup"
								}
							}else{
								guildsadmin[i] ={
									a: "nop"
								}
							}
							if (guildinquestion.roles.filter(ro => ro.name === "jg insulte").size === 1) {
								guildsinsultes[i] = {
									a: "yup"
								}
							} else {
								guildsinsultes[i] = {
									a: "nope"
								}
							}
							i++;
						});
						if (inf.id === "244874298714619904" || inf.id === "474113083506425861" || inf.id === "471669236859928586") {
							var jgown = true
						} else {
							var jgown = false
						}
						res.writeHead(200, {
							'content-type': 'text/html;charset=utf-8',
						});
						var x = true
						var code = "a"
						while (x) {
							var code = Math.random().toString(36).substring(7);
							if (!codelist[code]) {
								x = false
							} else {
								x = true
							}
						}
						codelist[code] = {
							a: inf.id,
							u: inf.id
						}
						console.log(code)
						fs.writeFile('code.json', JSON.stringify(codelist), (err) => {
							if (err) console.log(err);
						});
						res.write(ejs.render(fs.readFileSync(__dirname + '/tada.ejs', 'utf8'), {
							guildsname: JSON.stringify(guildsinlink),
							guildslogo: JSON.stringify(guildsinlinklogo),
							guildsid: JSON.stringify(guildsinlinkid),
							guildsmention: JSON.stringify(guildsinlinkmention),
							guildsinsultes: JSON.stringify(guildsinsultes),
							guildsadmin: JSON.stringify(guildsadmin),
							jgown: jgown,
							code: code,
							id: inf.id,
							site: process.env.site
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
			res.writeHead(200, {
				'content-type': 'text/html;charset=utf-8',
			});
			res.write(ejs.render(fs.readFileSync(__dirname + '/index.ejs', 'utf8'), {
				filename: 'error.ejs',
				nbusers: client.users.size,
				site: process.env.site
			}));
			res.end();
			return
		}
	} else {
		if (urlObj.pathname === '/') {
			res.writeHead(200, {
				'content-type': 'text/html;charset=utf-8',
			});
			res.write(ejs.render(fs.readFileSync(__dirname + '/index.ejs', 'utf8'), {
				filename: 'error.ejs',
				nbusers: client.users.size,
				site: process.env.site
			}));
			res.end();
			return
		}
		if (urlObj.pathname === '/doc') {
			res.writeHead(200, {
				'content-type': 'text/html;charset=utf-8',
			});
			res.write(fs.readFileSync('./page/doc.html'));
			res.end();
			return
		}
		if (urlObj.pathname === '/addme.png') {
			res.writeHead(200, {
				'content-type': 'image/png',
			});
			res.write(fs.readFileSync('./page/addme.png'));
			res.end();
			return
		}
		if (urlObj.pathname === '/notfound.png') {
			res.writeHead(200, {
				'content-type': 'image/png',
			});
			res.write(fs.readFileSync('./page/notfound.png'));
			res.end();
			return
		}
		if (urlObj.pathname === '/logo.png') {
			res.writeHead(200, {
				'content-type': 'image/png',
			});
			res.write(fs.readFileSync('./page/logo.png'));
			res.end();
			return
		}
		res.writeHead(404, {
			'content-type': 'text/html;charset=utf-8',
		});
		res.write(fs.readFileSync('./page/404.html'));
		res.end();
	}
})

client.login(process.env.TOKEN)
client.on("ready", () => {
	console.log(`connecté : ${client.user.tag}! ${process.env.PORT} ${process.env.site}`)

	client.user.setPresence({
		game: {
			name: `connecter le site . . .`,
			type: 'PLAYING'
		},
		status: 'dnd'
	})

	io.listen(httpserveur).sockets.on('connection', function (socket) {
		socket.emit("receive", "receive")
		socket.on('code', function (code) {
			console.log(code)
			if (codelist[code]) {
				if (codelist[code].a !== "connected") {
					socket.emit('code', "ok")
					socket.on("id", function(id){
						if(id == codelist[code].a){
							socket.emit("launchauthorised", "ok")
							socket.on('antimention', function (a) {
								client.fetchUser(codelist[code].u, true);
								console.log(a)
								if (client.guilds.filter(g => g.id.toString() === a.toString()).size !== 0) {
									if (client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u) !== 0) {
										if (client.guilds.filter(g => g.id.toString() === a.toString()).first().roles.filter(ro => ro.name === "🔇Ne pas mentionner🔇").size === 1) {
											if (client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().roles.filter(ro => ro.name === "🔇Ne pas mentionner🔇").size === 1) {
												client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().removeRole(client.guilds.filter(g => g.id.toString() === a.toString()).first().roles.filter(ro => ro.name === "🔇Ne pas mentionner🔇").first()).then(y => {
													socket.emit('antimentionoffk', `${a}`)
		
													var usernot = client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().displayName.replace(/ \|\🔇/gi, "")
													client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().setNickname(usernot).catch(O_o => {
														socket.emit('errorjg', '600 : impossible de vous renommez, vérifiez que vous n etes ni le fondateur du serveur, ni que le role de jeuxgate soit en dessous du votre')
													})
		
													client.fetchUser(codelist[code].u, false);
												}).catch(y => {
													socket.emit("antimentionpask", `${a}`)
													client.fetchUser(codelist[code].u, false);
												})
											} else {
												var roledontmentionmebiatch = client.guilds.filter(g => g.id.toString() === a.toString()).first().roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()
												if (roledontmentionmebiatch.hasPermission("ADMINISTRATOR") || roledontmentionmebiatch.hasPermission("KICK_MEMBERS") || roledontmentionmebiatch.hasPermission("BAN_MEMBERS") || roledontmentionmebiatch.hasPermission("MANAGE_CHANNELS") || roledontmentionmebiatch.hasPermission("MANAGE_MESSAGES") || roledontmentionmebiatch.hasPermission("MANAGE_GUILD") || roledontmentionmebiatch.hasPermission("MANAGE_NICKNAMES") || roledontmentionmebiatch.hasPermission("MANAGE_ROLES")) {
													socket.emit("antimentionpask", `${a}`)
													socket.emit('errorjg', '602 : Le role ne pas mentionner a des permissions pouvant compromettre l\'intégrité du serveur en question, celui-ci ne vous sera pas mit.')
													client.guilds.filter(g => g.id.toString() === a.toString()).first().owner.send(':warning: **Hey Nous avons découvert un problème de sécurité . . .** le role `🔇Ne pas mentionner🔇` sur le serveur ' + client.guilds.filter(g => g.id.toString() === a.toString()).first().name + ' a des permissions pouvant compromettre l\'intégrité du serveur, merci de corriger le role. (Erreure 602)').catch(O => {
														client.guilds.filter(g => g.id.toString() === a.toString()).first().defaultChannel.send(':warning: **Hey Nous avons découvert un problème de sécurité . . .** le role `🔇Ne pas mentionner🔇` sur le serveur ' + client.guilds.filter(g => g.id.toString() === a.toString()).first().name +' a des permissions pouvant compromettre l\'intégrité du serveur, merci de corriger le role. (Erreure 602)').catch(O_o => {})
													})
												} else {
													client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().addRole(client.guilds.filter(g => g.id.toString() === a.toString()).first().roles.filter(ro => ro.name === "🔇Ne pas mentionner🔇").first()).then(y => {
														socket.emit('antimentiononk', `${a}`)
		
														var usernot = client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().displayName + " |🔇"
														client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().setNickname(usernot).catch(O_o => {
															socket.emit('errorjg', '600 : impossible de vous renommez, vérifiez que vous n etes ni le fondateur du serveur, ni que le role de jeuxgate soit en dessous du votre')
														})
		
														client.fetchUser(codelist[code].u, false);
													}).catch(y => {
														socket.emit("antimentionpask", `${a}`)
														client.fetchUser(codelist[code].u, false);
													})
		
												}
		
											}
										} else {
											socket.emit("errorjg", "601 : plusieurs (ou aucun) rôles ne pas mentionner détectés.")
											client.fetchUser(codelist[code].u, false);
										}
									} else {
										socket.emit('errorjg', '301 Non trouvé dans la guild')
										client.fetchUser(codelist[code].u, false);
									}
								} else {
									socket.emit('errorjg', '300 guild non trouvé')
									client.fetchUser(codelist[code].u, false);
								}
							})
							socket.on('switchinsultes', function (a) {
								client.fetchUser(codelist[code].u, true);
								console.log(a)
								if (client.guilds.filter(g => g.id.toString() === a.toString()).size !== 0) {
									if (client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).size !== 0) {
										if(client.guilds.filter(g => g.id.toString() === a.toString()).first().members.filter(u => u.id === codelist[code].u).first().hasPermission('ADMINISTRATOR')){
											if(client.guilds.filter(g => g.id.toString() === a.toString()).first().roles.filter(ro => ro.name === "jg insulte").size !== 0){
												socket.emit("insulteoffk", `${a}`)
												client.guilds.filter(g => g.id.toString() === a.toString()).first().roles.filter(ro => ro.name === "jg insulte").map(ro => ro.delete().catch(O_o => {
													socket.emit("errorjg", "603 Impossible de supprimer un role") 
													socket.emit("insultepask", `${a}`)
													client.fetchUser(codelist[code].u, false);
													return
												}))
												
												log("Désactivation de l'antiinsulte dans" + client.guilds.filter(g => g.id.toString() === a.toString()).first().name, client.guilds.filter(g => g.id.toString() === a.toString()).first().name)
											}else{
												client.guilds.filter(g => g.id.toString() === a.toString()).first().createRole({
													name: 'jg insulte',
												}).catch(O_o => {
													socket.emit("errorjg", "604 Impossible de créer un role") 
													console.log(O_o)
													socket.emit("insultepask", `${a}`)
													client.fetchUser(codelist[code].u, false);
												}).then(u => {
													socket.emit("insulteonk", `${a}`)
													log("Activation de l'antiinsulte dans" + client.guilds.filter(g => g.id.toString() === a.toString()).first().name, client.guilds.filter(g => g.id.toString() === a.toString()).first().name)
												})
											}
										}else{
											socket.emit('errorjg', '601 Permission insuffisante (administrateur)')
											client.fetchUser(codelist[code].u, false);
										}
									} else {
										socket.emit('errorjg', '301 Non trouvé dans la guilde')
										client.fetchUser(codelist[code].u, false);
									}
								} else {
									socket.emit('errorjg', '300 guilde non trouvé')
									client.fetchUser(codelist[code].u, false);
								}
							})
							codelist[code] = {
								a: "connected",
								u: codelist[code].a
							}
							fs.writeFile('code.json', JSON.stringify(codelist), (err) => {
								if (err) console.log(err);
							});
						}else{
							socket.emit('errorjg', '202 : Veuillez vous reconnectez')
							socket.emit("redirect", process.env.site)
							codelist[code] = {
								a: "connected",
								u: codelist[code].a
							}
							fs.writeFile('code.json', JSON.stringify(codelist), (err) => {
								if (err) console.log(err);
							});
						}
					})
					
				} else {
					socket.emit('errorjg', '200 : Veuillez vous reconnectez')
					socket.emit("redirect", process.env.site)
				}
			} else {
				socket.emit('errorjg', '201 : Veuillez vous reconnectez')
				socket.emit("redirect", process.env.site)
			}
		})
	});
});


httpserveur.listen(process.env.PORT || 53134);