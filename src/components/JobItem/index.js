import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    title,
    rating,
    imageUrl,
    place,
    jobType,
    id,
    salary,
    description,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <div className="col-1">
        <div className="row">
          <img src={imageUrl} alt="company logo" className="company-img" />
          <div className="col">
            <h1 className="head2">{title}</h1>
            <p className="rating-text">
              <AiFillStar />
              {rating}
            </p>
          </div>
        </div>
        <div className="row-2">
          <div className="row-3">
            <p className="place">
              <MdLocationOn className="icon" /> {place}
            </p>
            <p className="place">
              <GiSuitcase className="icon" /> {jobType}
            </p>
          </div>
          <p className="salary">{salary}</p>
        </div>
        <hr className="hor-line" />
        <h1 className="desc-2">Description</h1>
        <p className="desc-para">{description}</p>
      </div>
    </Link>
  )
}
export default JobCard
