var audio;

Vue.component("Reproductor", {
  props: {
    itemSelec: Object
  },

  data: {
    itemSeleccionado: {
      name: null,
      author: null,
      descripcion: null,
      img: null,
      media: null,
    }
  },

  template://html
    `
    <aside id="aside-reproductor">
      <div>
        <button class="" @click="ampliar"><img :src="./media/svg/ampliar.svg"></img></button>
        <button class="" @click="reducir"><img :src="./media/svg/ampliar.svg"></img></button>
        <button class="" @click="ocultar"><img :src="./media/svg/close.svg"></img></button>
      </div>
      <div>
        <img class="caratula" :src="itemSelec.url"></img>
        <!-- <video width="300" height="200">
             <source src="" type="video/">
            </video> -->
        <!-- <audio></audio> -->
        <div>
          <input type="range" min="0" max=audio.duration value=audio.currentTime />
          <button class="" @click="playpausar"><img :src="./media/svg/play.svg"></img></button>
          <button class="" @click="songstop"><img :src="./media/svg/stop.svg"></img></button>
        </div>
        <h4>TITULO: {{itemSelec.name}} </h4>
        <h5>AUTOR: {{itemSelec.autor}} </h5>
        <p>DESCRIPCION: {{itemSelec.descripcion}} </p>
        <div>
          <button class="" @click="ensordecer"><img :src="./media/svg/Sound_high.svg"></img></button>
          <input type="range" min="0" max=100 value="0" />
        </div>
      </div>
    </aside>
  `,

  methods: {
    playpausar: function () {
      if (audio.paused) {
        audio.play();
      }
      else {
        audio.pause();
      }
    },
    songstop: function () {
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;
    },
    ensordecer: function (){
      audio.muted()
    },
    ocultar: function () {
      $("#aside-reproductor").classList.add("oculto");
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    },
    ampliar: function () {
      $("#aside-reproductor").classList.add("completo");
    },
    reducir: function () {
      $("#aside-reproductor").classList.remove("completo");
    }
  },
});

Vue.component("Cancion", {
  props: ["cancion"],

  template: "#cancion",

  data: function () {
    return {
      name: null,
      author: null,
      descripcion: null,
      img: null,
      media: null
    }
  },

  methods: {
    selectSong: function () {
      this.$emit('selectSong', {
        name: this.cancion.name,
        author: this.cancion.author,
        descripcion: this.cancion.descripcion,
        img: this.cancion.img,
        media: this.cancion.media
      })
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      audio = new Audio(this.cancion.media);
      audio.play();
      $("#aside-reproductor").classList.remove("oculto");

      ;
    }
  },
});

Vue.component("Musica", {
  props: ["musica"],
  data(){
    return{
        cancion_seleccionada:null
    }        
},

  template://html
   `
    <article>
        <Cancion
        v-for="(cancion,index) in musica" 
        :key="index" 
        :cancion="cancion" 
        @selectSong="cancion_seleccionada=$event"
        >
        </Cancion>
        <span class="d-none">Cancion seleccionada(COMPONENTE MUSICA): {{cancion_seleccionada}}</span>
    </article>
    `,

  updated: function () {
    this.$emit("selectMusica", this.cancion_seleccionada);
  }
});

const app = new Vue({
  el: "#app",

  data: {
    musica: [
      {
        name: "Only the Braves",
        author: "Desconocido",
        descripcion: "Cancion sin Copyright",
        img: "./media/img/canciones/cancion1.jfif",
        media: "./media/audio/Only the Braves.mp3",
      },
      {
        name: "Weapon Selection",
        author: "Nobuyoshi Sano, Takayuki Aihara",
        descripcion: "Drag-on Dragoon Original Soundtrack Vol. 1",
        img: "./media/img/canciones/DOD_OST_cover.jpg",
        media: "./media/audio/Drakengard_w_selection.mp3",
      },
      {
        name: "Gwyn, Lord of Cinder",
        author: "Motoi Sakuraba",
        descripcion: "Dark Souls Original Soundtrack",
        img: "./media/img/canciones/Darksouls.jpg",
        media: "./media/audio/Gwyn Lord of Cinder.mp3",
      },
    ],
    videos: [
      { name: null, author: null, descripcion: null, img: null, media: null },
      { name: null, author: null, descripcion: null, img: null, media: null },
      { name: null, author: null, descripcion: null, img: null, media: null },
    ],
    itemSeleccionado: {
      name: null,
      author: null,
      descripcion: null,
      img: null,
      media: null,
    },
  },

  template://html
    `
    <div id="main">
    
        <Reproductor
        :datos="itemSeleccionado"
        ></Reproductor>
      
        <Musica 
        :musica="musica"
        @selectMusica="itemSeleccionado=$event"
        ></Musica>   
        <span class="d-none">Cancion seleccionada(Root): {{this.itemSeleccionado}}</span>
        
    </div>
    `,

  watch: {
    datos: function () {
      this.$emit('changed', this.itemSeleccionado);
    }
  }
});
