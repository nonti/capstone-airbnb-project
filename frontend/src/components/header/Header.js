import React, { useEffect, useState } from "react";
import "./Header.css";
import logo_r from "../../assets/images/long-logo.png";
import logo_w from "../../assets/images/logo-a.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const authPaths = ["/signin", "/signup"];
  const locationPath = ["/locations", "/locationInfo"];
  const listingsPath = ["/listings"];
  const listingPath = ["/listing"];
  const createListingPath = ["/create-listing"];
  const adminPath = ["/dashboard"];
  const reservationsPath = ["/reservations"];

  const isLocationPage = locationPath.includes(location.pathname);
  const isCreateListingPage = createListingPath.includes(location.pathname);
  const isReservationsPage = reservationsPath.includes(location.pathname);
  const isHomePage = location.pathname === "/";
  const isListingsPage = listingsPath.includes(location.pathname);
  const isAdminPage = adminPath.includes(location.pathname);
  const isListingPage = listingPath.includes(location.pathname);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); 
    console.log("Retrieved User from Local Storage:", storedUser);
    if (storedUser && storedUser.role && storedUser.username) {
      setRole(storedUser.role);
      setUsername(storedUser.username);
      setUser(storedUser);
    } else {
      setRole(null);
      setUsername(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setRole(null);
    setUsername(null);
    setUser(null);
    setTimeout(() => {
      navigate("/");
  }, 0);
  };

  const selectedLocation = location.state?.selectedLocation || "Anywhere";
  const checkInDate = location.state?.checkInDate
    ? new Date(location.state.checkInDate)
    : null;
  const checkOutDate = location.state?.checkOutDate
    ? new Date(location.state.checkOutDate)
    : null;

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : "";
  };

  return (
    <>
      <div
        className={`header ${
          isScrolled || !isHomePage ? "header-white" : "header-black"
        }`}
      >
        <Link to="/">
          <img
            src={`${isScrolled || !isHomePage ? logo_r : logo_w}`}
            alt="Logo"
            className="logo"
          />
        </Link>

        {/* Conditionally render search bar and profile container */}
        {!authPaths.includes(location.pathname) && (
          <>
            {isLocationPage || isListingsPage ? (
              <>
                <div className="search-bar-container">
                  <div className="search-bar">
                    <div className="search-bar-text">{selectedLocation}</div>
                    <div className="search-bar-text">
                      {checkInDate ? formatDate(checkInDate) : "Any Week"}
                    </div>
                    <div className="search-bar-text">
                      {checkOutDate ? formatDate(checkOutDate) : "Add guests"}
                    </div>
                    <div className="search-icon-div">
                      <SearchRoundedIcon className="search-icon" />
                    </div>
                  </div>
                </div>
                <div className="profile-container">
                  {user ? (
                    <>
                      {role === "host" ? (
                        // Display host's name where "Become a host" usually is
                        <div
                          className={`become-a-host ${
                            isHomePage ? "host-black" : "host-white"
                          }`}
                        >
                          {username}
                        </div>
                      ) : (
                        // Display "Become a host" for regular users
                        <Link to="/signin" className={`become-a-host ${isScrolled ? "host-black" : "host-white"}`}>
                          <div className={`become-a-host ${isScrolled ? "host-white" : "host-black"}`}>
                            Become a host
                          </div>
                        </Link>
                      )}

                      <div className="profile-div">
                        <div className="dropdown">
                          <MenuRoundedIcon className="dropbtn" />
                          <div className="dropdown-content">
                            {role === "host" ? (
                              <>
                               <span
                                  onClick={() => navigate("/reservations")}
                                  className="link"
                                >
                                  View Reservations
                                </span>
                                <span
                                  onClick={() => navigate("/create-listing")}
                                  className="link"
                                >
                                  Create Listing
                                </span>
                                <span
                                  onClick={() => navigate("/listings")}
                                  className="link"
                                >
                                  View Listings
                                </span>
                                <span
                                  onClick={() => navigate("/")}
                                  className="link"
                                >
                                  Sign Out
                                </span>         
                              
                              </>
                            ) : (
                              <>
                                <span
                            onClick={() => navigate("/signin")}
                            className="link"
                          >
                            Sign In
                          </span>
                          <span
                            onClick={() => navigate("/signup")}
                            className="link"
                          >
                            Sign Up
                          </span>        
                              </>
                            )}  
                          </div>
                          <AccountCircleIcon className="profile-icon" />
                        </div>

                        {/* If the user is logged in and is NOT a host, show the name near the AccountCircleIcon */}
                        {role === "user" && (
                          <div className="user-name">
                            {username}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className={`become-a-host ${isScrolled ? "host-black" : "host-white"}`}>
                        <div className={`become-a-host ${isHomePage ? "host-black" : "host-white"}`}>
                          Become a host
                        </div>
                      </Link>
                      <div className={`become-a-host ${ isHomePage ? "host-white" : "host-black"}`} >
                        <LanguageIcon className={`become-a-host ${isHomePage ? "host-white" : "host-black"}`} sx={{ fontSize: "1.3rem" }}/>
                      </div>
                      <div className="profile-div">
                        <div className="dropdown">
                          
                          <MenuRoundedIcon className="dropbtn" />
                          <div className="dropdown-content">
                          <span
                                  onClick={() => navigate(`/reservations/user/${user.id}`)}
                                  className="link"
                                >
                                  View Reservations
                                </span>
                            <span onClick={handleSignOut} className="link">
                              Sign Out
                            </span>
                          </div>
                          <AccountCircleIcon className="profile-icon" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {!isScrolled && isHomePage && (
                  <div className="header-text">
                    <p>Places to stay</p>
                    <p>Experiences</p>
                    <p>Online Experiences</p>
                  </div>
                )}

                {isScrolled && isHomePage && (
                  <div className="search-bar-container">
                    <div className="search-bar">
                      <div className="search-bar-text">Anywhere</div>
                      <div className="search-bar-text">Any Week</div>
                      <div className="search-bar-text2">Add guests</div>
                      <div className="search-icon-div">
                        <SearchRoundedIcon className="search-icon" />
                      </div>
                    </div>
                  </div>
                )}

                {!isHomePage && !isCreateListingPage && !isAdminPage && (
                  <div className="search-bar-container-input">
                    <div className="search-bar-input">
                      <input type="text" placeholder="Search" />
                      <div className="search-icon-div">
                        <SearchRoundedIcon className="search-icon" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="profile-container">
                  <Link to="/signin" className={`become-a-host ${isScrolled ? "host-black" : "host-white"}`}>
                    <div
                      className={`become-a-host ${
                        isHomePage ? "host-white" : "host-black"
                      }`}
                    >
                      Become a host
                    </div>
                  </Link>
                  <div
                    className={`become-a-host ${
                      isHomePage ? "host-white" : "host-black"
                    }`}
                  >
                    <LanguageIcon
                      className={`become-a-host ${
                        isHomePage ? "host-white" : "host-black"
                      }`}
                      sx={{ fontSize: "1.3rem" }}
                    />
                  </div>
                  <div className="profile-div">
                    <div className="dropdown">
                      <MenuRoundedIcon className="dropbtn" />
                      <div className="dropdown-content">
                        {!user ? (
                          <>
                           <span
                              onClick={() => navigate("/signin")}
                              className="link"
                            >
                              Sign In
                            </span>
                            <span
                              onClick={() => navigate("/signup")}
                              className="link"
                            >
                              Sign Up
                            </span>
                         
                          </>
                        ) : (
                          <>
                           <span
                                  onClick={() => navigate("/reservations")}
                                  className="link"
                                >
                                  View Reservations
                                </span>
                                <span
                                  onClick={() => navigate("/create-listing")}
                                  className="link"
                                >
                                  Create Listing
                                </span>
                                <span
                                  onClick={() => navigate("/listings")}
                                  className="link"
                                >
                                  View Listings
                                </span>
                            <span onClick={handleSignOut} className="link">
                              Sign Out
                            </span>
                           
                          </>
                        )}
                      </div>
                      <AccountCircleIcon className="profile-icon" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

    </>
  );
};

export default Header;
