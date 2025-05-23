import { labradoodle } from "../assets";

const About = () => {
    return (
        <>
            <div className="py-2">
                <h1 className="font-bold text-base md:text-lg">Hi There!</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="md:mr-5">
                        <p className="py-2">
                            I&apos;m Jasper, a second year student at UQ studying a bachelor of Engineering and Mathematics,
                            hoping to specialise in Software Engineering and major in statistics.
                        </p>
                        <br />
                        <p className="py-2">
                            My current areas of interest are in the overlap of mathematical modelling and computer programming,
                            or data science. I love how much practicality it has in such a wide variety of problem areas. With my
                            strong points being statistics (with a particular interest in copulas) and python for data science.
                        </p>
                        <p className="py-2 p">
                            Within python I have made a variety of projects with a variety of data-sciencey libraries, such as: numpy, pandas, matplotlib, pytorch, pillow, opencv, beautiful-soup, etc.

                        </p>
                        <p className="pb-2 pt-0">
                            Outside of python I have good experience with javascript (hopefully indicated by this website), and some experience with java, C  R, and matlab, and experience with SQL for relational databases.

                        </p>
                        <div className="py-2">
                            I chose to undertake this project to 1. improve my javascript/react/git knowledge, and 2. to create a unique (at least I hope)
                            website to showcase my interests (of which you can read some of my more formalised projects using <span className="terminal-highlight">&quot;ls&quot;</span> and <span className="terminal-highlight">&quot;read [filename]&quot;</span>)
                            and skills in a memorable way. As someone whos favourite thing isn&apos;t frontend design, I naturally spent too much time formatting the frontend to look like a backend.
                        </div>
                    </div>
                    <div id="portrait" className="md:w-[2000px]" //className="w-[340px] mt-5 md:mt-0 mb-5 md:mb-0 md:mr-10 md:w-[2000px]"
                    >
                        <label> Sesame and Nutmeg placeholder
                            <img className="image" src={labradoodle} alt="labradoodle" />
                        </label>
                    </div>
                </div>
                <br />
                <p className="py-2">
                    Currently, I am enjoying learning more ahout AI frameworks (RAG, Langchain, etc.) and web development as a full stack developer at a cybersecurity startup,
                    and improving my knowledge of financials as Treasurer of the UQ Mathematics Student Society (UQ MSS).
                </p>
                <p className="py-2">
                    In my free time I enjoy photography, digital art, bushwalking, reading, and losing at competitive video games
                    (and playing with my dogs).
                </p>
                <br />

                <div className="py-4">
                    If anyone has any suggestions for this site (or anything else) I would be very happy to hear it, and for any reason at all,
                    I would love to connect with you on linkedin (e.g. <span className="terminal-highlight">&quot;linkedin&quot;</span>) or otherwise to have a chat. Thanks for reading all of this!
                </div>

                <div className="pt-3 text-sm">*P.S. you can use <span className="terminal-highlight">&quot;help&quot;</span> to see a list of commands (not including some Easter eggs!).</div>
            </div>
        </>
    );
}

export default About;