import Link from 'next/link';

import fetch from 'isomorphic-unfetch';

import SearchForm from '../components/SearchForm';



const apiKey = '0de8c4ebd2c1481c95af2cd498273588';


const defaultNewsSource = 'rte';


async function getNews(url) {


  try {

    const res = await fetch(url);

    const data = await res.json();

    return (data);
  } catch (error) {

    return (error);
  }
}


export default class News extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
    })
  }


  searchNewsAPI = (event) => {

    this.setState({

      newsSource: `${event.target.innerText}`,

      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
    })
    console.log(this.state.url);
  }


  render() {


    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }
    return (
      <div>
        <SearchForm setNewsSource={this.setNewsSource} />


        <ul className="newsMenu">
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?sources=google-news">World News</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?sources=techcrunch">Technology News</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?sources=buzzfeed">Entertainment News</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?sources=mtv-news">Social Media</a></li>
        </ul>

        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>

          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author"><h3>Author:</h3>{article.author}<h3>Published:</h3> {article.publishedAt}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p>
            </section>
          ))}
        </div>

        <style jsx>{`

              section {
                width: 96%;
                border: 1px solid black;
                background-color: silver;
                padding: 1em;
                margin: 1em;
                text-align: center;
              }

              .author {
                font-style: optima;
                font-size: 1em;
                color: black;
              }
            .img-article {
                border: 0.25em solid gray;
                max-width: 50%;
              }

            .newsMenu {
              display: flex;
              flex-direction: row;
              margin: 0;
              padding: 0;
              margin-top: 20px;
            }
            .newsMenu li {
              display: inline-table;
              padding-left: 20px;
            }

            .newsMenu li a {
              font-size: 1em;
              color: black;
              font-style: italic;
              display: block;
              text-decoration: none;
            }

            .newsMenu li a:hover {
              color: blue;
              text-decoration: underline;
            }
          `}</style>
      </div>
    );
  }


  static async getInitialProps(response) {
     
    const apiKey = "0de8c4ebd2c1481c95af2cd498273588";

    const defaultNewsSource = "rte";

    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

 
    const data = await getNews(defaultUrl);


    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
  
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }


  async componentDidUpdate(prevProps, prevState) {

    
    if (this.state.url !== prevState.url) {

      
      const data = await getNews(this.state.url);

      
      if (Array.isArray(data.articles)) {

        this.state.articles = data.articles;

        this.setState(this.state);
      }

      else {
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  } 



} 


