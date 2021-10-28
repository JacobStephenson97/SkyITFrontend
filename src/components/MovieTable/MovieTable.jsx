import React, { useState, useEffect, useRef } from 'react';
import { DataTable, } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import './MovieTable.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import DetailsPanel from '../DetailsPanel/DetailsPanel';

export default function MovieTable() {
    //States needed
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [first, setFirst] = useState(0);
    const [selectedDirector, setSelectedDirector] = useState(null)
    const [selectedCert, setSelectedCert] = useState(null)
    const [visible, setVisible] = useState(false)
    const dt = useRef(null); //Datatable Refrence
    const directors = [...new Set(movies.map(movie => movie.director))] //List of Directors
    const certifications = ["GENERAL", "CA-PG", "14 ACCOMPANIMENT"] //Current Certifications
    useEffect(() => {
        fetch('https://skyit-coding-challenge.herokuapp.com/movies')
            .then(response => response.json())
            .then(data => {
                data.forEach(movie => {
                    movie.rating = (movie.rating * 20).toFixed(2) + '%'
                    movie.certification = movie.certification.toUpperCase();
                })
                setMovies(data)
            });
    }, [])
    //Director and Certifcation change and template functions
    const onDirectorChange = (e) => {
        dt.current.filter(e.value, 'director', 'in'); //checks if search is in any directors names
        setSelectedDirector(e.value);
    }
    const directorTemplate = (option) => {
        return <span>{option}</span>
    }

    const onCertChange = (e) => {
        dt.current.filter(e.value, 'certification', 'equals'); //Filters based on our dropdown selection
        setSelectedCert(e.value);
    }
    const certTemplate = (option) => {
        return <span className={`certification ${option}`}>{option}</span>;
    }


    const certificationBody = (rowData) => {
        return (
            <React.Fragment>
                <span className={`certification ${rowData.certification}`}>{rowData.certification}</span>
            </React.Fragment>
        );
    }
    const directorFilter = <MultiSelect value={selectedDirector} options={directors} onChange={onDirectorChange} itemTemplate={directorTemplate} placeholder="All" className="p-column-filter" />;
    const certFilter = <Dropdown value={selectedCert} options={certifications} onChange={onCertChange} itemTemplate={certTemplate} placeholder="Select a Status" showClear className="p-column-filter" />;
    return (
        <div className="movietable-style">
            <DataTable ref={dt} value={movies} paginator rows={10} first={first} onPage={(e) => setFirst(e.first)}
                paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" selection={selectedMovie} onSelectionChange={e => {
                    setVisible(true)
                    setSelectedMovie(e.value)
                }}>
                <Column selectionMode="single" style={{ width: '3em' }} />
                <Column field="title" header="Title" filter filterPlaceholder="Search by title"></Column>
                <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year"></Column>
                <Column field="length" header="Running Time" filter filterPlaceholder="Search by time"></Column>
                <Column field="director" header="Director" filter filterElement={directorFilter}></Column>
                <Column field="certification" header="Certification" body={certificationBody} filter filterElement={certFilter}></Column>
                <Column field="rating" header="Rating" filter filterPlaceholder="Search by Rating"></Column>
            </DataTable>
            <DetailsPanel visible={visible} setVisible={setVisible} selectedMovie={selectedMovie} />
        </div>
    );
}
