import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
//import mainImage from "../src/Images/image00005.jpeg";

const imagePaths = [
    require("../src/Images/image00005.jpeg"),
    require("../src/Images/image00006.jpeg"),
    require("../src/Images/image00007.jpeg"),
];

const Main = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Change the image every 5 seconds (5000 milliseconds)
        const intervalId = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
        }, 3000);
        return () => {
            // Cleanup the interval when the component is unmounted
            clearInterval(intervalId);
          };
        }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div id="main-content" className="container">
                <div className="jumbotron">
                    <img src={imagePaths[currentImageIndex]} alt="Picture of restaurant" className="img-responsive d-none d-sm-block col-md-12 col-sm-12 col-xs-12" />
                </div>

                <div id="home-tiles" className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Link to="/fruits" className="text-decoration-none">
                            <div id="fruits-tile" className="bg-primary text-white">
                                <span>Fruits</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Link to="/vegetables" className="text-decoration-none">
                            <div id="vegetables-tile" className="bg-primary text-white">
                                <span>Vegetables</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Link to="/herbs" className="text-decoration-none">
                            <div id="herbs-tile" className="bg-primary text-white">
                                <span>Herbs</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Link to="/discounts" className="text-decoration-none">
                            <div id="discounts-tile" className="bg-primary text-white">
                                <span>Special Prices</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <a href="https://maps.app.goo.gl/oeRnwfQxzXnwxXKX6" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <div id="map-tile" className="bg-primary text-white">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.3648052776468!2d35.55150096959337!3d33.645261114780325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ee1372b9e8b15%3A0x70ed69ff282fba87!2sSivedco!5e0!3m2!1sen!2slb!4v1702227828128!5m2!1sen!2slb" width="100%" height="250" allowFullScreen="" loading="lazy" title="Google Map" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                <span>Map</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;
