import React from "react";
import FormInput from "../form-input/FormInput";
import {BsSearch, BsXCircleFill} from 'react-icons/bs'
import style from '../../components/main-list/main-list.module.scss'

const SearchBar = ({setSearchValue, searchValue, filterVacation, clearSearch}) => {
	return (
		<div className={style.searchBar}>
			<FormInput
				type="search"
				placeholder="Type to search"
				onChange={(e) => setSearchValue(e.target.value)}
				value={searchValue}
			/>
			<button onClick={filterVacation}><BsSearch /></button>
			<button onClick={clearSearch}><BsXCircleFill /></button>
		</div>
	);
};

export default SearchBar;
