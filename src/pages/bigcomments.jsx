const BigComments = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1>Big Comments</h1>
        I&apos;m sure you&apos;re wondering what &quot;Big Comments&quot; means.
        Well, in my infinite naming creativity, this writeup is about a vscode
        extension I made to create larger, &quot;header&quot; comments to make
        specific comments stand out.
      </div>
      <div>
        This was never something I planned to make, but after a long session of
        formatting my resume (in typst) and not being able to quickly scan for
        what each &quot;section&quot; was doing, I realised something was
        missing. My code was already well commented and used different comment
        colours to differentiate more important ones, but I was still seeking a
        way to create &quot;header&quot; comments for my own readability,
        similar to how you would want bigger header text to seperate sections in
        a text document.
      </div>
      <div>
        Following the law of programming (don&apos;t reinvent the wheel), I had
        a look through existing vscode extensions and found some interesting
        solutions. I found a range of existing extensions; varied colours, huge
        text using ascii (like the top of this site), but none that fit my exact
        desired use case - a way to differentiate specific comments, but not
        interrupt the flow of the document (like huge text would), and to still
        use standard keyboard characters (as I feel that is just nicer).
      </div>
      <div>
        So I thought about some possible ways to accent comments, and the one
        that stood out to be in my text editor testing was simply putting boxes
        around everything:
      </div>
      <div className="flex flex-col gap-4">
        <div>{`// From this`}</div>
        <div className="flex md:flex-row md:gap-6 flex-col gap-2">
          <pre>{`// ===========\n// = To this =\n// ===========`}</pre>
          <pre>{`// ###########\n// # Or this #\n// ###########`}</pre>
          <pre>{`//? @@@@@@@@@@@@@@@@@@@@@@@@@\n//? @                       @\n//? @     Or even this!     @\n//? @                       @\n//? @@@@@@@@@@@@@@@@@@@@@@@@@`}</pre>
          <pre>
            {`/* ¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾\n   ¾ I'm sure you get the idea ¾\n   ¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾¾ */`}
          </pre>
        </div>
      </div>
      <div>
        I thought this to be better then some other things like lines as I found
        that horizontal lines didn&apos;t work so well with indented code, as I
        found the horizontal lines to be distracting when I was trying to read
        things in other indent levels.
      </div>
      <div className="flex flex-col gap-2">
        For it to be useful to me it had to meet three main criteria:
        <ol className="list-decimal list-inside space-y-1">
          <li>It had to be super quick to use</li>
          <li>It had to be customizable</li>
          <li>It had to be simple to understand for other people</li>
        </ol>
        While the first two are pretty obvious, the third was important to me
        for two reasons: 1. When other people are reading my code, I don&apos;t
        want them to dwell on &quot;what is this strange formatting&quot;, and
        2. I want someone of any skill level to be able to have this improve
        their coding experience.
      </div>
      <div className="flex flex-col gap-2">
        I believe (and hope) my solution meets all three as:
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Quick: In 10 seconds you can setup a keybind which then instantly
            wraps the line under your cursor in a box each time it is pressed
            (adapting to whitespace, existing comment symbols, different
            languages, and preserving indent levels).
          </li>
          <li>
            Customizable: You can choose between two box sizes, and choose any
            ascii character for a both the box and for the comment decorator
            (commonly used by other extensions to colour comments)
          </li>
          <li>
            Simple: The concept is very easy to understand, and I did my best to
            make the documentation in depth.
          </li>
        </ol>
      </div>
      <div>
        Thanks so much for reading so far, I&apos;m not going to go in depth
        into all the features and how everything works as I did my best to make
        the readme as explanatory as possible, If you want to check it out you
        can do so{" "}
        <a
          className="link"
          href="https://marketplace.visualstudio.com/items?itemName=jasperchongcode.bigcomments"
          target="_blank"
        >
          here
        </a>
        . Thanks again!
      </div>
    </div>
  );
};

export default BigComments;
