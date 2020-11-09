import React, { Component } from 'react';

import $ from 'jquery';
import axios from 'axios';
import './Home.css';
import { AiOutlineTeam, AiFillCustomerService } from 'react-icons/ai';
import logoLindo from './logoLindo.png';

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
			dataTopA: [],
			dataTopM: [],
			dataPesq: '',
			check: '',
			user: '',
			Userplaylist: false,
			Novidades: false,
			Momento: false,
			likedTracks: false,
			Antigas: false,
			favoritos: false,
			topArtistas: false,
			topMusicas: false,
			meusFavoritos: [],
			meusFavoritosGeneros: [],
			search: '',
			isChecked: false,
			isCheckedGenre: false,
			artistaId: [],
			home: true,
			geraPlaylist: false,
			dataGen: false,
			userId: ''
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
		this.seusFavoritos = this.seusFavoritos.bind(this);
		this.retornaMeusFavs = this.retornaMeusFavs.bind(this);
		this.favoritos = this.favoritos.bind(this);
		this.pesquisa = this.pesquisa.bind(this);
		this.fav_artists = this.fav_artists.bind(this);
		this.topArtist = this.topArtist.bind(this);
		this.fav_musics = this.fav_musics.bind(this);
		this.topMusic = this.topMusic.bind(this);
		this.gera = this.gera.bind(this);
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
					Antigas: false,
					topArtistas: false,
					topMusicas: false,
					favoritos: false,
					artistaId: [],
					home: false
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
					Antigas: false,
					topArtistas: false,
					topMusicas: false,
					favoritos: false,
					artistaId: [],
					home: false
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
					user: response.data.items[0].owner.id,
					Userplaylist: true,
					Novidades: false,
					likedTracks: false,
					Momento: false,
					Antigas: false,
					topMusicas: false,
					topArtistas: false,
					favoritos: false,
					artistaId: [],
					home: false
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
					click: false,
					topMusicas: false,
					topArtistas: false,
					favoritos: false,
					artistaId: [],
					home: false
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
					Novidades: false,
					topArtistas: false,
					topMusicas: false,
					favoritos: false,
					artistaId: [],
					home: false
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
			<div>
				{!musics.is_playing ? (
					<div className="bloco3">
						{' '}
						Para acessar essa página é necessário estar escutando algo no Spotify :)
					</div>
				) : (
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
				)}
			</div>
		);
	};

	// ---------------------------- top musicas -------------------------------
	topMusic = () => {
		axios
			.get('https://api.spotify.com/v1/me/top/tracks', {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})
			.then((response) => {
				this.setState({
					dataTopM: response.data.items,
					topMusicas: true,
					topArtistas: false,
					Novidades: false,
					Momento: false,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false,
					Antigas: false,
					click: false,
					favoritos: false,
					artistaId: [],
					home: false
				});
				console.log(response.data.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	fav_musics = () => {
		var musicas = this.state.dataTopM;
		var musica = musicas.map((topMusicas) => {
			return (
				<div className="grid-item">
					<img className="imagesRound" src={topMusicas.album.images[0].url} width={150} height={150} />
					<div className="centralizacao">
						<p className="TrackName">{topMusicas.name}</p>
						<p className="Texto">{topMusicas.artists[0].name}</p>

						{/* <p className="Texto">
							<AiOutlineTeam />
							{topCantores.followers.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
						</p> */}
					</div>
				</div>
			);
		});
		return (
			<div className="bloco">
				<h1 className="title">Suas Músicas Favoritas</h1>
				<div className="grid-container">{musica}</div>
			</div>
		);
	};

	// ----------------------------- top artistas ------------------------------

	topArtist = () => {
		axios
			.get('https://api.spotify.com/v1/me/top/artists', {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})
			.then((response) => {
				this.setState({
					dataTopA: response.data.items,
					topArtistas: true,
					Novidades: false,
					Momento: false,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false,
					Antigas: false,
					click: false,
					topMusicas: false,
					favoritos: false,
					artistaId: [],
					home: false
				});
				console.log(response.data.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	fav_artists = () => {
		var cantores = this.state.dataTopA;
		var cantor = cantores.map((topCantores) => {
			return (
				<div className="grid-item">
					<img className="imagesRound" src={topCantores.images[0].url} width={150} height={150} />
					<div className="centralizacao">
						<p className="TrackName">{topCantores.name}</p>
						<p className="Texto">
							{' '}
							<AiFillCustomerService /> {topCantores.genres[0]}
						</p>

						<p className="Texto">
							<AiOutlineTeam />
							{topCantores.followers.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
						</p>
					</div>
				</div>
			);
		});
		return (
			<div className="bloco">
				<h1 className="title">Seus Artistas Favoritos</h1>
				<div className="grid-container">{cantor}</div>
			</div>
		);
	};

	// ----------------------------- favoritos -------------------------
	favoritos = () => {
		axios
			.post('http://localhost:8888/router/users/', {
				user: this.state.user,
				artista: this.state.meusFavoritos,
				genero: this.state.meusFavoritosGeneros
			})
			.then((response) => {
				this.setState({ favoritos: true });
				this.setState({
					userId: response.data._id,
					favoritos: true,
					Momento: false,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false,
					Antigas: false,
					topMusicas: false,
					topArtistas: false,
					meusFavoritos: [],
					meusFavoritosGeneros: [],
					artistaId: [],
					home: false,
					geraPlaylist: true
				});
				console.log(response.data);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	handleClick = (e) => {
		var item = e.target.name;
		var isChecked = e.target.checked;
		var array = this.state.meusFavoritos;
		var index = array.indexOf(e.target.name);

		if (isChecked) {
			this.setState({ meusFavoritos: [ ...this.state.meusFavoritos, item ], isChecked: true });
			// console.log(this.state.meusFavoritos);
		} else {
			delete array[index];
			this.setState({ isChecked: false });
		}

		// this.setState({ check: 'oioioi', favoritos: true });
		console.log(this.state.meusFavoritos);
		console.log(item);
	};

	handleClickGeneros = (e) => {
		var item = e.target.name;
		var isChecked = e.target.checked;
		var array = this.state.meusFavoritosGeneros;
		var index = array.indexOf(e.target.name);

		if (isChecked) {
			this.setState({ meusFavoritosGeneros: [ ...this.state.meusFavoritosGeneros, item ], isCheckedGenre: true });
		} else {
			delete array[index];
			this.setState({ isCheckedGenre: false });
		}

		console.log(this.state.meusFavoritosGeneros);
		console.log(item);
	};

	retornaMeusFavs = () => {
		console.log(this.state.meusFavoritos);
		return <div className="bloco">{this.state.meusFavoritos}</div>;
	};

	pesquisa = () => {
		axios
			.get('https://api.spotify.com/v1/search', {
				headers: {
					Authorization: `Bearer ${this.token}`
				},
				params: {
					q: this.state.search,
					type: 'artist',
					limit: 10
				}
			})
			.then((response) => {
				this.setState({
					dataPesq: [ ...this.state.dataPesq, response.data.artists.items[0].name ],
					artistaId: [ ...this.state.artistaId, response.data.artists.items[0].id ],
					Antigas: false,
					Momento: false,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false,
					favoritos: true,
					topMusicas: false,
					topArtistas: false,
					home: false
				});
				console.log(this.state.artistaId);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	seusFavoritos = () => {
		// var artistas = [
		// 	'Ed Sheeran',
		// 	'Harry Styles',
		// 	'The Beatles',
		// 	'The Who',
		// 	'The Kooks',
		// 	'The Doors',
		// 	'The Killers',
		// 	'Turma do Pagode',
		// 	'Banda Eva',
		// 	'Os Barões da Pisadinha',
		// 	'Grupo Revelação',
		// 	'The Lumineers',
		// 	'Maria Gadú',
		// 	'Bon Iver',
		// 	'Adele',
		// 	'Rihanna',
		// 	'Drake',
		// 	'Sam Smith',
		// 	'Elton John',
		// 	'Imagine Dragons',
		// 	'Russ',
		// 	'Tyga',
		// 	'2Pac',
		// 	'John Mayer'
		// ];

		var artistas = [];

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

		var click = this.handleClick;
		var clickGeneros = this.handleClickGeneros;
		var retorna = this.favoritos;
		var pesquisa = this.pesquisa;
		var dataPesq = this.state.dataPesq;
		var isChecked = this.state.isChecked;
		var isCheckedGenre = this.state.isCheckedGenre;
		var geraPlaylist = this.state.geraPlaylist;
		var gera = this.gera;

		var teste = artistas.map(function(artista) {
			return (
				<div className="input" style={{}}>
					<input type="checkbox" name={artista} onChange={click} />
					<label className="testeCheck" key={artista}>
						{artista}
					</label>
				</div>
			);
		});

		var teste_generos = generos.map(function(genero) {
			return (
				<div className="inputGenero" style={{ backgroundColor: 'white' }}>
					<input type="checkbox" name={genero} ref="check_me" onChange={clickGeneros} />
					<label className="testeCheck" key={genero}>
						{genero}
					</label>
				</div>
			);
		});

		return (
			<div className="bloco">
				<div>
					<h1 className="title">Seus Favoritos</h1>
					<p className="descricao">
						Selecione seus artistas e gêneros favoritos para que possamos criar uma playlist a partir do
						seus gostos!
					</p>
				</div>
				<div className="form_group field">
					<input
						type="text"
						className="form_field"
						placeholder="Pesquise mais artistas"
						onChange={(e) => {
							this.setState({ search: e.target.value });
						}}
					/>
					<button onClick={pesquisa} className="btnSearch">
						Adicionar
					</button>
				</div>
				<div>
					<h2 className="artistaTitulo">Artistas</h2>
					<div style={{ marginTop: dataPesq === '' ? 0 : 50 }}>
						{dataPesq === '' ? (
							<div className="descArt">
								<p className="descricao">
									{' '}
									Pesquise seus artistas favoritos. Lembre-se que é necessário marcar o checkbox.
								</p>
							</div>
						) : (
							<div className="generos">
								{dataPesq.map(function(artista) {
									return (
										<div className="input">
											<input type="checkbox" name={artista} onChange={click} />
											<label className="testeCheck" key={artista}>
												{artista}
											</label>
										</div>
									);
								})}
							</div>
						)}

						{/* <div className="generos"> {teste}</div> */}
					</div>
					<h2 className="artistaTitulo">Gêneros</h2>
					<div className="generos">{teste_generos}</div>
				</div>
				{geraPlaylist ? (
					<button className="btnPlaylist" onClick={gera}>
						Gerar Playlist Costumizada{' '}
					</button>
				) : (
					<button className="btnSearch" onClick={retorna}>
						Enviar
					</button>
				)}
			</div>
		);
	};

	gera = () => {
		axios
			.get('http://localhost:8888/router/userbyid', {
				user: 'bia'
			})
			.then((response) => {
				this.setState({
					// dataGen: response.data[0].genero_fav,
					Antigas: false,
					Momento: false,
					Userplaylist: false,
					likedTracks: false,
					Novidades: false,
					favoritos: true,
					topMusicas: false,
					topArtistas: false,
					home: false
				});
				console.log(response);
			})
			.catch((erro) => console.log(erro.response.data));
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
							Suas playlists
						</button>

						<button
							class="btn"
							style={{ backgroundColor: this.state.Novidades ? '#454D4B' : 'transparent' }}
							onClick={this.newRelease}
						>
							Novos lançamentos
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
							style={{ backgroundColor: this.state.favoritos ? '#454D4B' : 'transparent' }}
							onClick={() => {
								this.setState({
									favoritos: true,
									Momento: false,
									Userplaylist: false,
									likedTracks: false,
									Novidades: false,
									Antigas: false,
									topArtistas: false,
									topMusicas: false,
									meusFavoritos: [],
									meusFavoritosGeneros: [],
									home: false
								});
							}}
						>
							Seus favoritos
						</button>
						<button
							class="btn"
							style={{ backgroundColor: this.state.topArtistas ? '#454D4B' : 'transparent' }}
							onClick={this.topArtist}
						>
							Seus artistas mais ouvidos
						</button>
						<button
							class="btn"
							style={{ backgroundColor: this.state.topMusicas ? '#454D4B' : 'transparent' }}
							onClick={this.topMusic}
						>
							Suas músicas mais ouvidas
						</button>
					</div>
				</div>

				{this.state.home && (
					<div className="blocoHome">
						<div>
							<img src={logoLindo} />
						</div>
						<div className="txt">
							{' '}
							<h4 className="bemVindo">Bem vindo ao Musics4U!</h4>
							<p className="homeDesc">
								{' '}
								Para ter acesso às suas funcionalidades utilize a navbar ao lado :){' '}
							</p>
						</div>
					</div>
				)}

				{this.state.Userplaylist && <div>{this.playlist()}</div>}
				{this.state.Novidades && <div>{this.lancamentos_teste()}</div>}
				{this.state.likedTracks && <div>{this.myTracks()}</div>}
				{this.state.Momento && <div>{this.current_music()}</div>}
				{this.state.favoritos && <div>{this.seusFavoritos()} </div>}
				{this.state.topArtistas && <div>{this.fav_artists()}</div>}
				{this.state.topMusicas && <div>{this.fav_musics()}</div>}
				{/* </div> */}
			</div>
		);
	}
}

export default Home;
