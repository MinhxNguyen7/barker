import React from "react";
import settings from "./settings"
import axios from "axios";

import "./Article.css"

import {randomDate, scramble} from "./utils"

class Article extends React.Component{
    constructor(props){
        super(props)
        this.state={text:"", title:"", image_url:""}
    }

    getArticle(){
        console.log("Getting article " + this.props.id)
        axios
            .get(settings.GET_ARTICLE_FROM_ID_URL + this.props.id + "/")
            .then((response)=>{
                const d = response.data
                const text = d.text.replace( // eslint-disable-next-line
                    /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
                    function(){return '<a href="' + arguments[2] + '"target="_blank style="cursor: pointer"">' + (arguments[7] || arguments[2]) + '</a>'}
                  )
                let title
                // If there's no title, scramble the first 6 words to make the title
                if(d.title === null || d.title === ""){ 
                    let newArr = []
                    String(d.text).split(" ").slice(0,6).forEach(word => {
                        newArr.push(scramble(word))
                    });
                    title = newArr.join(" ").replace(".", "")
                }
                else{
                    title = d.title
                }
                this.setState({title:title, text:text})
                this.forceUpdate()
            })
            .catch(err=>{console.log(err)})
    }
    
    componentDidMount(){
        this.getArticle()
    }

    render(){
        console.log("Article with id: " + this.props.id)
        return(
            <html class="wf-montserrat-n4-active wf-sourcesanspro-n2-active wf-active">
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <script src="http://use.edgefonts.net/montserrat:n4:default;source-sans-pro:n2:default.js" type="text/javascript"/>
                </head>

                <body class="mybody" >
                
                    <header>
                        <div class="profileLogo" style={{height: "5vh"}}> 
                            <p class="logoPlaceholder"><img src="logoImage.png" alt="logo"/></p>
                        </div>
                    </header>
                    
                    <section class="mainContent"> 
                        <section class="section2">
                            <article class="section2Content">
                                <h2 class="sectionContentTitle">{this.state.title}</h2>
                                <h3 class="sectionContentSubTitle">{randomDate().toLocaleString()}</h3>
                                <hr class="myhr"/>
                                <p class="sectionContent" dangerouslySetInnerHTML={{ __html: this.state.text }}/>
                            </article>
                            
                        </section>
                    </section>

                </body>
            </html>
        )
    }
}

export default Article;