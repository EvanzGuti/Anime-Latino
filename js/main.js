//buscar
console.log('comenzo buscador');
const formulario = document.querySelector('#formulario');
const llenarbusqueda = document.querySelector('#contenido1');
const titulo = document.querySelector('#titulo');
document.getElementById('boton').addEventListener('click', filtrar);
formulario.addEventListener('keyup', filtrar);
function filtrar(){
    console.log('dentro buscador');
    let url = 'https://evanzguti.github.io/Base-Datos/BaseDatos.json';
    llenarbusqueda.innerHTML = '';
    titulo.innerHTML = '';
    const texto = formulario.value.toLowerCase();
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(cont => {
        cont.sort((a,b) => {
            if(a.titulo < b.titulo){
                return -1;
            }
            if(a.titulo > b.titulo){
                return 1;
            }
            return 0;
        })
        todo = cont.map(anime => {
            let nombre = anime.titulo.toLowerCase();
            
            if(nombre.indexOf(texto) !== -1){
                llenarbusqueda.innerHTML += "<a onclick='Nid("+anime.id+"); listacapitulos();'><h3 id='codigo'>"+anime.id+"</h3><div class='item' id='selec'><img src ='"+anime.imagen+"' class='item-img'><div class='item-text'><h3>'"+anime.titulo+"'</h3><p>'"+anime.estado+"'</p><p>'"+anime.idioma+"'</p><p>'"+anime.caps.length/2+" capitulos'</p></div></div></a>";
            }
        })
        
        if(llenarbusqueda.innerHTML === ''){
            titulo.innerHTML += "<h3>Anime no encontrado...</h3>";
        }
    })    
}


//llenar inicio
const ultimos = document.querySelector('#contenido');
var ultidatos;
function llenarultimos(){
    console.log('llenando inicio');
    let url = 'https://evanzguti.github.io/Base-Datos/BaseDatos.json';
    ultimos.innerHTML = '';
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(cont => {
        ultidatos = cont.map(anime => {
            ultimos.innerHTML += "<a onclick='Nid("+anime.id+"); listacapitulos();'><h3 id='codigo'>"+anime.id+"</h3><div class='item' id='selec'><img src ='"+anime.imagen+"' class='item-img'><div class='item-text'><h3>'"+anime.titulo+"'</h3><p>'"+anime.estado+"'</p><p>'"+anime.idioma+"'</p><p>'"+anime.caps.length/2+" capitulos'</p></div></div></a>";
        })
    })
}

//llenar latinos
const latinos = document.querySelector('#contenido2');
var latidatos;
function llenarlatino(){
    console.log('llenando latino');
    let url = 'https://evanzguti.github.io/Base-Datos/BaseDatos.json';
    latinos.innerHTML = '';
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(cont => {
        cont.sort((a,b) => {
            if(a.titulo < b.titulo){
                return -1;
            }
            if(a.titulo > b.titulo){
                return 1;
            }
            return 0;
        })
        latidatos = cont.map(anime => {            
            if( anime.idioma == "Latino"){
                latinos.innerHTML += "<a onclick='Nid("+anime.id+"); listacapitulos();'><h3 id='codigo'>"+anime.id+"</h3><div class='item' id='selec'><img src ='"+anime.imagen+"' class='item-img'><div class='item-text'><h3>'"+anime.titulo+"'</h3><p>'"+anime.estado+"'</p><p>'"+anime.idioma+"'</p><p>'"+anime.caps.length/2+" capitulos'</p></div></div></a>";
            }
        })
    })
}

//llenar subtitulado
const subtitulado = document.querySelector('#contenido3');
var subdatos;
function llenarsubtitulado(){
    console.log('llenando subtitulado');
    let url = 'https://evanzguti.github.io/Base-Datos/BaseDatos.json';
    subtitulado.innerHTML = '';
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(cont => {
        cont.sort((a,b) => {
            if(a.titulo < b.titulo){
                return -1;
            }
            if(a.titulo > b.titulo){
                return 1;
            }
            return 0;
        })
        subdatos = cont.map(anime => {
            if( anime.idioma == "Subtitulado"){
                subtitulado.innerHTML += "<a onclick='Nid("+anime.id+"); listacapitulos();'><h3 id='codigo'>"+anime.id+"</h3><div class='item' id='selec'><img src ='"+anime.imagen+"' class='item-img'><div class='item-text'><h3>'"+anime.titulo+"'</h3><p>'"+anime.estado+"'</p><p>'"+anime.idioma+"'</p><p>'"+anime.caps.length/2+" capitulos'</p></div></div></a>";
            }
        })
    });
}

//llenar lista de capitulos
const llenarfot = document.querySelector('#foto');
const llenarinf = document.querySelector('#desin');
const llenarcap = document.querySelector('#liscap');
var lisdatos;
var textgenero;
function listacap(Num){
    console.log('llenando lista de capitulos');
    let url1 = 'https://evanzguti.github.io/Base-Datos/BaseDatos.json';
    llenarfot.innerHTML = '';
    llenarinf.innerHTML = '';
    llenarcap.innerHTML = '';
    fetch(url1)
        .then(respuesta => respuesta.json())
        .then(cont => {
            lisdatos = cont.map(anime => {
                if(anime.id == Num){
                    console.log('Anime encontrado mostrando descripcion');
                    textgenero = anime.genero[0];
                    for(var j = 1; j < anime.genero.length; j++){
                        textgenero += ", " + anime.genero[j];
                    }
                    llenarfot.innerHTML += "<img class='izqui' src='"+anime.imagen+"'>";
                    llenarinf.innerHTML += "<h4 id='titdes'>"+anime.titulo+"</h4><aside>"+textgenero+"</aside><aside>Idioma: "+anime.idioma+"</aside>";
                    for(var i = 0; i < anime.caps.length; i+=2){
                        console.log('Lista de animes');
                        llenarcap.innerHTML += "<a onclick='idcap("+anime.caps[i]+","+anime.id+"); reproductor();'><div id='liscap'><p><span>"+"Capitulo "+anime.caps[i]+"</span></p></div></a>";
                    }
                }
            })
        })
}

let idnumero;
function Nid(Num){
    console.log(Num);
    idnumero = Num;
    listacap(Num);
}

let numcap;
let codigos;
let nombre;
function idcap(ncap,nani){
    numcap = ncap;
    let url = 'https://evanzguti.github.io/Base-Datos/BaseDatos.json';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cont => {
            lisdatos = cont.map(anime => {
                if(anime.id == nani){
                    nombre = anime.titulo;
                    codigos = anime.caps.slice();
                    veranime(ncap);
                }
            })
        })
   // console.log(codigos);
}

const llenartitu = document.querySelector('#reprotitu');
const llenarrepro = document.querySelector('#reprodu');
const llenarcapitu = document.querySelector('#reprocapi');
const llenarregre = document.querySelector('#regre');
function veranime(cap){
    console.log(codigos);
    console.log(numcap);
    console.log(nombre);
    llenartitu.innerHTML = '';
    llenarrepro.innerHTML = '';
    llenarcapitu.innerHTML = '';
    llenarregre.innerHTML = '';
    llenartitu.innerHTML += "<h3 style='text-align: center'>"+nombre+"</h3>";
    llenarrepro.innerHTML += "<IFRAME id='video' SRC='https://sbembed4.com/e/"+sacarcodi(numcap)+".html?autoplay=1' FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allow=gyroscope allowfullscreen></IFRAME>";
    llenarcapitu.innerHTML += "<h4 style='text-align: center'>Capitulo "+numcap+"</h4>";
    llenarregre.innerHTML += "<a onclick='listacap("+idnumero+"); listacapitulos();'><div id='liscap'><p><span>← Capitulos</span></p></div></a>";
}

function sacarcodi(numcap){
    for(var i = 0; i < codigos.length; i += 2){
        if(codigos[i] == numcap){
            console.log(codigos[i+1]);
            return codigos[i+1];
        }
    }
}

//funcion para mostrar
function Mostrarbusqueda(){
    document.getElementById('contbus').style.display = 'block';
    document.getElementById('contini').style.display = 'none';
    document.getElementById('contlat').style.display = 'none';
    document.getElementById('contsub').style.display = 'none';   
    document.getElementById('contlis').style.display = 'none';        
    document.getElementById('contrep').style.display = 'none';
    llenarrepro.innerHTML = '';
    llenarrepro.innerHTML += "<IFRAME SRC='https://sbembed4.com/e/elpekmq1lfav.html?autoplay=1' FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allowfullscreen></IFRAME>";
}

function Mostrarinicio(){
    document.getElementById('contbus').style.display = 'none';
    document.getElementById('contlat').style.display = 'none';
    document.getElementById('contsub').style.display = 'none';    
    document.getElementById('contini').style.display = 'block';    
    document.getElementById('contlis').style.display = 'none';        
    document.getElementById('contrep').style.display = 'none';    
    llenarrepro.innerHTML = '';
    llenarrepro.innerHTML += "<IFRAME SRC='https://sbembed4.com/e/elpekmq1lfav.html?autoplay=1' FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allowfullscreen></IFRAME>";
}

function Mostrarlatino(){
    document.getElementById('contbus').style.display = 'none';
    document.getElementById('contini').style.display = 'none';    
    document.getElementById('contsub').style.display = 'none';
    document.getElementById('contlat').style.display = 'block';    
    document.getElementById('contlis').style.display = 'none';        
    document.getElementById('contrep').style.display = 'none';
    llenarrepro.innerHTML = '';
    llenarrepro.innerHTML += "<IFRAME SRC='https://sbembed4.com/e/elpekmq1lfav.html?autoplay=1' FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allowfullscreen></IFRAME>";
}

function Mostrarsubtitulado(){
    document.getElementById('contbus').style.display = 'none';
    document.getElementById('contini').style.display = 'none';    
    document.getElementById('contsub').style.display = 'block';
    document.getElementById('contlat').style.display = 'none';        
    document.getElementById('contlis').style.display = 'none';        
    document.getElementById('contrep').style.display = 'none';
    llenarrepro.innerHTML = '';
    llenarrepro.innerHTML += "<IFRAME SRC='https://sbembed4.com/e/elpekmq1lfav.html?autoplay=1' FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allowfullscreen></IFRAME>";
}

function listacapitulos(){
    document.getElementById('contbus').style.display = 'none';
    document.getElementById('contini').style.display = 'none';    
    document.getElementById('contsub').style.display = 'none';
    document.getElementById('contlat').style.display = 'none';    
    document.getElementById('contlis').style.display = 'block';        
    document.getElementById('contrep').style.display = 'none';
    llenarrepro.innerHTML = '';
    llenarrepro.innerHTML += "<IFRAME SRC='https://sbembed4.com/e/elpekmq1lfav.html?autoplay=1' FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allowfullscreen></IFRAME>";
}

function reproductor(){
    document.getElementById('contbus').style.display = 'none';
    document.getElementById('contini').style.display = 'none';    
    document.getElementById('contsub').style.display = 'none';
    document.getElementById('contlat').style.display = 'none';    
    document.getElementById('contlis').style.display = 'none';        
    document.getElementById('contrep').style.display = 'block';
}

function limpiarform(){
    document.getElementById("formulario").value = "";
    filtrar();
}

llenarultimos();
llenarlatino();
llenarsubtitulado();
filtrar();
