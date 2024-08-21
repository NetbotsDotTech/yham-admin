import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

export default function ContactUs() {
    const openingHours = [
        { day: "Monday", hours: "07 AM - 07 PM" },
        { day: "Tuesday", hours: "07 AM - 07 PM" },
        { day: "Wednesday", hours: "07 AM - 07 PM" },
        { day: "Thursday", hours: "07 AM - 07 PM" },
        { day: "Friday", hours: "07 AM - 07 PM" },
        { day: "Saturday", hours: "07 AM - 07 PM" },
        { day: "Sunday", hours: "07 AM - 07 PM" },
    ];
    return (
        <div>
            {/* <!--==============================
            Location Area  
            ==============================--> */}
            <div className="location-area space bg-smoke">
                <div className="location-page-thumb">
                    <img src="/img/normal/location-img.png" alt="img" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2 className="sec-title">YOUSUF HUSSAINABADI MUSEUM SKARDU
                            </h2>
                            <p className="mt-20 mb-2">Yousuf Hussainabadi Museum,Jinnah Park Hussainabad Skardu Baltistan.
                            </p>
                            <p className="mb-2">Call Now : 03005290548, 03469555195</p>
                            <p className="mb-0">Mail Now : info@yousufhussainabadimuseum.pk ,  yousufhussainabadi@yahoo.com</p>
                            <div className="btn-wrap mt-30">
                                <a href="https://www.google.com/maps/dir//Yousuf+Hussainabadi+Museum+8P24%2BCH7+Hussainabad,+Skardu/@35.3010608,75.7062818,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x38e463000ab4e56b:0x7dd5b6d04f1dad88" className="btn">
                                    GET DIRECTION
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--==============================
            Opening Hour Area  
            ==============================--> */}
            <div className="opening-hour-area space">
                <div className="container">
                    <div className="row gy-40 gx-60">
                        <div className="col-lg-6">
                            <table className="table opening-hour-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Day</th>
                                        <th scope="col">Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {openingHours.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.day}</td>
                                            <td className={item.className || ""}>{item.hours}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                      
                            
                            <div className="alert alert-info mt-4">
                                    <strong>Note:</strong> The park will remain open for visitors except on Islamic special days such as Ashura and Arbaeen.
                                </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="location-map">
                                <div className="map-sec">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3256.1980223247256!2d75.7062818!3d35.3010608!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e463000ab4e56b%3A0x7dd5b6d04f1dad88!2sYousuf%20Hussainabadi%20Museum!5e0!3m2!1sen!2s!4v1724218284826!5m2!1sen!2s"
                                        width="600"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Yousuf Hussainabadi Museum Map"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
