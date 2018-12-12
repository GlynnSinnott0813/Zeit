import {withRouter} from 'next/router'


import fetch from "isomorphic-unfetch";


const apiKey = '0de8c4ebd2c1481c95af2cd498273588';


const defaultNewsSource = "the-irish-times";



async function getNews(url) {

  try {

    const res = await fetch(url);

    const data = await res.json();

    return data;
  } catch (error) {

    return error;
  }
}


class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

 
  render() {
 
    let id = 0;


    let article = this.props.articles[id];

    return (
      <div>

        <h3>{defaultNewsSource.split("-").join(" ")}</h3>
        <div>

          <section>
          <h3>{article.title}</h3>
          <h3>{article.author}</h3>
          <h3>{article.section}</h3>
          <h3>{article.content}</h3>
          </section>
        </div>

        <style jsx>{`

          section {
            width: 50%;
            border: 1px solid gray;
            background-color: rgb(240, 248, 255);
            padding: 1em;
            margin: 1em;
          }
          .author {
            font-style: italic;
            font-size: 0.8em;
          }
          .img-article {
            max-width: 50%;
          }
        `}</style>
      </div>
    );
  }


  static async getInitialProps(res) {

    const apiKey = "0de8c4ebd2c1481c95af2cd498273588";
    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;


    const data = await getNews(defaultUrl);

   
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
   
    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
} // End class

export default withRouter(Article)