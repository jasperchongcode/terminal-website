import { labradoodle, julia_fractal } from "../assets";

const About = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-base md:text-lg">Hi There!</h1>
              I&apos;m Jasper, a second year student at studying a bachelor of
              engineering and mathematics, with a focus on software and
              statistics.
            </div>
            <div>
              My primary area of interest is in the overlap of mathematical
              modelling and computer programming, broadly encapsulating various
              data science and AI related fields. I really love how much much
              impact this field can have in such a wide range of problem areas.
              It is an amazing feeling to see a system you built be used for
              real world impact.
            </div>

            <div>
              At this stage I think my dream job would be somewhere in either AI
              research (like deepmind), or in the space sector, but I think I
              would be happy with anything involving developing systems to
              improve the world (though I&apos;m sure this applies to almost
              everyone).
            </div>
            <div>
              In my free time I enjoy programming, photography, bushwalking,
              reading, and losing at video games!
            </div>
          </div>
          <div
            id="portrait"
            className="md:w-[2000px]" //className="w-[340px] mt-5 md:mt-0 mb-5 md:mb-0 md:mr-10 md:w-[2000px]"
          >
            <label>
              Sesame and Nutmeg placeholder
              <img className="image" src={labradoodle} alt="labradoodle" />
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div
            id="portrait"
            className="md:w-[2000px]" //className="w-[340px] mt-5 md:mt-0 mb-5 md:mb-0 md:mr-10 md:w-[2000px]"
          >
            <label>
              The Julia Fractal: Rendered by me in C
              <img className="image" src={julia_fractal} alt="Fractal image" />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-base md:text-lg">Experience</h1>I am
              very fortunate to have recieved a scholarship with access to the
              Liveris Academy, which has been immensely beneficial for my
              non-content learning. I have been lucky enough to have a part time
              position (mostly) developing AI systems where I can see the real
              impact of all the code I write, as well as having an incredible
              team around me. I&apos;ve also learnt lots from my position as
              Treasurer of the UQ Mathematics Student Society, as well as
              various other club and competition involvements.
            </div>
            <div>
              In terms of programming languages I have spent the most time in
              Python, but am quite familiar with Javascript/Typescript
              (hopefully indicated by this website!), and am working on
              improving my knowledge of other languages like C and Java.
            </div>

            <div>
              If you are interested to see some of the things I have built, I
              would love if you could checkout some of my writeups using{" "}
              <span className="terminal-highlight">ls</span> and{" "}
              <span className="terminal-highlight">read [filename]</span>. These
              cover a range of different types of projects, from implementing
              academic trading models to changing desktop backgrounds to display
              the time (through book quotes) to using AI to improve my drawings.
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-base md:text-lg">Advice</h1>A piece of
          advice I got that really shaped my degree choice was to consider what
          I &quot;lose track of time doing&quot;, and while this of course
          doesn&apos;t apply to all things I lose track of time doing (like
          reading), it definitely brought to mind coding and math.
        </div>
        <div>
          A second piece of advice I tend to give to people is to show up to
          lectures in person. I understand the criticism that a lot of people
          have that they could just watch it back on 2x speed and &quot;save
          time&quot;, but I think there really is something to be said for the
          difference between the speed you can listen and the speed you can
          actually absorb and process information. Additionally, it is more of a
          benefit then you may realise to have teaching staff know you, they are
          very likely to be experts in the field you want to work in! A final
          (subjective) piece is that the people you meet in lectures are
          generally the most switched on.
        </div>
        <div>
          Put your hand up for things! I&apos;m sure you&apos;ve heard this many
          many times by now, but I couldn&apos;t tell you the amount of times
          I&apos;ve heard older students say they wish they got involved in
          Clubs, leadership events, etc. sooner. Its very rare I get involved
          with something and think I fully regret doing that, even if you
          don&apos;t like it I feel it teaches you something valuable about
          yourself.
        </div>
        <div>
          Prioritise understanding before grades, if you understand the content
          well enough to teach someone, you will have no problems getting
          exceptional grades. Don&apos;t fall into the trap of last minute study
          if you can avoid it, you can achieve twice the understanding in half
          the time with well spaced study.
        </div>

        <div>
          If anyone has any suggestions for this site (or anything else) I would
          be very happy to hear it, and for any reason at all, I would love to
          connect with you on linkedin (e.g.{" "}
          <span className="terminal-highlight">&quot;linkedin&quot;</span>) or
          otherwise to have a chat. Thanks for reading all of this!
        </div>
      </div>
    </>
  );
};

export default About;
