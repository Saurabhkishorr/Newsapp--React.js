import React from 'react'

const NewsItem = (props)=>{
  
    let {title, description, imageUrl, newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <span className="badge text-bg-success" style={{position:'absolute',zIndex:1, borderTopRightRadius:0,borderBottomLeftRadius:0}}>{source}</span>
        <div className="card h-100">
          <img src={!imageUrl?"https://c.ndtvimg.com/2023-11/pvpc9qoo_crab-nebula-nasa_625x300_01_November_23.jpeg?ver-20231016.06":imageUrl} className="card-img-top"  alt="..." style={{height: "250px"}}/>
            <div className="card-body" style={{height: "340px"}}>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary" style={{position:'absolute',bottom:'12px',left:'38%'}}>Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem