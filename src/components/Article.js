import axios from 'axios';
import React, { Component } from 'react';
import Global from './Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import {Link, Redirect} from 'react-router-dom';
import swal from 'sweetalert';




class Article extends Component {

    url = Global.url;
    state = {
        article: false,
        status: null
    }
    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.articulo_consultado,
                    status: 'success'
                })
            }).catch(err=>{
                this.setState({
                    article:false,
                    status:'success'
                })
            })

    }

    deleteArticle=(id)=>{
        swal({
            title: "Quieres eliminar el articulo?",
            text: "Si lo eliminas no se podra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url+'article/'+id)
                .then(res=>{
                    this.setState({
                        article:res.data.article,
                        status:'deleted'
                    })
                })
                swal("El articulo se a eliminado correctamente", {
                    icon: "success",
                  });
            } else {
              swal("Accion cancelada no se a borrado nada");
            }
          });
       
       
    }



    render() {
        
        if(this.state.status === 'deleted'){
            return <Redirect to="/blog"/>
        }
        
        var article = this.state.article

        return (
            <div className='center'>
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                            {article.img !== null ?(
                                    <img src={this.url+'get-image/'+article.img} alt={article.title} />
                                ) :(
                                    <img src="https://puedoser.academy/wp-content/plugins/doliconnect/images/default.jpg" alt={article.title} />
                                )

                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <div className="clearfix"></div>
                            <button onClick={()=>{
                                this.deleteArticle(article._id)
                            }} className="btn btn-danger">Eliminar</button>
                            <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Modificar</Link>

                        </article>
                    
                    }
                    {!this.state.article && 
                        <div className='subheader'>
                            <h2>El articulo no existe</h2>
                            <p>Intentalo buscando otro articulo</p>
                        </div>
                    }
                    {this.state.article == null &&
                        <div className='subheader'>
                            <h2>Cargando...!!</h2>
                            <p>Espera unos segundos</p>
                        </div>
                    }


                </section>
            </div>
        )
    }
}
export default Article;