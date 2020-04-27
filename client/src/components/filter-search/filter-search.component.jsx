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
        {/* <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">
            Filter
            </InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.state.filterBy}
            onChange={this.handleSelect.bind(this)}
            >
            <MenuItem value={"none"}>None</MenuItem>
            <MenuItem value={"roomName"}>Room</MenuItem>
            <MenuItem value={"tags"}>Tags</MenuItem>
            <MenuItem value={"users"}>Users</MenuItem>
            </Select>
        </FormControl> */}
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