import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

//importar componentes
import SeccionPruebas from './components/SeccionPruebas';
import Error from './components/Error';
import Header from './components/Header';//esto es necesario


//import SeccionPruebas from './components/SeccionPruebas'
import Peliculas from './components/Peliculas' 
import Home from './components/Home'
import Blog from './components/Blog';
import Formulario from './components/Formulario'; 
import Search from './components/Search';
import Article from './components/Article';
import CrearArticulo from './components/CrearArticulo';
import Footer from './components/Footer';
import EditarArticle from './components/EditArticle';


class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <div className="content">
                    <Switch>
                        {/*Configurar las rutas de las paginas*/}
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/peliculas" component={Peliculas} />
                        <Route exact path="/pruebas" component={SeccionPruebas} />
                        <Route exact path="/blog/articles/:id" component={Article} />
                        <Route exact path="/blog/busqueda/:search" component={Search} />
                        <Route exact path="/blog/editar/:id" component={EditarArticle} />
                        <Route exact path="/blog/create" component={CrearArticulo} />
                        <Route exact path="/redirect/:search" render={(props)=>{
                            var search= props.match.params.search // aqui obtengo los valores de la url
                            return (
                                <Redirect to={'/blog/busqueda/'+search} />
                            )
                        }

                        } />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/formulario" component={Formulario} />
                        <Route component={Error} />

                    </Switch>

                   
                    <div className="clearfix"></div>
                </div>
                <Footer></Footer>
            </BrowserRouter>
        )
    }
}

export default Routes;