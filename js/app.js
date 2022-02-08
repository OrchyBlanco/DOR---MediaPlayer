Vue.component("Cancion",{
    props:['cancion'],
    template: `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4">
            <img :src="cancion.url" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">{{cancion.name}}</h5>
            <p class="card-text">{{cancion.author}}</p>
            <p class="card-text">{{cancion.descripcion}}</p>
            </div>
            <div class="card-footer text-muted">
            2 days ago
            </div>
        </div>
        </div>
    </div>
    `
})

Vue.component("Musica",{
    props:['musica'],
    template:`
    <section>
        <Cancion
        v-for="(cancion,index) in musica" :key="index" :cancion="cancion">
        </Cancion>
    </section>
    `
})

const app = new Vue({
    el: "#app",
    data:{
        musica:[
            {name:"qwert",author:"asdf",descripcion:"zxcvb",url:"./media/img/canciones/cancion1.jfif"},
            {name:"asd",author:"qwe",descripcion:"qwerty",url:"./media/img/canciones/cancion1.jfif"}
        ],
        videos:[
            {name:"",descripcion:"",url:""},
            {name:"",descripcion:"",url:""}
        ]
    },
    template:`
    <div>
      
      <Musica :musica="musica"></Musica>
      
    </div>
    `
})