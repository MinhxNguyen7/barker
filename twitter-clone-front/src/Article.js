import React from "react";
import settings from "./settings"
import axios from "axios";

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
                this.setState({title:d.title, text:d.text})
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
            <div className="Article">
                {this.state.text}
            </div>
        )
    }
}

export default Article;