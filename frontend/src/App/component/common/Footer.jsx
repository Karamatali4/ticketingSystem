import React from 'react'
import { FaFacebook, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTheme } from '../../../context/theme.context';
import { Layout, Button, Row, Col, Card, Form, Input } from "antd";

const Footer = () => {
    const { theme } = useTheme()
  return (
    <div>
      <footer
        style={{
          background: `linear-gradient(to right, #342945, ${theme.primary})`,
        }}
        className="text-center text-white">
        <section className="py-3">
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button">
                <FaFacebook />
              </a>
            </Col>
            <Col>
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button">
                <FaTwitter />
              </a>
            </Col>
            <Col>
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#dd4b39" }}
                href="#!"
                role="button">
                <FaGoogle />
              </a>
            </Col>
            <Col>
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#ac2bac" }}
                href="#!"
                role="button">
                <FaInstagram />
              </a>
            </Col>
            <Col>
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#0082ca" }}
                href="https://www.linkedin.com/in/karamat-ali-09072a207/"
                role="button">
                <FaLinkedin />
              </a>
            </Col>
            <Col>
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#333333" }}
                href="https://github.com/Karamatali4"
                role="button">
                <FaGithub />
              </a>
            </Col>
          </Row>
        </section>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2024 Copyright :
          <a className="text-white mx-2" href="#!">
            Karamat Ali
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;