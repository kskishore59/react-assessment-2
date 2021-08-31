import './index.css'

const SalaryRangesRoute = props => {
  const renderSalaryRangesList = () => {
    const {salaryRangesList} = props

    const onChangeEvent = event => {
      const {changeSalaryRange} = props
      changeSalaryRange(event.target.value)
    }

    return salaryRangesList.map(range => {
      const {activeSalaryRange} = props

      const rangeClassName =
        activeSalaryRange === range.salaryRangeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li className="rating-item2" key={range.salaryRangeId}>
          <input
            type="radio"
            value={range.salaryRangeId}
            id={range.label}
            name="salaryPackage"
            onChange={onChangeEvent}
            className={rangeClassName}
          />
          <label className={rangeClassName} htmlFor={range.label}>
            {range.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="salary-range-container">{renderSalaryRangesList()}</div>
  )
}

export default SalaryRangesRoute
