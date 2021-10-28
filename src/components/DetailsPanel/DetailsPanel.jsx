import { Dialog } from 'primereact/dialog';
import './DetailsPanel.css'



export default function DetailsPanel({ visible, setVisible, selectedMovie }) {
    // Footer and header for our details page
    const footer = (
        <div className="detailsFooter">
            All movie data are from Wikipedia and IMDb.
        </div>
    )
    const header = (
        <div className="headerTitle">MOVIE DETAILS</div>
    )
    return (
        <Dialog visible={visible} header={header} footer={footer} position="right" onHide={() => setVisible(false)} dismissableMask="true">
            {selectedMovie ?
                <div className="detailsContainer">
                    <div className="titleContainer">
                        <div className="titleText">{selectedMovie.title}</div>
                        <div style={{ fontWeight: 600 }}>Directed by {selectedMovie.director}</div>
                    </div>
                    {/* Map our seleceted movies actors, and genres into spans inside container */}
                    <div>
                        <div className="infoContainers">
                            <div className="subheadingText">Cast:</div>

                            {selectedMovie.cast.map(actor => (
                                <span key={actor} className="textBubble">{actor}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="infoContainers">
                            <div className="subheadingText">Genre:</div>
                            {selectedMovie.genre.map(genre => (
                                <span key={genre} className="textBubble">{genre}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="infoContainers">
                            <div className="subheadingText">Plot:</div>
                            <span style={{ fontSize: 20 }}>{selectedMovie.plot}</span>
                        </div>
                    </div>
                </div> : null}
        </Dialog>
    )
}