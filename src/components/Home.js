import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <Slider 
                title="Curso de react"
                btn='Ir al blog'
                size='slider-big'/>
                <section id="content">
                    <h2 className="subheader">Últimos artículos</h2>
                    <Articles
                        home='true'
                    />
                </section>
                <Sidebar />
            </div>

        )
    }
}

export default Home