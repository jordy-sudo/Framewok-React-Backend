import React, { Component } from 'react';
import Articles from './Articles';
import Sidebar from './Sidebar';
import Slider from './Slider';


class Blog extends Component {

    render() {
        return (
            <div className="blog ">
                <Slider 
                title='Blog'
                size='slider-small'/>
                <section id="content">
                    {/*Lsitado de articulos que vendran de la api */}
                    <Articles ></Articles>
                </section>
                <Sidebar blog='true'/>
            </div>

        )
    }
}

export default Blog