import classes from "./About.module.css";
// import axios from "axios";
import img1 from "../assets/images/1222.jpg";
import Acl11 from "../assets/images/Acl11.jpg";
import img3 from "../assets/images/_0188.jpg";
import Matan3 from "../assets/images/Matan3.JPG";

export default function About() {
  return (
    <div>
      <h1>About Matan </h1>
      <div className={classes.aboutText}>
        <img alt="img3" src={img3} height="400" cl />
        <p className={classes.aboutTextP}>
          Matan Ben Zahav is a versatile musician, composer, and
          multi-instrumentalist hailing from Israel. With a passion for creating
          captivating melodies and harmonies, Matan has established himself as a
          prominent figure in the world of music. His expertise spans across
          various genres, including classical, theatre, film music, and pop
          songs. As a music producer, Matan brings his unique vision to life by
          crafting captivating soundscapes.
          <h3>Instrumentalist Extraordinaire:</h3> With a natural inclination
          for musical instruments, Matan showcases his immense talent on the
          piano, guitar, saxophone, clarinet, and flute. His command over these
          instruments allows him to infuse diverse musical elements into his
          compositions, resulting in an exquisite fusion of styles and sounds.
        </p>
      </div>
      <div className={classes.aboutText}>
        <p>
          <h3>Collaborations and Performances:</h3> Throughout his career, Matan
          has had the privilege of collaborating with renowned artists and bands
          such as Yishay Ribo, the Moshav Band, the Solomon Brothers, and Mark
          Eliyahoo. These collaborations have enriched his musical journey and
          have helped him evolve as a musician.
          <h3>Academic Background:</h3> Matan's dedication to his craft is
          further exemplified by his academic achievements. He holds a
          Bachelor's and Master's degree in Composition, as well as a Bachelor's
          degree in Education. These qualifications have provided him with a
          strong foundation in music theory, composition techniques, and
          pedagogy.
        </p>
        <img alt="img1" src={img1} width="500" height="300" />
      </div>
      <div className={classes.aboutText}>
        <img alt="Acl11 " src={Acl11} width="700" height="500" cl />
        <p>
          <h3>International Recognition:</h3> In 2019, Matan proudly represented
          Israel at the ASL Music Festival in Taipei, Taiwan. His remarkable
          piece of music was showcased on an international platform, captivating
          audiences with its emotive power and intricate composition.
          <h3>Musical Releases:</h3> Matan's extensive repertoire includes a
          piano music album and a self-produced instrumental album. These albums
          reflect his artistic vision and demonstrate his ability to create
          evocative and immersive musical experiences.
        </p>
      </div>
      {/* <img alt="Acl11 " src={ACL3} width="900" height="500" cl /> */}
      <div className={classes.aboutText}>
        <p>
          <h3> Web Development Expertise:</h3>
          Beyond his musical talents, Matan is also a skilled web Full Stack
          developer. He has personally built this website and app, showcasing
          his proficiency in both the realms of music and technology. Matan's
          ability to merge his musical creativity with technical expertise
          allows him to create innovative digital experiences for his audience.
        </p>
        <img alt="img1" src={Matan3} width="500" height="300" />
      </div>
    </div>
  );
}
