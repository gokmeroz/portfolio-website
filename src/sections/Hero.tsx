function Divider() {
  return <div className="hr-soft" />;
}

export default function Hero() {
  return (
    <section className="pt-28 container-mx">
      {/* Eyebrow */}
      <p className="font-mono text-sm text-[color:var(--color-accent-2)]">
        Hi, my name is
      </p>

      {/* Name */}
      <h1 className="mt-3 text-5xl md:text-7xl font-extrabold tracking-tight text-[color:var(--color-text-base)]">
        Göktuğ Mert Özdoğan.
      </h1>

      {/* Tagline */}
      <h2 className="mt-2 text-4xl md:text-6xl font-extrabold text-[color:var(--color-text-muted)]">
        I build things.
      </h2>

      {/* Short intro (keep hero tight; full bio lives in About) */}
      <p className="mt-6 max-w-2xl text-[color:var(--color-text-base)]">
        I’m a software engineer focused on backend-leaning full-stack work,
        data-driven features, and finance tech. I care about clean, accessible
        digital experiences that actually ship and scale.
      </p>

      {/* Actions */}
      {/* <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="btn-accent">
          Check out my work
        </a> */}
      {/* <a
          href="#about"
          className="inline-flex items-center justify-center font-semibold rounded-2xl px-5 py-3 transition border"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-accent)",
          }}
        >
          Read my full bio
        </a> */}
      {/* </div> */}

      {/* Optional: inline expandable bio (keeps hero clean by default) */}
      {/* <details className="mt-8 max-w-3xl card">
        <summary className="cursor-pointer font-semibold">
          Long version (about me)
        </summary> */}
      <div className="mt-4 space-y-4">
        <p className="mt-3 max-w-3xl">
          {" "}
          {/* Hey, I’m Göktuğ Mert Özdoğan, but most people just call me Mert.*/}{" "}
          I’m a software engineer from Istanbul, born and raised with a curious
          mind and a bit of an obsession for building things that actually work.
          I’m the kind of guy who can lose hours debugging a line of code, but
          also forget to eat because I’m too focused on perfecting the UI or the
          backend logic. It’s not always healthy — but it’s definitely who I am.
          I’ve always been drawn to technology and problem-solving — not because
          of some big career plan, but because creating something out of nothing
          feels almost magical. Over the years, I’ve found my comfort zone
          somewhere between backend engineering and AI, mostly working with
          Node.js, C#/.NET, and Python. I love the feeling of designing a
          system, testing its limits, and seeing it actually handle real-world
          data. Outside of coding though, I’m a pretty layered person. I like
          comics and drawing caricatures. Moreover, I’m big on sports — I follow
          football religiously (yes, I’m a die-hard Fenerbahçe fan through and
          through), and I’ve got a soft spot for combat sports like boxing, bjj
          and MMA. I hit the gym regularly, not because I’m chasing aesthetics,
          but because it’s one of the few times my brain shuts off from code and
          just focuses on movement and rhythm. I’m also super into finance and
          investing — it started out as curiosity during high school, but now
          it’s one of my daily hobbies. I track crypto markets, U.S. stocks, and
          sometimes play around with short-term trades just to understand the
          psychology behind it all. I’ve even built a personal finance app
          (because of course I did) called Nummoria, where I can visualize my
          income, expenses, and investments with clean UI and smart analytics.
          When I’m not at my desk or the gym, I enjoy diving into completely
          random interests — one week it’s learning about urban design and
          architecture, the next it’s reading about behavioral economics or
          studying German grammar because why not make life harder for myself. I
          love learning languages too; I speak English fluently, German at a
          solid level, and I’m always playing around with phrases from other
          languages I pick up online. Music-wise, my playlists are all over the
          place — one moment I’m listening to chill german rap or Turkish folks
          musics, the next it’s 2000s hip-hop or film soundtracks while I code.
          And yes, I do have a habit of looping the same track for hours if it
          fits the mood of my current project. On weekends, I try to keep things
          simple — long walks, night drives through the city, maybe a coffee
          somewhere quiet where I can just think or sketch ideas. I’m not really
          a big party person; I value a few deep conversations over a hundred
          small ones. People say I come off as a bit cold at first, but once I
          open up, I’m the type to remember every detail about what someone told
          me months ago. At my core, I’m someone who believes in balance —
          between ambition and peace, between tech and art, between logic and
          emotion. I don’t like rushing things that matter. Whether it’s a
          relationship, a career move, or a side project, I’d rather take my
          time and make it mine.{" "}
        </p>
        <h3>Code. Build. Invest. Repeat. </h3>
      </div>
      <Divider />
      {/* </details> */}
    </section>
  );
}
