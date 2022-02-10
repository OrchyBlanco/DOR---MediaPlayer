Vue.component("Cancion", {
  props: ["cancion"],
  template: `
    <div class="card mb-12 m-5 cancion">
        <div class="row g-0 p-2">
          <div class="col-md-1">
              <img :src="cancion.url" class="img-fluid rounded-start " alt="...">
          </div>
          <div class="col-md-10">
              <div class="card-body">
              <h5 class="card-title">{{cancion.name}}</h5>
              <p class="card-text"><strong>Autor:</strong> {{cancion.author}}</p>
              <p class="card-text"><strong>Descripcion:</strong> {{cancion.descripcion}}</p>
              </div>            
          </div>
          <div class="col-md-1 d-flex align-items-center">
          
            <button class="col-10 btn btn-primary text-light" @click="playSong(cancion.url_musica)">Reproducir
            
            </button>        
          </div>
        </div>
    </div>
    `,
  methods:{
    playSong (song){
      if(song){
        var audio = new Audio(song);
        audio.play();
      }
    }
  }
});

Vue.component("Musica", {
  props: ["musica"],
  template: `
    <section>
        <Cancion
        v-for="(cancion,index) in musica" :key="index" :cancion="cancion">
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
        url_musica:"./media/audio/Only the Braves.mp3"
      },
      {
        name: "asd",
        author: "qwe",
        descripcion: "qwerty",
        url: "./media/img/canciones/DOD_OST_cover.jpg",
        url_musica:"./media/audio/Drakengard_w_selection.mp3"
      },
      {
        name: "",
        author: "",
        descripcion: "",
        url: "./media/img/canciones/Darksouls.jpg",
        url_musica:"./media/audio/Gwyn Lord of Cinder.mp3"
      },
    ],
    videos: [
      { name: "", descripcion: "", url: "" },
      { name: "", descripcion: "", url: "" },
    ],
  },
  template: `
    <div>
      <aside></aside>
      <Musica :musica="musica"></Musica>
      
    </div>
    `,
});
