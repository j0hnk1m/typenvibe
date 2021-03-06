import React from 'react';
import Layout from 'components/layout/Layout';
import lineChange1 from 'static/line_change_1.gif'
import lineChange2 from 'static/line_change_2.gif'

const About = () => (
  <>
    <Layout title="about">
      <div className="flex-col justify-between w-full text-inverse">
        {/* Overview */}
        <div className="flex-col border-2 rounded-lg border-primary p-2 mb-6 items-end">
          <p className="text-center text-display text-2xl font-bold mb-4">
            Overview
          </p>
          <div className="mb-3">
            <p className="text-left">
              typenvibe is a site where you can practice 
              typing in rythm to your favorite songs. The site 
              is currently still under development, so we'd 
              love your feedback! Let us know what you think 
              <a className="underline px-2" href="https://docs.google.com/forms/d/e/1FAIpQLScSF3rbz6QHUwwMll1AbwFXiBHKaB0aPCQFufgxq_6YNlq2Yg/viewform?usp=sf_link">here</a>
            </p>
          </div>
          <div className="mb-4">
            <span className="inline">
              If you guys would like to support the development 
              of future projects or simply appreciate what we 
              built, you can donate here:
            </span>
            <a className="flex justify-center my-3" href="https://www.buymeacoffee.com/typenvibe">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-12" />
            </a>
          </div>
          <div className="mt-4">
            <p className="inline">source code:</p>
            <a className="underline px-2 inline" href="https://github.com/j0hnk1m/typenvibe">github</a>
          </div>
        </div>

        {/* User Guide */}
        <div className="flex-col border-2 rounded-lg border-primary p-2 items-end">
          <p className="text-center text-display text-2xl font-bold pb-3">
            User Guide
          </p>

          {/* SECTION 1 - Objective */}
          <p className="text-left text-display text-lg underline">
            Objective
          </p>
          <span className="text-left mt-2 mr-2">
            The objective of the game is to type the lyrics in 
            rythm to the song. The line that you can type will 
          </span>
          <span className="font-bold">automatically change</span>
          <span className="ml-2">
            in accordance to the timing of the song (unless you 
            are in "chill" mode, which you can configure in 
            settings).
          </span>

          {/* SECTION 2 - Get Started */}
          <p className="text-left text-display text-lg underline mt-5">
            Get Started
          </p>
          <p className="text-left mt-2 mr-2">
            1) Choose music service (available: Spotify, coming 
            soon: Youtube, Apple Music, SoundCloud), to use.
          </p>
          <p className="text-left mt-2 mr-2">
            2) After being authorized, select choice from the 
            list of songs.
          </p>
          <p className="text-left mt-2 mr-2">
            3) Click the typing input box. Now, just type any 
            key to start the song! You will only be allowed 
            to type when the artist is on the same timeframe, 
            meaning that input is disabled well before and 
            after the artist has sung that line. Note: starting 
            the song by clicking the play button will mess up 
            the sync between the audio and lyrics!
          </p>

          {/* SECTION 3 - Line Change */}
          <p className="text-left text-display text-lg mt-5 underline">
            What happens on a line change?
          </p>
          <p className="text-left pt-2">
            If the line changes while you are typing, never fear, 
            you have the option to type either:
          </p>
          <img src={lineChange1} className="w-3/4 mx-auto" alt="prev word" />
          <p className="text-center pb-10">
            1) the word you were going to type before
          </p>

          <img src={lineChange2} className="w-3/4 mx-auto" alt="current word" />
          <p className="text-center pb-5">... or 2) the new word</p>
          <p className="pb-4">
            Notice above that the accuracy stays at 100% in both 
            cases. In case you still type wrong, something 
            called the Levenshtein distance is computed for 
            both possibilities in order to determine what you 
            were trying to type.
          </p>

          {/* SECTION 4 - Chill mode */}
          <p className="text-left text-display text-lg underline mt-5">
            "Chill" mode
          </p>
          <p className="text-left mt-2 mr-2">
            If you don't want to feel the pressure of typing 
            the lyrics in a time crunch, that's perfectly fine! 
            Enabling chill mode gives the freedom of when you 
            can type back to you, and the lyrics will not 
            automatically change. 
          </p>

          {/* SECTION 5 - License/Copyright */}
          <p className="text-left text-display text-lg underline mt-5">
            License/Copyright
          </p>
          <p className="text-left mt-2 mr-2">
            Our code is open-source and under the MIT License. 
            As for music licensing, Spotify takes care of it.
          </p>

          {/* SECTION 5 - etc */}
          <p className="text-display text-lg mt-5 underline">
            etc
          </p>
          <span className="text-center">
            More details can be found on our github
          </span>
          <a className="underline pl-2 inline" href="https://github.com/j0hnk1m/typenvibe">README</a>
          <span>.</span>
          <p className="pt-4 text-center">Now type n vibe away!</p>
        </div>
      </div>
    </Layout>
  </>
);

export default About;
