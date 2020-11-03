import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios' 

class Home extends Component {
	constructor(props) {
		super(props);
		const parametros = this.getHashParams();
		this.token = parametros.access_token;
		this.state= {data:[]}
		
		this.Userplaylist = this.Userplaylist.bind(this);
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

	Userplaylist =  () => {
		/*$.ajax({
			method: 'GET',
			dataType: 'Json',
			url: 'http://localhost:8888/playlists'
		}).then((dados) => {
			console.log(dados);
		});*/
		axios.get('http://localhost:8888/playlists')
		.then((response) => {
			this.setState({data:response.data.items})
			console.log(response.data.items)
		})
		.catch(erro => console.log(erro.response.data))
	};

	/*.then((response) => {
		//this.state.listaUsuarios =  response;
		this.setState({listaUsuarios: response.data});
		console.log(response)
	})
	.catch(erro => console.log(erro))*/

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
		var playlists= this.state.data;
		var playlist= playlists.map(playlist => {
			return(
			<div> {playlist.name}</div>
			);
		})

		var playlistImg= playlists.map(playlist => {
			return(
			 playlist.images.map(images =>{
				 return(
				<div>{images.url}</div>
				//<img src={images.url}> </img>
				 );
			 
	

		
		}))})

		return (
			<div className="App">
				<div>{playlist} </div>
				<button>
					<a href="http://localhost:8888/login">Logar com Spotify</a>
				</button>
				<button onClick={this.topTracksLorde}>Buscar top tracks da Lorde</button>
				<button onClick={this.Userplaylist}>Buscar playlist do user</button>
				<button onClick={this.Authorization}>Authorization</button>
				<button>
					<a href="http://localhost:8888/playlists">Ver playlists</a>
				</button>
			</div>
		);
	}
}

export default Home;
