Vue.component("Reproductor", {
  props: ["datos"],  
  template: "#reproductor" ,
  
});

Vue.component("Cancion", {
  props: ["cancion"],
  template: "#cancion",
  methods: {
    playSong(song) {
      if (song) {
        var audio = new Audio(song);
        audio.play();
      }
    },
    selectSong(){
      this.$emit('select',{seleccion: this.cancion})
    }
  },
});

Vue.component("Musica", {
  props: ["musica"],
  template://html
   `
    <section>
        <Cancion
        v-for="(cancion,index) in musica" :key="index" :cancion="cancion"
        
        >
        </Cancion>
    </section>
    `,
});

const app = new Vue({
  el: "#app",
  data: {
    musica: [
      {
        name: "qwert",
        author: "asdf",
        descripcion: "zxcvb",
        url: "./media/img/canciones/cancion1.jfif",
        url_musica: "./media/audio/Only the Braves.mp3",
      },
      {
        name: "asd",
        author: "qwe",
        descripcion: "qwerty",
        url: "./media/img/canciones/DOD_OST_cover.jpg",
        url_musica: "./media/audio/Drakengard_w_selection.mp3",
      },
      {
        name: "",
        author: "",
        descripcion: "",
        url: "./media/img/canciones/Darksouls.jpg",
        url_musica: "./media/audio/Gwyn Lord of Cinder.mp3",
      },
    ],
    videos: [
      { name: "", descripcion: "", url: "" },
      { name: "", descripcion: "", url: "" },
    ],
    seleccion:null,
  },
  template://html
   `
    <div id="main">    
      <Reproductor @select="setSeleccion"></Reproductor>
      <article>
        <Musica :musica="musica"></Musica>   
      </article>
    </div>
    `,
});
