import { useEffect, useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
import { Search } from 'lucide-react';

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  // useEffect(()=>{
  //   console.log(query.type);
  // }, [query])

  const handleChange = (e) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, [e.target.name]:e.target.value }));
  }

  const params = new URLSearchParams();
  if (query.type) params.set("type", query.type);
  if (query.city) params.set("city", query.city);
  if (query.minPrice !== "") params.set("minPrice", query.minPrice);
  if (query.maxPrice !== "") params.set("maxPrice", query.maxPrice);
  const listUrl = params.toString() ? `/list?${params.toString()}` : "/list";

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={query.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />
        <Link to={listUrl}>
          <button type="button">
            <Search size={20} />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;