import React, { Component } from 'react';
import Articles from './Articles';
import Sidebar from './Sidebar';
import Slider from './Slider';


class Search extends Component {

    render() {
        var searched=this.props.match.params.search;
        //console.log(searched)
        return (
            <div className="blog ">
                <Slider 
                title={'Busqueda: '+ searched}
                size='slider-small'/>
                <section id="content">
                    {/*Lsitado de articulos que vendran de la api */}
                    <Articles
                        search={searched}
                    ></Articles>
                </section>
                <Sidebar blog='true'/>
            </div>

        )
    }
}

export default Search