import React, { Component } from 'react';
import $ from 'jquery';

class Home extends Component {
	constructor(props) {
		super(props);
		const parametros = this.getHashParams();
		this.token = parametros.access_token;
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
			console.log(dados.tracks);
		});
	};

	Userplaylist = () => {
		$.ajax({
			method: 'GET',
			dataType: 'Json',
			url: 'https://api.spotify.com/v1/users/pbeatriz18/playlists',
			headers: {
				Authorization: `Bearer ${this.token}`,
				scope: 'user-read-private'
			}
		}).then((dados) => {
			console.log(dados);
		});
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

	render() {
		return (
			<div className="App">
				<button>
					<a href="http://localhost:8888/login">Logar com Spotify</a>
				</button>
				<button onClick={this.topTracksLorde}>Buscar top tracks da Lorde</button>
				<button onClick={this.Userplaylist}>Buscar playlist do user</button>
				<button onClick={this.Authorization}>Authorization</button>
			</div>
		);
	}
}

export default Home;
