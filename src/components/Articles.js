import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../components/Global';
import {Link} from 'react-router-dom';

class Articles extends Component {

    url=Global.url;

    state = {
        articles: [],
        status: null
    }

    componentWillMount() {
        var home=this.props.home;
        var search=this.props.search;
        //console.log(search)
        if(home === 'true'){
            this.getLastArticles();
        }else if(search && search !== null && search !==undefined){
            this.getArticlesSearch(search);
            //console.log(this.getArticlesSearch(search))
        }else{
            this.getArticles()
        }
       
    }
    getLastArticles = () => {
        axios.get(this.url+"articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'

                })
                //console.log(this.state)
            })

    }

    getArticles = () => {
        axios.get(this.url+"articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'

                })
                //console.log(this.state)
            })

    }
    getArticlesSearch = (searched) => {
        axios.get(this.url+"search/"+searched)
            .then(res => {
           
                    this.setState({
                        articles: res.data.article,
                        status: 'success'
                        
                    })
                
                
                      
                }).catch(err=>{
                    this.setState({
                        article: [],
                        status: 'success'
                        
                    })
                })
    }


    render() {
        if (this.state.articles.length >= 1) {

            var listadoArticles = this.state.articles.map((article,i) => {
                return (
                     <div className="center">

         
                        <article key={article._id} className="article-item" id="article-template" >
                            <div className="image-wrap">
                                {article.img !== null ?(
                                    <img src={this.url+'get-image/'+article.img} alt={article.title} />
                                ) :(
                                    <img src="https://puedoser.academy/wp-content/plugins/doliconnect/images/default.jpg" alt={article.title} />
                                )

                                }
                                
                            </div>

                            <h2>{article.title}</h2>
                            <span className="date">
                               <Moment fromNow>{article.date}</Moment>
                            </span>
                            <Link to={'/blog/articles/'+article._id}>Leer más</Link>

                            <div className="clearfix"></div>
                        </article>
               
                        </div>
                );
            })

            return (
                <div id='Articles'>
                    {listadoArticles}
                </div>
            )

        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id='Articles'>
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavia no hay contenido en los articulos</p>
                </div>
            )
        } else {
            return (
                <div id='Articles'>
                    <h2 className="subheader">Cargando...!!</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            )
        }


    }
}

export default Articles;