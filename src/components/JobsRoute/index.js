import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import SalaryRangesRoute from '../SalaryRangesRoute'
import EmploymentTypesList from '../EmploymentTypeRoute'
import Header from '../Header'
import JobCard from '../JobItem'
import SearchInputRoute from '../SearchInput'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentType: '',
    activeSalaryRange: '',
    searchInput: '',
    profileDetails: [],
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentType, activeSalaryRange, searchInput} = this.state
    const searchIn = searchInput.toLowerCase()
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activeSalaryRange}&search=${searchIn}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        title: job.title,
        rating: job.rating,
        imageUrl: job.company_logo_url,
        id: job.id,
        place: job.location,
        jobType: job.employment_type,
        salary: job.package_per_annum,
        description: job.job_description,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmploymentType = activeEmploymentType => {
    this.setState({activeEmploymentType}, this.getJobs)
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  changeSearchInput = value => {
    console.log(value)
    this.setState({searchInput: value}, this.getJobs)
  }

  onRetryClick = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.success,
        activeEmploymentType: '',
        activeSalaryRange: '',
        searchInput: '',
      },
      this.getJobs,
    )
  }

  onRetryClickProfile = () => {
    this.setState(
      {apiStatus: apiStatusConstants.success, profileDetails: []},
      this.getProfileDetails,
    )
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: fetchedData})
    } else {
      this.setState(
        {apiStatus: apiStatusConstants.failure},
        this.renderProfileFailureView,
      )
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImgUrl, shortBio} = profileDetails

    return (
      <div className="profile-img">
        <img src={profileImgUrl} alt="profile" />
        <h1 className="profile-head">{name}</h1>
        <p className="para">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <button type="button" onClick={this.onRetryClickProfile}>
        Retry
      </button>
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button type="button" onClick={this.onRetryClick}>
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
        <button type="button" onClick={this.onRetryClick}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentType, searchInput, activeSalaryRange} = this.state

    return (
      <div className="input">
        <Header />

        <div className="all-products-section">
          <div className="col">
            {this.renderProfileView()}
            <h1 className="head">Type of Employment</h1>
            <ul className="filters-view">
              <li>
                <EmploymentTypesList
                  employmentTypesList={employmentTypesList}
                  activeEmploymentType={activeEmploymentType}
                  changeEmploymentType={this.changeEmploymentType}
                />
              </li>
              <h1 className="head">Salary Range</h1>
              <li>
                <SalaryRangesRoute
                  salaryRangesList={salaryRangesList}
                  activeSalaryRange={activeSalaryRange}
                  changeSalaryRange={this.changeSalaryRange}
                  enterSearchInput={this.enterSearchInput}
                />
              </li>
            </ul>
          </div>
          <div>
            <SearchInputRoute
              searchInput={searchInput}
              enterSearchInput={this.enterSearchInput}
              changeSearchInput={this.changeSearchInput}
            />
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
