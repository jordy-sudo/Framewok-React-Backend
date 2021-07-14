import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Global from './Global';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';



class CrearArticulo extends Component {

    titleRef = React.createRef();
    contentRef = React.createRef();
    url = Global.url;

    state = {

        article: {},
        status: null,
        selectedFile: null
    }
    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages:{
                required:'Este campo es obligatorio'
            }
        }
        );
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }

        })
        this.validator.showMessages();
        this.forceUpdate();
        //console.log(this.state)
    }

    cargarArticulo = (e) => {
        e.preventDefault();
        //rellenar state con el formulario
        this.changeState();

        if (this.validator.allValid()) {
            console.log(this.validator)
            //hacer una peticion http por post para guardar el articulo
            axios.post(this.url + 'save', this.state.article)
                .then(res => {
                    //console.log(this.res)
                    //console.log(this.state.article)
                    if (res.data.nuevo_article) {
                        this.setState({
                            article: res.data.nuevo_article,
                            status: 'waiting'
                        })

                        swal(
                            'Articulo creado',
                            'El articulo se acreado correctamente',
                            'success'
                        )

                        //subir la imagen 
                        if (this.state.selectedFile !== null) {
                            //sacar el id de  el articulo guardado
                            var id = this.state.article._id;
                            //console.log(this.state.article._id)
                            //console.log(this.state.selectedFile)

                            //crear form data y a;adir fichero 
                            const formData = new FormData();//creamoas un forluario para adjuntar un archivo

                            formData.append(
                                'file0',//porque el api asi lo va a recibir
                                this.state.selectedFile,//selecciono el archivo que quiero enviar
                                this.state.selectedFile.name

                            )
                            //peticion ajax
                            axios.post(this.url + 'upload-image/' + id, formData)//encio el id y el archivo a subir
                                .then(res => {//capturo la respuesta
                                    if (res.data.article) {
                                        console.log(res.data.article)
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    } else {
                                        this.setState({
                                            status: 'failed'
                                        })
                                    }
                                })

                        } else {
                            this.setState({
                                status: 'success'
                            })
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                });
        } else {
            this.setState({
                status: 'failed'
            })
            //console.log(this.validator.showMessages());
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        //console.log(this.state)    

    }

    render() {
        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }

        return (
            <div className='center'>
                <section id='content'>
                    <h1 className='subheader'>Crear articulo</h1>
                    <form className="mid-form" onSubmit={this.cargarArticulo}>
                        <div className="form-group">
                            <label htmlFor='title'>Titulo</label>
                            <input type='text' name='title' ref={this.titleRef} onChange={this.changeState}></input>
                            {this.validator.message('title', this.state.article.title, 'required|alpha')}
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor='content'>Titulo</label>
                            <textarea type='text' name='content' ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor='file0'>Imagen</label>
                            <input type='file' name='file0' onChange={this.fileChange}></input>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        )
    }
}
export default CrearArticulo;