import React from "react"
import {
  MovieListWrapper,
  MovieItemWrapper,
  MovieItemHeading,
  MovieItemInfo,
  MovieImageWrapper,
} from "./MovieListStyles"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function MovieListMapper({ prismic }) {
  const bannerStyles = {
    overflow: "hidden",
    objectFit: "cover",
  }
  return (
    <MovieListWrapper className="container px-2">
      {Object.keys(prismic).map(key => {
        const image = getImage(
          prismic[key].node.data.movie_banner.gatsbyImageData
        )
        return (
          <Link key={key} to={`/details/${prismic[key].node.data.movie_title.text}`} >
            <MovieItemWrapper>
              <MovieImageWrapper>
                <GatsbyImage
                  image={image}
                  formats={["auto", "webp", "avif"]}
                  alt={"image"}
                  style={bannerStyles}
                />
              </MovieImageWrapper>
              <MovieItemHeading>
                {prismic[key].node.data.movie_title.text}
              </MovieItemHeading>
              <div>
                <MovieItemInfo releaseDate>
                  {prismic[key].node.data.movie_release_date1.slice(0, 4)}
                </MovieItemInfo>
                <MovieItemInfo genre>
                  {prismic[key].node.data.movie_genre.text}
                </MovieItemInfo>
                <MovieItemInfo rating>
                  {"Rating: " + prismic[key].node.data.movie_rating}
                </MovieItemInfo>
              </div>
              <MovieItemInfo description>
                {prismic[key].node.data.movie_description.text}
              </MovieItemInfo>
            </MovieItemWrapper>
          </Link>
        )
      })}
    </MovieListWrapper>
  )
}
