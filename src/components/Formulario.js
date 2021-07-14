import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Slider from './Slider';


class Formulario extends Component {

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    //creo un objeto donde se van a almacenar los datos capturados

    state = {
        user: {}
    }
   


    recibirFormulario = (e) => {
        e.preventDefault();
        var genero = 'Hombre'
        if (this.generoHombreRef.current.checked) {
            genero=this.generoHombreRef.current.value
        }else if(this.generoMujerRef.current.checked){
            genero=this.generoMujerRef.current.value
        }else{
            genero = this.generoOtroRef.current.value
        }


        console.log("Formulario enviado")


        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }
        console.log(user)
        this.setState({
            user:user
        })
    }
  

    render() {

        var user= this.state.user;
        return (
            <React.Fragment>
            <div id="formulario" >
                <Slider
                    title='Formulario'
                    size='slider-small' />
                <section id="content" >
                    {this.state.user.nombre &&
                        <div id='user-data'>
                            <p>Nombre : <strong>{user.nombre}</strong></p>
                            <p>apellido : <strong>{user.apellido}</strong></p>
                            <p>Biografia : <strong>{user.bio}</strong></p>
                            <p>genero : <strong>{user.genero}</strong></p>
                        </div>

                    }
                    {/*Creacion del formulario*/}
                    <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" ref={this.nombreRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" ref={this.apellidoRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">Biografia</label>
                            <textarea name="bio" ref={this.bioRef}></textarea>
                        </div>

                        <div className="form-group radibuttons">
                            <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre
                            <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer
                            <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} /> Otro
                        </div>

                        <div className="clearfix"></div>

                        <input type="submit" value="Enviar" className="btn btn-success" />

                    </form>
                </section>
                <Sidebar blog='false' />
            </div>
            </React.Fragment>

        )
    }
}

export default Formulario