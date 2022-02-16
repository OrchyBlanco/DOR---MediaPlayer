var audio;

Vue.component("Reproductor", {
  props: {
    datos:Object
  },
   
  template://html
  `
  
  <aside id="aside-reproductor">
  <button @click="hiddeAside">X</button>
  <div id="reproductor">
    
    <button @click="playSong">Play</button>
    <button @click="pauseSong">Pause</button>
    <button @click="stopSong">STOP</button>
    <img :src="datos.img">
  </div>
  <div id="datos">
    <h1>TITULO: {{datos.name}}</h1>
    <h2>AUTOR: {{datos.author}}</h2>
    <p>DESCRIPCION: {{datos.descripcion}}</p>    
  </div>
</aside>
  `,
methods: {
    hiddeAside: function(){
      $("#aside-reproductor").hide();
      if(audio){
        audio.pause();
        audio.currentTime=0;
      }      
    },
    playSong:function() {
        audio.play();
        
       },
    pauseSong:function(){
      audio.pause();
    },
    stopSong:function(){
      audio.pause();
      audio.currentTime=0;
    }
}

});

Vue.component("Cancion", {
  props: ["cancion"],
  template: "#cancion",
  data: function(){
      return {
        name: null,
        author: null,
        descripcion: null,
        img: null,
        media: null
      }
  },
  methods: {    
    selectSong:function(){
      this.$emit('selectSong',{
        name: this.cancion.name,
        author: this.cancion.author,
        descripcion: this.cancion.descripcion,
        img: this.cancion.img,
        media: this.cancion.media
      })
      if(audio){
        audio.pause();
        audio.currentTime=0;
      }
      audio=new Audio(this.cancion.media);
      audio.play();
      $("#aside-reproductor").show();
      
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
  updated: function(){
    this.$emit("selectMusica",this.cancion_seleccionada);
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
});
