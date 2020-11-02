import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import logoLindo from './logoLindo.png';
import botao from './botao.png';
import { Link } from 'react-router-dom';

class App extends React.Component {
	// constructor(props) {
	//   super(props)
	//   const parametros = this.getHashParams();
	//   this.token = parametros.access_token;
	// }

	// getHashParams() {
	//   var hashParams = {};
	//   var e, r = /([^&;=]+)=?([^&;]*)/g,
	//   q = window.location.hash.substring(1);
	//   e = r.exec(q)
	//   while (e) {
	//     hashParams[e[1]] = decodeURIComponent(e[2]);
	//     e = r.exec(q);
	//   }
	//   return hashParams;
	//  }

	// topTracksLorde = () =>{
	//   $.ajax({
	//     method: "GET",
	//     dataType: "Json",
	//     url:"https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm/top-tracks?country=BR",
	//     headers: {
	//     Authorization: `Bearer ${this.token}`
	//     }
	//   })
	//   .then(dados => {
	//     console.log(dados.tracks)
	//   })
	// }

	// /*Userplaylist = () =>{
	//   $.ajax({
	//     method: "GET",
	//     dataType: "Json",
	//     url:"https://api.spotify.com/v1/users/mat.f.santana/playlists",
	//     headers: {
	//     Authorization: `Bearer ${this.token}`
	//     }
	//   })
	//   .then(dados => {
	//     console.log(dados.playlists[0].name)
	//   })
	// }
	// <button onClick={this.Userplaylist}>Buscar playlist do user</button>*/

	render() {
		return (
			<div className="App">
				<div>
					{/* <Link to={'/home/'}>OIIIII</Link> */}
					{/* <button>
					<a href="/home/">Página principal</a>
				</button> */}

					<img className="logo" src={logoLindo} alt="logo" />
				</div>
				<div>
					<button className="botao">
						<a href="http://localhost:8888/login">
							<img className="botao1" src={botao} alt="botao" />
						</a>
					</button>
				</div>
			</div>
		);
	}
}

export default App;
