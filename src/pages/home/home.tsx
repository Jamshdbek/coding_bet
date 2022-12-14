import React from "react";
import classes from "./home.module.scss";
import Coding from "./img/Coding.png";
import Bat from "./img/BAT.png";
import Pagination from "@mui/material/Pagination";
import http from "../../service";
import LanguageLine from "./languageline";
import stars from "./img/stars.png";
import star from "./img/star.png";
import { LanguageType, SectionType } from "../interface/types";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "react-redux";
import { log } from "console";
import Section from "./languageline";

import Skeleton from "@mui/material/Skeleton";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigation = useNavigate();
  const [section, setSection] = React.useState<SectionType[]>([]);
  const [language, setLanguae] = React.useState<LanguageType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [sectionLoading, setSectionLoading] = React.useState<boolean>(true);

  const { languageID } = useParams<{ languageID: string }>();
  console.log(languageID);
  //logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigation("/");
  };

  // get section id
  const getSectionId = (id: number) => {
    console.log(id);
    navigation(`/${id}`);
  };
  // sectins

  // enter to language
  React.useEffect(() => {
    http.get("/language/list-for-users").then(({ data }) => {
      console.log("data", data);
      setLanguae(data.data);
      setLoading(false);
      console.log("test", data.data[0].id);
      if (!languageID) navigation(`/${data.data[0].id}`);
    });
  }, []);
  // get section data
  React.useEffect(() => {
    console.log(languageID);
    http.get(`/section/by-language-id/${languageID}`).then(({ data }) => {
      console.log("section", data.data);
      setSection(data.data);
      setSectionLoading(false);
    });
  }, [languageID]);

  return (
    <div className={classes.wrapper}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          <div className={classes.icon}>
            <img src={Coding} alt="CODING" />{" "}
            <span>
              <img src={Bat} alt="BAT" />
            </span>
            <h6 className={classes.smile}>code practice</h6>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={classes.navlink}>About</li>
            <li className={classes.navlink}>Help</li>
            <li className={classes.navlink}>Code</li>
            <li className={classes.navlink}>help+videos</li>

            <li className={classes.navlink}>Done</li>
            <li className={classes.navlink}>Prefs</li>
          </ul>
          <div className={classes.buttons}>
            <button onClick={() => navigation("/")} className={classes.singin}>
              Sing In
            </button>
            <button onClick={handleLogout} className={classes.singup}>
              LogOut
            </button>
          </div>
        </div>
      </nav>
      {/* Language line */}
      <div className={classes.line}>
        <div className={classes.language}>
          {loading ? (
            <div className={classes.loading}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          ) : (
            language.map((value) => {
              return (
                <div
                  key={value.id}
                  style={
                    value.id.toString() === languageID
                      ? { borderBottom: "solid 2px #2DB97C" }
                      : {}
                  }
                  onClick={() => navigation(`/${value.id}`)}
                >
                  <img
                    src={`https://img.icons8.com/color/344/${value.title}--v1.png`}
                    alt="404"
                  />
                  <span className={classes.text}>{value.title}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Sections */}
      <div className={classes.cards}>
        {sectionLoading ? (
          <div className={classes.loading_list}>
            <Skeleton variant="rectangular" width={250} height={150} />
            <Skeleton variant="rounded" width={250} height={150} />
            <Skeleton variant="rounded" width={250} height={150} />
            <Skeleton variant="rounded" width={250} height={150} />
            <Skeleton variant="rectangular" width={250} height={150} />
            <Skeleton variant="rounded" width={250} height={150} />
            <Skeleton variant="rounded" width={250} height={150} />
            <Skeleton variant="rounded" width={250} height={150} />
            <Skeleton variant="rectangular" width={250} height={150} />
          </div>
        ) : (
          section.map((item) => {
            return (
              <div
                key={item.id}
                className={classes.card}
                onClick={() => navigation(`/section/${item.id}`)}
              >
                <h1 className={classes.text}>{item.title}</h1>
                <div className={classes.star}>
                  {[...Array(item.methodSignature)].map((x) => (
                    <span>
                      <img src={stars} alt="" />
                    </span>
                  ))}

                  <span>
                    <img src={star} alt="" />
                  </span>
                </div>
                <div className={classes.title}>{item.description}</div>

                <h3 className={classes.result}>
                  <span>
                    <img src="" alt="" />
                  </span>{" "}
                  Task
                </h3>
              </div>
            );
          })
        )}
      </div>

      <Pagination
        count={2}
        variant="outlined"
        shape="rounded"
        className={classes.pagination}
      />
      <div className={classes.container_footer}>
        <div className={classes.box}>
          <h2 className={classes.box_name}>Java Help</h2>
          <div className={classes.box_link}>
            <p>Java Example Solution Code</p>
            <p>Java String Introduction (video)</p>
            <p>Java Substring v2 (video)</p>
            <p>Java String Equals and Loops</p>
            <p>Java String indexOf and Parsing</p>
            <p>Java If and Boolean Logic</p>
            <p>If Boolean Logic Example Solution Code 1-(video)</p>
            <p>If Boolean Logic Example Solution Code 2-(video)</p>
            <p>Java For and While Loops</p>
            <p>Java Arrays and Loops</p>
            <p>Java Map Introduction</p>
            <p>Java Map WordCount</p>
            <p>Java Functional Mapping</p>
            <p>Java Functional Filtering</p>
          </div>
        </div>
        <div className={classes.box}>
          <h2 className={classes.box_name}>Misc Code Practice</h2>
          <div className={classes.box_link}>
            <p>Code Badges</p>
            <p>Introduction to Mod (video)</p>
            <p>MakeBricks problem and solution (video x 2)</p>
            <p>FizzBuzz the famous code interview question(video)</p>
          </div>
        </div>
      </div>

      <h3 className={classes.button_title}>
        {/* Copyright Nick Parlante 2017 - privacy */}
      </h3>
    </div>
  );
};

export default Home;

/* <div
            className={`${!select && classes.border}`}
            onClick={() => setSelect(false)}
          >
            <img
              src="https://img.icons8.com/color/344/javascript-coffee-cup-logo--v1.png"
              alt="404"
            />
            <span className={classes.text}>Java</span>{" "}
          </div> */

//ss
/* {select
          ? python.map((item, index) => {
              return (
                <Question
                  name={item.name}
                  title={item.title}
                  key={index}
                  id={index}
                />
              );
            })
          : java.map((item, index) => {
              return (
                <Question
                  name={item.name}
                  title={item.title}
                  key={index}
                  id={index}
                />
              );
            })} */
