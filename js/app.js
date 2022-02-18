var media;

Vue.component("Reproductor", {
  props: {
    datos: Object
  },

  template://html
    `
    <aside id="aside-reproductor">
      <button class="cerrar" @click="hiddeAside"><i class="bi bi-x"></i></button>
      <div id="reproductor">
        <div class="caratula"><img :src="datos.img"></div>
        <div>
        <button @click="backward15sec"><i class="bi bi-arrow-counterclockwise"></i></button>
        <button id="play_pause" data-estado="play" @click="playPauseMedia"><i class="bi bi-pause-fill"></i></button>
        <button @click="stopMedia"><i class="bi bi-stop-fill"></i></button>
        <button @click="forward15sec"><i class="bi bi-arrow-clockwise"></i></button>
        </div>
      </div>
      <div id="datos">
        <h2>{{datos.name}}</h2>
        <h3>{{datos.author}}</h3>
        <p> {{datos.descripcion}}</p>
      </div>
    </aside>
    `,
  methods: {
    hiddeAside: function () {
      $("#aside-reproductor").hide();
      if (media) {
        media.pause();
        media.currentTime = 0;
      }
    },
    playPauseMedia: function () {
      if ($("#play_pause").data('estado') === 'play') {
        $("#play_pause>i").replaceWith('<i class="bi bi-play-fill"></i>');
        media.pause();
        $("#play_pause").data('estado', 'pause')
      } else {
        if ($("#play_pause").data('estado') === 'pause') {
          $("#play_pause>i").replaceWith('<i class="bi bi-pause-fill"></i>');
          media.play();
          $("#play_pause").data('estado', 'play')
        }
      }
    },
    stopMedia: function () {
      if ($("#play_pause").data('estado') === 'play') {
        $("#play_pause>i").replaceWith('<i class="bi bi-play-fill"></i>');
        media.pause();
        $("#play_pause").data('estado', 'pause')
      }
      media.currentTime = 0;
    },
    forward15sec: function () {
      media.currentTime += 15;
    },
    backward15sec: function () {
      media.currentTime -= 15;
    }
  }

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
      if (media) {
        media.pause();
        media.currentTime = 0;
      }
      media = new Audio(this.cancion.media);
      media.play();
      $("#aside-reproductor").show();
      $("#aside-reproductor").css("display", "flex");
    }
  },
});

Vue.component("Musica", {
  props: ["musica"],
  data() {
    return {
      cancion_seleccionada: null
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
      {
        name: "Dungeon master therapy parte 3",
        author: "brandonTheDM",
        descripcion: "un corto de tiktok",
        img: null,
        media: "./media/video/dungeon master therapy.mp4"
      },
      {
        name: "hay calima",
        author: "desconocido",
        descripcion: "parodia exagerando la calima en canarias",
        img: null,
        media: "./media/video/hay calima.mp4"
      },
      {
        name: "a mas de 800m altura",
        author: "desconocido",
        descripcion: "un corto de algien subiendo una torre",
        img: null,
        media: "./media/video/a mas de 800m altura.mp4"
      },
      {
        name: "seguidor de master lee",
        author: "theVandaLord",
        descripcion: "un corto de tiktok",
        img: null,
        media: "./media/video/seguidor de master lee.mp4"
      },
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
         <!--<span class="d-none">Cancion seleccionada(Root): {{this.itemSeleccionado}}</span>-->
        
    </div>
    `,
});
