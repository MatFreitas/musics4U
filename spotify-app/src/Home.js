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
			dataLan:[],
			user: '',
			Userplaylist: false,
			Lancamentos:false
		};

		this.Userplaylist = this.Userplaylist.bind(this);
		this.playlist = this.playlist.bind(this);
		this.newRelease = this.newRelease.bind(this);
		
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

	topTracksLorde = () => {
		$.ajax({
			method: 'GET',
			dataType: 'Json',
			url: 'https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm/top-tracks?country=BR',
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		}).then((dados) => {
			this.setState({ Userplaylist: false });
			console.log(dados.tracks);
		});
	};

	newRelease = () => {
		axios
			.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
				headers: {
				  Authorization: `Bearer ${this.token}`,
				},
			  })
			.then((response) => {
				this.setState({ dataLan: response.data.items, Lancamentos: true });
				console.log(response.data.albums);
			})
			.catch((erro) => console.log(erro.response.data));
		
		var lancamentos = this.state.dataLan
		var lancamento = lancamentos.map((release) => {
			return(
			<div>
				{release.artists.}
			</div>
		)
		})
	};

	Userplaylist = () => {
		axios
			.get('http://localhost:8888/playlists')
			.then((response) => {
				this.setState({ data: response.data.items, Userplaylist: true });
				console.log(response.data.items);
			})
			.catch((erro) => console.log(erro.response.data));
	};

	Authorization = () => {
		$.ajax({
			method: 'GET',
			dataType: 'Json',
			url:
				'https://accounts.spotify.com/authorize?client_id=ca202a7d6b6646aa9458a56515b54270&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000.com&scope=user-read-private%20user-read-email&state=34fFs29kd09'
		}).then((dados) => {
			console.log(dados);
		});
	};

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
					<hr className="line" />
				</div>
			);
		});

		return (
			<div>
				<h1 className="title">Suas playlists</h1>
				<div> {playlistImg}</div>
			</div>
			
		);
	};
	render() {
		return (
			<div className="body_home">
				<div className="container">
					<div className="Home">
						<div class="img" />
						<div className="botoes">
							<button class="btn">
								<a class="link" href="http://localhost:8888/login">
									Logar com Spotify
								</a>
							</button>
							<button class="btn" onClick={this.topTracksLorde}>
								Buscar top tracks da Lorde
							</button>
							<button class="btn" onClick={this.Userplaylist}>
								Buscar playlist do user
							</button>
							<button class="btn" onClick={this.Authorization}>
								Authorization
							</button>
							<button class="btn">
								<a class="link" href="http://localhost:8888/playlists">
									Ver playlists
								</a>
							</button>

							<button class="btn" onClick={this.newRelease}>
								Buscar novos lançamentos
							</button>
							
						</div>
					</div>

					{this.state.Userplaylist && <div>{this.playlist()}</div>}
					{/* {this.state.Lancamentos && <div>{this.newRelease()}</div>} */}
				</div>
			</div>
		);
	}
}

export default Home;
