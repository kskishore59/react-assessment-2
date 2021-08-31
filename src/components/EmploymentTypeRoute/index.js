import './index.css'

const EmploymentTypesList = props => {
  const renderEmploymentTypesList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {activeEmploymentType, changeEmploymentType} = props
      const onClickEmploymentTypeItem = () =>
        changeEmploymentType(employment.employmentTypeId)

      const employmentClassName =
        activeEmploymentType === employment.employmentTypeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li
          className="rating-item"
          key={employment.employmentTypeId}
          onClick={onClickEmploymentTypeItem}
        >
          <input
            type="checkbox"
            value={employment.employmentTypeId}
            id={employment.label}
          />
          <label className={employmentClassName} htmlFor={employment.label}>
            {employment.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-group-container">{renderEmploymentTypesList()}</div>
  )
}

export default EmploymentTypesList
