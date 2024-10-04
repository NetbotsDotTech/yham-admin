
import React from "react";
import { AppBar, Toolbar, Box, Typography, Link } from "@mui/material";

const TopMenu = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#f8f8f8",
          padding: "0.5rem 1rem",
        }}
      >
        {/* Left Side: Contact Info */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2">
            <Link href="tel:03469555195" underline="none" color="inherit">
              Have any Question? Call us: 0346-9555195
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="mailto:info@yousufhussainabadimuseum.pk" underline="none" color="inherit">
              Mail us: info@yousufhussainabadimuseum.pk
            </Link>
          </Typography>
          <Typography variant="body2">Mon - Sun: 07:00AM - 07:00PM</Typography>
        </Box>

        {/* Right Side: Button or Quick Link */}
        <Box display="flex" alignItems="center">
          <Link href="#" underline="none" sx={{ ml: 2, color: "primary.main" }}>
            <Typography variant="button">NEWS</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;













// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "magnific-popup/dist/magnific-popup.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "odometer/themes/odometer-theme-default.css";
// import "../style.css";
// // import LOGO from "../assets/img/logo.svg";

// import { useState } from "react";
// import NewsSideBar from "./NewsSideBar"; // Adjust the import path as needed

// const TopMenu = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     console.log(isSidebarOpen);
//     console.log("Triggered");
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div>
//       {/* Sidebar Component */}
//       {isSidebarOpen && <NewsSideBar />}

//       <header className="nav-header header-layout1">
//         <div className="header-top d-md-block d-none">
//           <div className="container">
//             <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
//               <div className="col-auto">
//                 <div className="header-links">
//                   <ul>
//                     <li>
//                       <svg
//                         width="17"
//                         height="17"
//                         viewBox="0 0 17 17"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M15 11.0312L11.9375 9.71875C11.25 9.40625 10.4688 9.625 10 10.1875L9.15625 11.2188C7.75 10.4062 6.59375 9.25 5.78125 7.875L6.84375 7.03125C7.375 6.5625 7.59375 5.78125 7.3125 5.125L5.96875 2C5.65625 1.28125 4.875 0.875 4.09375 1.0625L1.25 1.71875C0.5 1.875 0 2.53125 0 3.3125C0 10.875 6.125 17 13.6875 17C14.4688 17 15.125 16.5 15.25 15.75L15.9062 12.9062C16.125 12.125 15.7188 11.3438 15 11.0312ZM14.4688 12.5625L13.8125 15.4062C13.8125 15.4375 13.75 15.5 13.6875 15.5C6.96875 15.5 1.46875 10.0312 1.46875 3.3125C1.46875 3.25 1.53125 3.1875 1.59375 3.1875L4.4375 2.53125L4.46875 2.5C4.53125 2.5 4.5625 2.5625 4.59375 2.59375L5.90625 5.65625C5.9375 5.71875 5.9375 5.78125 5.875 5.8125L4.34375 7.0625C4.09375 7.28125 4 7.65625 4.15625 7.96875C5.1875 10.0625 6.90625 11.7812 9 12.8125C9.3125 12.9688 9.71875 12.9062 9.9375 12.625L11.1875 11.0938C11.2188 11.0625 11.2812 11.0312 11.3438 11.0625L14.4062 12.375C14.4688 12.4375 14.5 12.5 14.4688 12.5625Z"
//                           fill="inherit"
//                         />
//                       </svg>
//                       <a href="tel:03469555195">Have any Question?</a>
//                     </li>
//                     <li>
//                       <i className="far fa-envelope"></i>
//                       <a href="mailto:info@artvista.com">
//                         Mail Us: info@yousufhussainabadimuseum.pk
//                       </a>
//                     </li>
//                     <li>
//                       <i className="far fa-clock"></i>Mon - Sun: 07:00AM - 07:00PM
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-auto d-none d-lg-block">
//                 <div className="header-links header-links-right">
//                   <ul>
//                     <li>
//                       <button
//                         type="button"
//                         className="sidebar-btn sideMenuToggler"
//                         onClick={toggleSidebar}
//                       >
//                         <span>NEWS</span>
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default TopMenu;
