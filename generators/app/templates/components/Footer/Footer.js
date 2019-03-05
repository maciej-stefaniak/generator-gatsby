import React from 'react'

import { content } from './../../content';

import './styles.scss'

const Footer = () => {
    const { text } = content.Footer;
    const year = new Date().getFullYear();

    return (
        <footer className="Footer">
            &copy; {year} {text}
        </footer>)
}

export default Footer;