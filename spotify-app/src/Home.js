import React, { Component } from 'react';

import $ from 'jquery';
import axios from 'axios';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		const parametros = this.getHashParams();
		this.token = parametros.access_token;
		this.state = {
			data: [],
			dataLan: [],
			dataTracks: [],
			dataCur: [],
			dataLast: [],
			check: '',
			user: '',
			Userplaylist: false,
			Novidades: false,
			Momento: false,
			likedTracks: false,
			Antigas: false
		};

		this.Userplaylist = this.Userplaylist.bind(this);
		this.playlist = this.playlist.bind(this);
		this.newRelease = this.newRelease.bind(this);
		this.lancamentos_teste = this.lancamentos_teste.bind(this);
		this.savedTracks = this.savedTracks.bind(this);
		this.myTracks = this.myTracks.bind(this);
		this.current = this.current.bind(this);
		this.current_music = this.current_music.bind(this);
		this.latest = this.latest.bind(this);
		this.handleClick = this.handleClick.bind(this);

		var artistas = [
			'Ed Sheeran',
			'Harry Styles',
			'The Beatles',
			'The Who',
			'The Kooks',
			'The Doors',
			'The Killers',
			'The Lumineers',
			'Maria Gadú',
			'Bon Iver',
			'Adele',
			'Rihanna',
			'Drake',
			'Sam Smith',
			'Elton John',
			'Imagine Dragons',
			'Russ',
			'Tyga',
			'2Pac',
			'John Mayer'
		];

		var generos = [
			'reggae',
			'country',
			'rock',
			'pop',
			'jazz',
			'rap',
			'sertanejo',
			'pagode',
			'blues',
			'soul',
			'funk',
			'indie',
			'MPB',
			'eletrônica',
			'disco',
			'punk',
			'acústico'
		];
	}

	getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	}

	// --------------------- musicas salvas -----------------------------

	savedTracks = () => {
		axios
			.get('https://api.spotify.com/v1/me/tracks?limit=30', {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})
			.then((response) => {
				this.setState({
					dataTracks: response.data.items,
					Novidades: false,
					likedTracks: true,
					Userplaylist: false,
					Momento: false,
					Antigas: false
				});
				console.log(response.data.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	myTracks = () => {
		var tracks = this.state.dataTracks;
		var track_saved = tracks.map((songs) => {
			var tempo = songs.track.duration_ms / 1000;
			var minutos = 0;
			while (tempo >= 60) {
				tempo = tempo - 60;
				minutos += 1;
			}

			return (
				<div>
					<div className="antigas">
						<p className="antigastxt">{songs.track.name}</p>
						<p className="antigastxt">{songs.track.album.artists[0].name}</p>

						<p>
							{minutos}:{tempo.toFixed(0)}
						</p>
					</div>
					<hr className="line" />
				</div>
			);
		});
		return (
			<div className="bloco">
				<h1 className="title">Minhas Músicas</h1>
				<div className="separando">
					<div className="Texto"> Músicas</div>
					<div className="Texto"> Artista</div>
					<div className="Texto"> Tempo</div>
				</div>
				<div className="tracks-container">
					<div>{track_saved}</div>
				</div>
			</div>
		);
	};

	// ------------------------- lançamentos -----------------------------------

	newRelease = () => {
		axios
			.get('https://api.spotify.com/v1/browse/new-releases?limit=16', {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})
			.then((response) => {
				this.setState({
					dataLan: response.data.albums.items,
					Novidades: true,
					Userplaylist: false,
					likedTracks: false,
					Momento: false,
					Antigas: false
				});
				console.log(response.data.albums.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	lancamentos_teste = () => {
		var lancamentos = this.state.dataLan;
		var lancamento = lancamentos.map((release) => {
			return (
				<div className="grid-item">
					<img className="imagesRound" src={release.images[0].url} width={150} height={150} />
					<div className="centralizacao">
						<p className="TrackName">{release.name}</p>
						<p className="Texto">{release.release_date} </p>
						<p className="Texto"> {release.artists[0].name} </p>
					</div>
				</div>
			);
		});
		return (
			<div className="bloco">
				<h1 className="title">Novos lançamentos</h1>
				<div className="grid-container">{lancamento}</div>
			</div>
		);
	};

	// --------------------------- playlists do usuário ------------------------------

	Userplaylist = () => {
		axios
			.get('http://localhost:8888/playlists')
			.then((response) => {
				this.setState({
					data: response.data.items,
					Userplaylist: true,
					Novidades: false,
					likedTracks: false,
					Momento: false,
					Antigas: false
				});
				console.log(response.data.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	// Authorization = () => {
	// 	$.ajax({
	// 		method: 'GET',
	// 		dataType: 'Json',
	// 		url:
	// 			'https://accounts.spotify.com/authorize?client_id=ca202a7d6b6646aa9458a56515b54270&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000.com&scope=user-read-private%20user-read-email&state=34fFs29kd09'
	// 	}).then((dados) => {
	// 		console.log(dados);
	// 	});
	// };

	playlist = () => {
		var playlists = this.state.data;

		var playlistImg = playlists.map((playlist) => {
			// this.setState({ user: playlist.owner });
			return (
				<div>
					<div className="organizacao">
						<img className="images" src={playlist.images[0].url} width={150} height={150} />
						<div className="desc">
							<div className="info"> {playlist.name}</div>
							{playlist.collaborative ? (
								<h4 className="info2"> Playlist Colaborativa</h4>
							) : (
								<h4 className="info2"> Playlist Não Colaborativa </h4>
							)}
							{playlist.public ? (
								<h4 className="info2"> Playlist Pública</h4>
							) : (
								<h4 className="info2"> Playlist Privada </h4>
							)}
						</div>
					</div>
					<hr className="lineORetorno" />
				</div>
			);
		});

		return (
			<div className="bloco">
				<h1 className="title">Suas playlists</h1>
				<div> {playlistImg}</div>
			</div>
		);
	};

	// ----------------------------- escutados -------------------------

	current = () => {
		axios
			.get('https://api.spotify.com/v1/me/player/currently-playing', {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})
			.then((response) => {
				this.setState({
					dataCur: response.data,
					Momento: true,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false,
					Antigas: true,
					click: false
				});
				console.log(response.data);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	latest = () => {
		axios
			.get('https://api.spotify.com/v1/me/player/recently-played', {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})
			.then((response) => {
				this.setState({
					dataLast: response.data.items,
					Antigas: true,
					Momento: true,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false
				});
				console.log(response.data.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	current_music = () => {
		var musics = this.state.dataCur;
		var antigas = this.state.dataLast;
		var antiga = antigas.map((anterior) => {
			return (
				<div>
					<div className="antigas">
						<p className="antigastxt">{anterior.track.name}</p>
						<p className="antigastxt">{anterior.track.album.name}</p>
					</div>
					<hr className="line" />
				</div>
			);
		});

		return (
			<div
				className="containerGeral"
				style={{
					backgroundColor: `url(${musics.item.album.images[0].url})`,
					backgroundImage: `url(${musics.item.album.images[0].url})`,
					backgroundSize: 0.25
				}}
			>
				<div className="escutados">
					<h1 className="title"> Escutando agora </h1>
				</div>

				<div className="blocoEscutando">
					<div className="centro">
						<img src={musics.item.album.images[0].url} width={350} height={350} />
					</div>

					<div className="containerEscutando">
						<p className="musicatxt"> {musics.item.name} </p> <br />
						<p className="albumtxt">{musics.item.album.name}</p>
					</div>
				</div>

				<div className="blocoEscutando">
					<div className="escutados">
						<h1 className="title"> Últimas Escutadas </h1>
						<div className="separando_antigas">
							<h4>Música</h4>
							<h4>Álbum</h4>
						</div>

						<div>{antiga}</div>
					</div>
				</div>
			</div>
		);
	};

	// ----------------------------- favoritos -------------------------
	favoritos = () => {
		axios
			.post('http://localhost:8888/router/users/', {
				// body: {
				user: 'fulano',
				artista: [ 'naudo', 'the who' ],
				genero: [ 'reggae, country' ]
				// }
			})
			.then((response) => {
				// this.setState({
				// 	dataCur: response.data,
				// 	Momento: true,
				// 	Userplaylist: false,
				// 	likedTracks: false,
				// 	Novidades: false,
				// 	Antigas: true
				// });
				console.log(response.data);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	handleClick = (e) => {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState({ check: 'oioioi' });
		console.log(isChecked);
		// <p>{name}</p>;
	};

	render() {
		return (
			<div className="body_home">
				{/* <div className="container"> */}
				<div className="Home">
					<div class="img" />
					<div className="botoes">
						<button class="btn">
							<a class="link" href="http://localhost:8888/login">
								Logar com Spotify
							</a>
						</button>
						<button
							class="btn"
							style={{ backgroundColor: this.state.Userplaylist ? '#454D4B' : 'transparent' }}
							onClick={this.Userplaylist}
						>
							Buscar playlist do user
						</button>

						<button
							class="btn"
							style={{ backgroundColor: this.state.Novidades ? '#454D4B' : 'transparent' }}
							onClick={this.newRelease}
						>
							Buscar novos lançamentos
						</button>

						<button
							class="btn"
							style={{ backgroundColor: this.state.likedTracks ? '#454D4B' : 'transparent' }}
							onClick={this.savedTracks}
						>
							Minhas Músicas
						</button>

						<button
							class="btn"
							style={{ backgroundColor: this.state.Momento ? '#454D4B' : 'transparent' }}
							onClick={() => {
								this.current();
								this.latest();
							}}
						>
							Escutando
						</button>
						<button
							class="btn"
							style={{ backgroundColor: this.state.Momento ? '#454D4B' : 'transparent' }}
							onClick={() => {
								this.favoritos();
							}}
						>
							Seus favoritos
						</button>

						<div>
							<input type="checkbox" name="oi" ref="check_me" onChange={this.handleClick} />
							<input type="checkbox" name="alo" ref="check_me" onChange={this.handleClick} />
						</div>
					</div>
				</div>

				{this.state.Userplaylist && <div>{this.playlist()}</div>}
				{this.state.Novidades && <div>{this.lancamentos_teste()}</div>}
				{this.state.likedTracks && <div>{this.myTracks()}</div>}
				{this.state.Momento && <div>{this.current_music()}</div>}
				{/* </div> */}
			</div>
		);
	}
}

export default Home;
