import {useEffect, useState} from "react";

const List_Country = () => {
    const [countries , setCountries] = useState([]);
    const [filteredCountries , setFilteredCountries] = useState([]);
    const [searchTerm , setSearchTerm] = useState("");
    const [minArea , setMinArea] = useState("");
    const [maxArea , setMaxArea] = useState("");
    const [minPopulation , setMinPopuation] = useState("");
    const [maxPopulation , setMaxPopulation] = useState("");


    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all?fields=name,area,population,flags")
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching the countries data", error);
            });
    }, []);

    const filterCountries = () => {
        let filtered = countries;

        if (searchTerm) {
            filtered = filtered.filter((country) =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (minArea) {
            filtered = filtered.filter((country) => country.area >= minArea);
        }

        if (maxArea) {
            filtered = filtered.filter((country) => country.area <= maxArea);
        }

        if (minPopulation) {
            filtered = filtered.filter((country) => country.population >= minPopulation);
        }

        if (maxPopulation) {
            filtered = filtered.filter((country) => country.population <= maxPopulation);
        }

        setFilteredCountries(filtered);
    };


    useEffect(() => {
        filterCountries();
    }, [searchTerm, minArea, maxArea, minPopulation, maxPopulation]);

    return (
        <div>
            <h1>Danh sách các quốc gia</h1>
            <div>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="number"
                    placeholder="Diện tích tối thiểu"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Diện tích tối đa"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="number"
                    placeholder="Dân số tối thiểu"
                    value={minPopulation}
                    onChange={(e) => setMinPopuation(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Dân số tối đa"
                    value={maxPopulation}
                    onChange={(e) => setMaxPopulation(e.target.value)}
                />
            </div>

            <div>
                {filterCountries.map((country) => (
                    <div key={country.name.common} style={{border: "1px solid black", margin: "10px", padding: "10px" }}>
                        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100"/>
                        <h2>{country.name.common}</h2>
                        <p>Diện tích: {country.area} km²</p>
                        <p>Dân số: {country.population}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default List_Country;