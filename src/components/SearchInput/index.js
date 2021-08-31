import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import './index.css'

class SearchInputRoute extends Component {
  state = {inputValue: ''}

  onEnterSearchInput = event => {
    const {enterSearchInput, changeSearchInput} = this.props
    const {inputValue} = this.state
    if (event.key === 'Enter') {
      changeSearchInput(inputValue)
      enterSearchInput()
    }
  }

  onSearchClick = () => {
    const {enterSearchInput, changeSearchInput} = this.props
    const {inputValue} = this.state
    changeSearchInput(inputValue)
    enterSearchInput()
  }

  onChangeSearchInput = event => {
    console.log(event.target.value)
    this.setState({inputValue: event.target.value})
  }

  renderSearchInput = () => {
    const {inputValue} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={inputValue}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-button"
          onClick={this.onSearchClick}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return <div>{this.renderSearchInput()}</div>
  }
}

export default SearchInputRoute
