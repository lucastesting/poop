/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

import Link from "../components/Link"
// import glob from "glob"
// import fs from 'fs';

const BlogLink = (props) => {
  return (
    <p>
      <a onClick={Link.handleClick} href={`/blog/${props.page}`}>{props.children}</a>
    </p>
  )
}

export default class extends Component {

  blogPages = []

  render() {
    return (
      <div>
        <h1>Blog</h1>
        <p>Coming soon.</p>
         {
           this.blogPages.map(({page, title}, index) => {
             return (
               <BlogLink key={index} page={page}>{title}</BlogLink>
             )
           })
         }
      </div>
    );
  }

}
