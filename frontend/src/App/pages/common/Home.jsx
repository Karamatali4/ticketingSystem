import React from "react";
import { Layout, Button, Row, Col, Card, Form, Input } from "antd";
import "../../../assets/layout.css"; 
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { paths } from "../../../helpers/paths";
import "./app.css";
import Icon from "../../../assets/icon.png";
import HeroImg from "../../../assets/hero.gif";
import Creator from "../../../assets/karamat.png";
import AboutIcon from "../../../assets/about.gif";
import { useAuth } from "../../../context/auth.context";
import { _useAuth } from "../../../action/_useAuth";
import { MdDashboard } from "react-icons/md";
import { useTheme } from "../../../context/theme.context";
import Footer from "../../component/common/Footer";
const { Content } = Layout;

const ConditionalComponent = ({ role }) => {
  const { theme } = useTheme();
  const { handleLogout } = _useAuth();
  
  return (
    <div className="d-flex align-items-center gap-2 text-decoration-none text-dark">
      <Link
        style={{ color: theme.primary, cursor: 'pointer' , }}
        to={`/${role}`}
        className="d-flex align-items-center gap-2 text-decoration-none ">
        <MdDashboard className="fs-3" />
        <span className="text-capitalize fs-4"> {role} Dashbaord </span>
      </Link>

      <div
        style={{ backgroundColor: theme.primary }}
        role="button"
        onClick={handleLogout}
        className="d-flex align-items-center gap-2 btn text-white rounded-4 fs-6">
        <BiLogOut />
        <span> logout</span>
      </div>
    </div>
  );
};

const team = [
  {
    name: "Project by",
    role: "Hadi e Learning",
    img: "https://media.licdn.com/dms/image/D4E0BAQH-VAoeRaZHVg/company-logo_200_200/0/1682588411670?e=2147483647&v=beta&t=2wgptCvj_rXignIYPYn5JCBlYa3_jpZaMRh06FeVaOg",
  },
  { name: "Karamat Ali", role: "Creator Student", img: Creator },
  {
    name: "Hadi Raza",
    role: "Teacher",
    img: "https://avatars.githubusercontent.com/u/84139061?v=4",
  },
];

const services = [
  {
    title: "Ticket Management",
    description:
      "Efficiently open, submit, and reopen tickets with our comprehensive management features.",
  },
  {
    title: "Role-Based Access",
    description:
      "Control access permissions with role-based user, ensuring secure and organized ticket handling.",
    },
  {
    title: "User Profiles",
    description:
    "Manage user information and track ticket history with detailed user profiles.",
  },
  {
    title: "Role-Based Dashboard",
    description:
    "Admin role-based dashboard Agent dashboard , Client Dashboard and Ticket Manager",
  },
  {
    title: "Analytics & Reporting",
    description:
    "Generate insightful reports and analytics to monitor performance and improve your support operations.",
  },
  {
    title: "Integration Capabilities",
    description:
      "Seamlessly integrate with other tools and platforms to enhance your ticketing system's functionality.",
    },
];

const Home = () => {
  const [auth] = useAuth();
  const { theme } = useTheme();
  
  const role = auth?.user?.role;
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <img src={Icon} className="icon rounded-2 navbar-brand" />
          <div>
            {auth?.token ? (
              <ConditionalComponent role={role} />
            ) : (
              <Link
                style={{color: theme.primary }}
                className="btn rounded-2 border fs-4"
                to={paths.login}>
                <BiLogIn className="fs-2" />{" "}
                {auth?.token && <ConditionalComponent role={role} />}
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div
        style={{
          backgroundColor: "#fff",
          boxSizing: "border-box",
          overflow: "initial",
          padding: "10px 100px 10px 100px",
        }}>
        <Content>
          <div className="hero"
           data-aos="fade-zoom-in" data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600" >
          
            <Row align="middle" justify="center">
              <Col span={12}>
                <h1>
                  {" "}
                  <span style={{ color: theme.primary }}> Ticket </span>{" "}
                  Management <span style={{ color: theme.primary }}>App </span>
                </h1>
                <h3>
                  Effortlessly track, manage, and resolve customer tickets with
                  our powerful and intuitive ticket system app. Enhance your
                  support team's efficiency and boost customer satisfaction
                </h3>
                {auth.token ? (
                  <Button
                    style={{
                      background: `linear-gradient(to right, #342945, ${theme.primary})`,
                    }}
                    size="large"
                    className="w-50 px-2 m-2 text-white">
                    Show More
                  </Button>
                ) : (
                  <NavLink to={paths.signup}>
                    <Button
                      style={{
                        background: `linear-gradient(to right, #342945, ${theme.primary})`,
                      }}
                      size="large"
                      className="text-white w-50 px-2 m-2">
                      Get started
                    </Button>
                  </NavLink>
                )}
              </Col>
              <Col span={12}>
                <img src={HeroImg} alt="Hero" />
              </Col>
            </Row>
          </div>

          <div className="services" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            <h2>Key Features of Ticketing System</h2>
            <Row gutter={16} justify="center">
              {services.map((service) => (
                <Col className="mb-4" span={8} key={service.title}>
                  <Card style={{ backgroundColor: "#fcfcfc" }} hoverable>
                    <Card.Meta
                      title={
                        <p style={{ color: theme.primary }}>{service.title}</p>
                      }
                      description={
                        <p className="text-dark m-0">{service.description}</p>
                      }
                    />
                    <Button
                      className="w-50 text-white"
                      style={{
                        background: `linear-gradient(to right, #342945, ${theme.primary})`,
                      }}>
                      Show More
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="about-us" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">
            <h2>About the Team Project</h2>
            <Row gutter={16} justify="center">
              {team.map((member) => (
                <Col span={6} key={member.name}>
                  <Card
                    hoverable
                    cover={<img alt={member.name} src={member.img} />}>
                    <Card.Meta title={member.name} description={member.role} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <section className="py-3 py-md-5 fs-0"  data-aos="fade-zoom-in" data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600">
            <div className="container">
              <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                <div className="col-12 col-lg-6 col-xl-5">
                  <img
                    className="img-fluid rounded about-icon"
                    loading="lazy"
                    src={AboutIcon}
                    alt="Png"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xl-7">
                  <div className="row justify-content-xl-center">
                    <div className="col-12 col-xl-11">
                      <h2 className="mb-3">Who Are We?</h2>
                      <p className="lead fs-4 text-secondary mb-3">
                        We specialize in delivering efficient and user-friendly
                        ticket management solutions
                      </p>
                      <p className="mb-5">
                        Our team is dedicated to providing top-notch service,
                        leveraging the latest technologies to create robust and
                        scalable ticketing systems
                      </p>
                      <div className="row gy-4 gy-md-0 gx-xxl-5X ">
                        <div className="col-12 col-md-6">
                          <div className="d-flex">
                            <div className="me-4 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={32}
                                height={32}
                                fill="currentColor"
                                className="bi bi-gear-fill"
                                viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />{" "}
                              </svg>
                            </div>
                            <div>
                              <h2 className="h4 mb-3">
                                Versatile Ticketing Solution
                              </h2>
                              <p className="text-secondary mb-0">
                                Our comprehensive ticket management system
                                adapts to the unique needs of various
                                industries,
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="d-flex">
                            <div className="me-4 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={32}
                                height={32}
                                fill="currentColor"
                                className="bi bi-fire"
                                viewBox="0 0 16 16">
                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />{" "}
                              </svg>
                            </div>
                            <div>
                              <h2 className="h4 mb-3">
                                Efficient Ticketing System
                              </h2>
                              <p className="text-secondary mb-0">
                                We believe in innovation by combining simplicity
                                with comprehensive features,
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Content>
      </div>
      <Footer />
    </>
  );
};

export default Home;
