import React, { Component } from 'react';
import Pelicula from './Pelicula'
import Sidebar from './Sidebar';
import Slider from './Slider';


class Peliculas extends Component {

    state = {
        peliculas: [
            { titulo: 'Fores Gump', img: 'https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/93/24/15/20244789.jpg' },
            { titulo: 'Spiderman', img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spider-man-remastered-ps5-esquire-4-1605525077.jpg?crop=0.524xw:1.00xh;0.298xw,0&resize=640:*' },
            { titulo: 'Una voz silenciosa', img: 'https://img.redbull.com/images/q_auto,f_auto/redbullcom/2017/05/02/1331856063825_2/rese%C3%B1a-una-voz-silenciosa.jpeg' }
        ],
        nombre: 'Jordy-Sudo',
        favorita: {}
    }

    cambiarTitulo = () => {
        var { peliculas } = this.state; //Coge la propiedad de pelculas
        //var random = Math.floor(Math.random()*3)
        peliculas[0].titulo = 'Tonto es el que hace tonterias';
        //mandamos a cambiar
        this.setState({
            peliculas: peliculas
        })
    }
    favorita = (pelicula) => {
        this.setState({
            favorita: pelicula
        })
    }
    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '15 px'
        }
        return (
            <React.Fragment>
                 <Slider 
                title='Peliculas'
                size='slider-small'/>
                <div id="content" className="Peliculas">
                    <h2 className="subheader">Listado de peliculas</h2>
                    <p>lista de las peliculas favoritas de  {this.state.nombre}</p>
                    <button onClick={this.cambiarTitulo}    >Cambiar Titulo de foorest</button>

                    {this.state.favorita.titulo &&
                        <p className="favorita" style={pStyle}>
                            <strong> La pelicula favorita es: </strong>
                            <span>{this.state.favorita.titulo}</span>
                        </p>
                    }


                    {/*Creamos un componente para leer las peliculas*/}

                    <div id="articles" className="Peliculas">
                        {
                            this.state.peliculas.map((pelicula, i) => {
                                return (

                                    <Pelicula key={i} indice={i} pelicula={pelicula}
                                        marcarFavorita={this.favorita} />
                                )
                            })
                        }
                    </div>
                   
                </div>
                <Sidebar blog='false'/>
            </React.Fragment>

        );
    }
}

export default Peliculas;