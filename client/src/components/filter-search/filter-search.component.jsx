import React from "react";
import { Link } from "react-router-dom";

//components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

//style and icons
import "./filter-search.style.scss";
const FilterSearch = (query, filter) => {




  return (
    <div className="filter-popup">
        <div className="filter-title">
        FILTER
        </div>
        <Link to={"lobby"}>
            <CustomButton 
                className="none-filter-button"
                type="button"
            >
            None
            </CustomButton>
        </Link>
        <Link to={"lobby"}>
            <CustomButton 
                className="room-filter-button"
                type="button"
            >
            Room
            </CustomButton>
        </Link>
        <Link to={"lobby"}>
            <CustomButton 
                className="user-filter-button"
                type="button"
            >
            User
            </CustomButton>
        </Link>
        <Link to={"lobby"}>
            <CustomButton 
                className="tags-filter-button"
                type="button"
            >
            Tags
            </CustomButton>
        </Link>
    </div>
  );
};

export default FilterSearch;