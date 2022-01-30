import React, { useState, useEffect, useContext } from "react"
import {
  NavbarWrapper,
  NavLinkWrapper,
  NavbarLinks,
  NavbarLogin,
  NavbarMenu,
  navbrandConfig,
} from "./NavbarElements"
import { lightTheme } from "../../../theme/global-theme"
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import { AuthContext } from "../../../context/auth/AuthContext"
import { signInStatus, signOutUser } from "../../../firebase"

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)
  const [showNavItems, setShowNavItems] = useState(false)
  const { user, dispatch } = useContext(AuthContext)

  const ButtonConfig = {
    padding: ".5rem 2rem",
    curve: ".65rem",
    fontSize: "1rem",
    bold: 600,
    color: lightTheme.font,
    hoverBg: lightTheme.font,
  }

  const handlerUser = () => {
    if (user) {
      signOutUser(dispatch)
    } else {
      navigate("/auth/signin")
    }
  }

  useEffect(() => {
    if (window.screen.width <= 768) {
      setIsMobile(true)
      setShowNavItems(false)
      // console.log(isMobile, showNavItems)
    } else {
      setIsMobile(false)
      setShowNavItems(true)
      // console.log(isMobile, showNavItems)
    }
  }, [])

  useEffect(() => {
    signInStatus(dispatch)
  }, [dispatch, user])

  return (
    <NavbarWrapper className="container d-flex justify-content-between align-items-center">
      <StaticImage
        src={"../../../images/gatsby-icon.png"}
        width={45}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="Antler"
        style={navbrandConfig}
        placeholder="BLURRED"
        onClick={() => navigate("/")}
      />
      {isMobile && (
        <NavbarMenu
          onClick={() => {
            setShowNavItems(!showNavItems)
          }}
        />
      )}
      <NavLinkWrapper
        animateNav={showNavItems}
        className="d-flex justify-content-around align-items-center"
      >
        <NavbarLinks to={"https://github.com/nparashar150"} target={"_blank"}>
          About Me
        </NavbarLinks>
        <NavbarLinks to={user ? "/browse" : "/auth/signin"}>Browse</NavbarLinks>
        <NavbarLinks
          to={"https://github.com/nparashar150/WebApp"}
          target={"_blank"}
        >
          Source Code
        </NavbarLinks>
        {isMobile && (
          <NavbarLogin onClick={handlerUser} {...ButtonConfig}>
            {user ? "Log Out" : "Log In"}
          </NavbarLogin>
        )}
      </NavLinkWrapper>
      {!isMobile && (
        <NavbarLogin onClick={handlerUser} {...ButtonConfig}>
          {user ? "Log Out" : "Log In"}
        </NavbarLogin>
      )}
    </NavbarWrapper>
  )
}
