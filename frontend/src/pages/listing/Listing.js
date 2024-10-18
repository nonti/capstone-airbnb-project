import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./Listing.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import CountertopsOutlinedIcon from "@mui/icons-material/CountertopsOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import CameraIndoorOutlinedIcon from "@mui/icons-material/CameraIndoorOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FlagIcon from "@mui/icons-material/Flag";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SmokeFreeOutlinedIcon from "@mui/icons-material/SmokeFreeOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import SanitizerOutlinedIcon from "@mui/icons-material/SanitizerOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import Footer from "../../components/footer/Footer";
import DatePicker from "react-datepicker";

const Listing = () => {
  const [guests, setGuests] = useState(1);
  const { state } = useLocation();
  const { id } = useParams();
  const [listing, setListing] = useState(state || null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stateDate, setStateDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    // If listing is not available from state, fetch it from the API
    if (!listing) {
      const fetchListing = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/accommodations/${id}`
          );
          setListing(response.data);
        } catch (error) {
          console.error("Error fetching listing data:", error);
        }
      };
      fetchListing();
    }
  }, [id, listing]);

  if (!listing) {
    return <p>Loading listing details...</p>;
  } // Re-fetch when listingId changes


  const handleGuestChange = (action) => {
    if (action === "increment") {
      setGuests((prevGuests) => prevGuests + 1);
    } else if (action === "decrement" && guests > 1) {
      setGuests((prevGuests) => prevGuests - 1);
    }
  };

  

  const handleReservation = async () => {
    if (!checkInDate || !checkOutDate || guests < 1) {
      const message = "Please fill in all fields and ensure at least one guest is selected.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }
  
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const username = userInfo?.username;
  
    
    const reservationDetails = {
      accommodation: listing?._id, // Ensure this is the correct reference to your accommodation
      user: username,
      checkInDate,
      checkOutDate,
    };
  
    console.log("Reservation Details:", reservationDetails); // Debugging log
  
    try {
      const response = await axios.post("http://localhost:5000/api/reservations", reservationDetails);
      setListing(response.data);
      setErrorMessage("");  // Reset error message
      setLoading(true);
      toast.success("Reservation made successfully!");
      navigate("/reservations", {
        state: {
          accommodation: listing._id,
          user: listing.username,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        },
      });
    } catch (error) {
      toast.error("Error making reservation. Please try again.");
      console.error("Reservation error:", error.response?.data || error.message);
    }
  };
  
  
  if (!listing) return <div>Loading...</div>;

  return (
    <>
      <div className="listing-container">
        <h1 className="listing-title">{listing.title}</h1>
        <div className="reviews">
          <div className="rating">
            <StarOutlineOutlinedIcon className="host-icons" /> 5.0 * 120 reviews
            * {listing.location}
          </div>
          <div className="share-save">
            <IosShareIcon /> <span>Share</span>
            <FavoriteBorderIcon /> <span>Save</span>
          </div>
        </div>
        <div className="image-grid">
          {/* Display the first image as a larger item spanning two rows */}
          {listing.images.length > 0 ? (
            <>
              <div className="item item1">
                <img
                  src={`http://localhost:5000/${listing.images[0]}`}
                  alt={`pic 1`}
                />
              </div>
              {/* Map through the remaining images for the grid */}
              {listing.images.slice(1).map((imageUrl, index) => (
                <div key={index} className="item">
                  <img
                    src={`http://localhost:5000/${imageUrl}`}
                    alt={`pic ${index + 2}`}
                  />
                </div>
              ))}
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>

        <section>
          <div className="listing place">{listing.listingName}</div>
          <div className="room-info">
            <p>
              {listing.guests} guests .{listing.bedrooms} bedroom .
              {listing.bathrooms} bathroom .{listing.beds} beds
            </p>
          </div>
          <div className="user-info">
            <img
              src="https://img.freepik.com/free-photo/cute-girl-with-brown-hair-red-jacket-3d-rendering_1142-54724.jpg?ga=GA1.1.2114915059.1725115900&semt=ais_hybrid"
              alt="user profile"
            />{" "}
            hosted by Zoe Barns
          </div>
        </section>
        <hr />

        <div class="flex-container">
          <div class="item1">
            <section className="listing-info2">
              <div className="listing-info2-title">
                <HomeOutlinedIcon />
                <div>
                  <span>Entire Home</span>
                  <span className="listing-info2-text">
                    You'll have the apartment to yourself
                  </span>
                </div>
              </div>
              <div className="listing-info2-title">
                <AutoAwesomeOutlinedIcon />
                <div>
                  <span>Enhanced Clean</span>
                  <span className="listing-info2-text">
                    This Host commited to Airbnb'5 step enhance cleaning
                    process. <strong>Show more</strong>
                  </span>
                </div>
              </div>
              <div className="listing-info2-title">
                <DoorFrontOutlinedIcon />
                <div>
                  <span>Self check-in</span>
                  <span className="listing-info2-text">
                    Check yourself in with the key
                  </span>
                </div>
              </div>
              <div className="listing-info2-title">
                <EventBusyOutlinedIcon />
                <span className="free">
                  <strong>Free cancellation before 14 Feb</strong>
                </span>
              </div>
            </section>
            <hr />

            <section className="description">
              {listing.description}
              <div>
                <a href="#fds">
                  Show more <KeyboardArrowRightOutlinedIcon className="icon" />
                </a>
              </div>
            </section>
            <hr />
            <section className="sleep">
              <h3>Where you'll sleep</h3>

              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-1209497090243655715/original/d0250c51-6049-4663-a93d-c6fd628f2bc8.jpeg?im_w=1200"
                alt=""
              />
              <p>
                <strong>Bedroon</strong>
              </p>
              <p>1 queen bed</p>
            </section>
            <hr />
            <section className="show-btn">
              <h3>What this place offers</h3>
              <div className="offers">
                <div class="amenities">
                  <div class="item1">
                    <span>
                      <YardOutlinedIcon className="icons-amenities" /> Garden
                      view
                    </span>
                    <span>
                      <WifiOutlinedIcon className="icons-amenities" /> Wifi
                    </span>
                    <span>
                      <AdjustOutlinedIcon className="icons-amenities" />
                      Free washer -in building
                    </span>
                    <span>
                      <AirOutlinedIcon className="icons-amenities" />
                      Central air conditioning
                    </span>
                    <span>
                      <KitchenOutlinedIcon className="icons-amenities" />{" "}
                      Refridgirator
                    </span>
                  </div>
                  <div class="item2">
                    <span>
                      <CountertopsOutlinedIcon className="icons-amenities" />
                      Kitchen
                    </span>
                    <span>
                      <PetsOutlinedIcon className="icons-amenities" /> Pets
                      allowed
                    </span>
                    <span>
                      <LocalLaundryServiceOutlinedIcon className="icons-amenities" />{" "}
                      Dryer
                    </span>
                    <span>
                      <CameraIndoorOutlinedIcon className="icons-amenities" />{" "}
                      Security
                    </span>
                    <span>
                      <DirectionsBikeOutlinedIcon className="icons-amenities" />{" "}
                      Bicycle
                    </span>
                  </div>
                </div>
              </div>
              <div className="show-btn">
                <Button variant="outlined">Show all 37 amenities</Button>
              </div>
            </section>
            <hr />
            <section>
      <h1>7 nights in New York</h1>
      <p>Start Date: {state.startDate}</p>
      <p>End Date: {state.endDate}</p>

      
    </section>
          </div>
          <div class="item2">
            <div className="pricing-box">
              <div className="pricing-header">
                <div className="night">
                  ${listing.price} / night
                  <span>
                    {" "}
                    <StarOutlineOutlinedIcon className="host-icons" /> . 7
                    reviews
                  </span>
                </div>
                <p>
                  7 nights: <strong>${(listing.price || 0) * 7}</strong>
                </p>
              </div>
              <div className="reservation-fields">
                <div className="checkin-checkout">
                  <div className="checkin">
                    <label>Check-In</label>

                    <input
                      type="date"
                      className="date-input"
                      placeholder="Add date"
                      value={checkInDate} // This should reference your state value directly
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div className="checkout">
                    <label>Check-Out</label>
                    <input
                      type="date"
                      className="date-input"
                      placeholder="Add date"
                      value={checkOutDate} // This should reference your state value directly
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="guests-selection">
                  <label>Guests</label>
                  <div className="guest-counter">
                    <button
                      className="guest-button"
                      onClick={() => handleGuestChange("decrement")}
                    >
                      -
                    </button>
                    <span className="guest-count">{guests}</span>
                    <button
                      className="guest-button"
                      onClick={() => handleGuestChange("increment")}
                    >
                      +
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              <button className="reserve-button" onClick={handleReservation}>
                Reserve
              </button>
              <p className="charge-notice">You won't be charged yet.</p>
              <ul className="fee-details">
                <li>
                  Weekly discount:{" "}
                  <span className="negative-amount">
                    -${listing.weeklyDiscount || 0}
                  </span>
                </li>
                <li>
                  Cleaning fee: <span>${listing.cleaningFee || 0}</span>
                </li>
                <li>
                  Service fee: <span>${listing.serviceFee || 0}</span>
                </li>
                <li>
                  Occupancy taxes and fees:{" "}
                  <span>${listing.occupancyTaxesFees || 0}</span>
                </li>
              </ul>
              <div className="total-amount">
                Total: <span> ${(listing.price * 7).toFixed(2)}</span>
              </div>
              <hr />
              <div className="report-listing">
                <FlagIcon />
                <Link to="#" className="report-link">
                  Report this listing
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <section className="show-btn">
          <div className="reviews-star">
            <StarIcon className="star-reviews" /> . 5.0 . 7 reviews
          </div>
          <div id="cssportal-grid">
            <div id="div1">Cleanliness</div>
            <div id="div2">
              <hr className="progress-bar" />{" "}
            </div>
            <div id="div3">5.0</div>
            <div id="div4">Accuracy</div>
            <div id="div5">
              <hr className="progress-bar" />
            </div>
            <div id="div6">5.0</div>
            <div id="div7">Communication</div>
            <div id="div8">
              <hr className="progress-bar" />
            </div>
            <div id="div9">5.0</div>
            <div id="div10">Location</div>
            <div id="div11">
              <hr className="progress-bar" />{" "}
            </div>
            <div id="div12">5.0</div>
            <div id="div13">Checkin</div>
            <div id="div14">
              <hr className="progress-bar" />{" "}
            </div>
            <div id="div15">5.0</div>
            <div id="div16">Value</div>
            <div id="div17">
              <hr className="progress-bar" />
            </div>
            <div id="div18">5.0</div>
          </div>

          <div class="parent">
            <div class="div1">
              <div class="flex-container-image">
                <div class="review-image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0QVKrjf7oMxLmxN2V23JHmtT6tP9lisUAw&s"
                    alt="Merged "
                  />
                  <div className="review-name-date">
                    <span>Rose</span>
                    <span>December 2021</span>
                  </div>
                </div>
                <div class="item2">
                  <p>Host was very attentive.</p>
                </div>
              </div>
              <div class="flex-container-image">
                <div class="review-image">
                  <img
                    src="https://img.freepik.com/free-photo/portrait-young-businessman-with-mustache-his-face-3d-rendering_1142-38839.jpg?ga=GA1.1.2114915059.1725115900&semt=ais_hybrid"
                    alt="Merged "
                  />
                  <div>
                    <span>Lucke</span>
                    <span>December 2021</span>
                  </div>
                </div>
                <div class="item2">
                  <p>Nice place to stay!.</p>
                </div>
              </div>
              <div class="flex-container-image">
                <div class="review-image">
                  <img
                    src="https://img.freepik.com/premium-photo/exaggerated-3d-character-model-with-curly-hair-inspired-by-mixedrace-girl_899449-177204.jpg?ga=GA1.1.2114915059.1725115900&semt=ais_hybrid"
                    alt="Merged "
                  />
                  <div>
                    <span>Shayna</span>
                    <span>December 2021</span>
                  </div>
                </div>
                <div class="item2">
                  <p>
                    Wonderful neighborhood, easy acces to restaurants and the
                    subway, cozy studio apartment with super comfortable
                    bed.Great host , super helpfule and responsive Cool murphy
                    bed... <br />{" "}
                    <a href="#fds">
                      Show more{" "}
                      <KeyboardArrowRightOutlinedIcon className="icon" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div class="div2">
              <div class="flex-container-image">
                <div class="review-image">
                  <img
                    src="https://img.freepik.com/premium-photo/young-smiling-man-adam-avatar_1029469-265835.jpg?ga=GA1.1.2114915059.1725115900&semt=ais_hybrid"
                    alt="Merged "
                  />
                  <div>
                    <span>Josh</span>
                    <span>November 2021</span>
                  </div>
                </div>
                <div class="item2">
                  <p>
                    Well designed and fun space, neighborhood has lots of energy
                    and amenities.
                  </p>
                </div>
              </div>
              <div class="flex-container-image">
                <div class="review-image">
                  <img
                    src="https://img.freepik.com/free-photo/portrait-beautiful-young-woman-background-night-city_1142-55102.jpg?ga=GA1.1.2114915059.1725115900&semt=ais_hybrid"
                    alt="Merged "
                  />
                  <div>
                    <span>Sarah</span>
                    <span>November 2021</span>
                  </div>
                </div>
                <div class="item2">
                  <p>
                    This is amaxing place. it has everything one needs for a
                    monthly business stay. Very clean and organised place .
                    amzing hopitality afordable price.
                  </p>
                </div>
              </div>
              <div class="flex-container-image">
                <div class="review-image">
                  <img
                    src="https://img.freepik.com/premium-photo/young-smiling-man-adam-avatar_1029469-265669.jpg?ga=GA1.1.2114915059.1725115900&semt=ais_hybrid"
                    alt="Merged "
                  />
                  <div>
                    <span>Jose</span>
                    <span>December 2021</span>
                  </div>
                </div>
                <div class="item2">
                  <p>
                    A centric place, near of a sub station and a supermarket
                    with everu=ything you need.
                    <br />
                    ...
                    <br />{" "}
                    <a href="#fds">
                      Show more{" "}
                      <KeyboardArrowRightOutlinedIcon className="icon" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="review-btn">
          <Button variant="outlined">Show all 12 reviews</Button>
          </div>

        </section>
        <hr />


        <section className="profile-text">
          <div className="hosted-by">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0QVKrjf7oMxLmxN2V23JHmtT6tP9lisUAw&s"
                alt="user profile"
              />
              <p>Hosted by <strong>Zoe Barns</strong></p>
              </div>
            </div>
            <div className="hosted-by-text">
              <p>
                <StarOutlineOutlinedIcon className="host-icons" />
                12 reviews
              </p>
              <p>
                <GppGoodOutlinedIcon className="host-icons" />
                Identity verified
              </p>
              <p>
                <MilitaryTechOutlinedIcon className="host-icons" />
                Superhost
              </p>
            </div>
            <div className="hosted-by-info">
              <div className="hosted-by-info-name">Zoe Barns is a host</div> <br />
              <p>
                Superhost for more than 10 years. She's experienced with Airbnb
                and has helped many people save money on their trips.
              </p>
              <p>Response rate: 100%</p>
              <p>Response time: within an hour</p>
              <div className="show-btn">
                <Button className="show-btn" variant="outlined">
                  Contact Host
                </Button>
              </div>
              <div className="host-info">
                <LocalPoliceOutlinedIcon /> To protect your payment, <br />
                never transfer money or communicate
                <br />
                outside of the Airbnb website or app.
              </div>
            </div>

        </section>
        <hr />

        <section>
          <h2 className="things-to-know">Things to know</h2>
          <div class="things-container">
            <div class="item1">
              <p className="rules">House rules</p>
              <div className="rules-span">
                <AccessTimeIcon />
                <span>Check-in After 4:PM</span>
              </div>

              <div className="rules-span">
                <AccessTimeIcon />
                <span>Check-out: 10:00 Am</span>
              </div>
              <div className="rules-span">
                <MobileFriendlyIcon />
                <span>Self check-in with lockbox</span>
              </div>
              <div className="rules-span">
                <ShoppingCartOutlinedIcon />
                <span>Not sutable for infants</span>
              </div>
              <div className="rules-span">
                <SmokeFreeOutlinedIcon />
                <span>No smonking</span>
              </div>
              <div className="rules-span">
                <PetsOutlinedIcon />
                <span>No pets</span>
              </div>
              <div className="rules-span">
                <CelebrationOutlinedIcon />
                <span>No parties</span>
              </div>
            </div>
            <div class="item2">
              <p className="rules">Health and safety</p>
              <div className="rules-span">
                <AutoAwesomeOutlinedIcon />
                <span>
                  Committed to Airbnb's enhanced cleaning process.Show more
                </span>
              </div>
              <div className="rules-span">
                <SanitizerOutlinedIcon />
                <span>
                  Airbnb's social-distancing and other COVID-19-realted
                  guidelines apply
                </span>
              </div>
              <div className="rules-span">
                <AirOutlinedIcon />
                <span>Carbon monoxide alarm</span>
              </div>
              <div className="rules-span">
                <AdjustOutlinedIcon />
                <span>Smoke alarm</span>
              </div>
              <div className="rules-span">
                <WysiwygOutlinedIcon />
                <span>
                  Security Deposit-if you damage the home, you may be charged
                  upto $566
                </span>
              </div>
              <Link>Show more </Link>
            </div>
            <div class="item3">
              <p className="rules">Cancellation policy</p>
              <div>Free canellation</div>
              <div className="rules-span">
                <Link>Show more </Link>
              </div>
            </div>
          </div>

        </section>
        <hr />

        <section className="explore-container">
          <h2 className="things-to-know">Explore other options in France</h2>
          <div class="explore-content">
            <div class="item1">
              <p>Paris</p>
              <p>Lilie</p>
              <p>Toulouse</p>
            </div>
            <div class="item2">
              <p>Nice</p>
              <p>Aix-en-Provence</p>
              <p>Montpellier</p>
            </div>
            <div class="item3">
              <p>Lyon</p>
              <p>Rouen</p>
              <p>Dijon</p>
            </div>
            <div class="item4">
              <p>Marseille</p>
              <p>Amiens</p>
              <p>Grenoble</p>
            </div>
          </div>
          <h4 className="unique">Unique stays on Airbnb</h4>
          <div class="explore-content">
            <div class="item1">
              <p>Beach house Rentals</p>
              <p>Cabin Rentals</p>
            </div>
            <div class="item2">
              <p>Camp Rentals</p>
              <p>Tiny House Rentals</p>
            </div>
            <div class="item3">
              <p>Glamping Rentals</p>
              <p>Lake House Rentals</p>
            </div>
            <div class="item4">
              <p>Treehouse Rentals</p>
              <p>Mountain Chalet Rentals</p>
            </div>
          </div>
          <div className="airbnb">
            <span>
              Airbnb <KeyboardArrowRightIcon />
            </span>
            <span>
              Europe <KeyboardArrowRightIcon />
            </span>
            <span>
              France <KeyboardArrowRightIcon />
            </span>
            <span>Bordeaux</span>
          </div>
        </section>
      <Footer />

      </div>
      <ToastContainer />
    </>
  );
};

export default Listing;
