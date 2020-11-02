/*class SpotifyService {

    constructor (props) {
        this.token;
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
          e = r.exec(q);
        }
        return hashParams;
    }
      
      topTracksLorde = () =>{
        $.ajax({
          method: "GET",
          dataType: "Json",
          url:"https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm/top-tracks?country=BR",
          headers: {
          Authorization: `Bearer ${this.token}`
          }
        })
        .then(dados => {
          console.log(dados.tracks[0].name)
        })
      }
}

export default SpotifyService*/