import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const sendToJobsRoute = () => <Redirect to="/jobs" />

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="text-container">
          <h1 className="main-head">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="desc">
            Millions of people are searching for jobs, salary, information,
            company reviews.
            <br /> Find the job that file your abilities and potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="find-jobs-btn"
              onClick={sendToJobsRoute}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
