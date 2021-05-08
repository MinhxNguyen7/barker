import React from "react";

class Article extends React.Component{
    constructor(props){
        super(props)
        this.state={text:"", title:"", image_url:""}
    }
    
    componentDidMount(){
        
    }

    render(){
        console.log("Article with id: " + this.props.id)
        return(
            <div className="Article">
                This page is a work in progress
            </div>
        )
    }
}

export default Article;