import React, { useEffect, useState } from 'react'
import NewsItem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";






const News = (props)=>{
   const [articles, setarticles] = useState([])
   const [loading, setloading] = useState(true)
   const [page, setpage] = useState(1)
   const [totalResults, settotalResults] = useState(0)
   

  


    
const capitalize = (text) => {

        const words = text.split(" ");
        const capitalizedWords = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
                return word;
            }
        });
        return capitalizedWords.join(" ")
    }


    const UpdateNews = async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

        setloading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedata = await data.json();
        props.setProgress(70);
        setarticles(parsedata.articles)
        settotalResults(parsedata.totalResults)
        setloading(false)
        
        props.setProgress(100);
    }

    useEffect(() => {
        UpdateNews() 
        document.title = `${capitalize(props.category)}-NewsJango`; 
        /* eslint-disable-next-line */
    }, [])
    
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        
        setpage(page+1);
        let data = await fetch(url);
        let parsedata = await data.json();
        setarticles(articles.concat(parsedata.articles))
        settotalResults(parsedata.totalResults)
    };

   
        return (
            <>

                <h1 className='text-center' style={{margin: '90px 0px 35px'}}>NewsJango-Top {capitalize(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={loading && <Spinner />}
                ><div className='container'>
                        <div className="row">
                            {articles.map((element) => {
                                let Title = element.title;
                                let Description = element.description;
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={Title ? Title : ""} description={Description ? Description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>



            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 5
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}

export default News