import React from 'react';
import Layout from 'components/layout/Layout';
import lineChange1 from 'static/line_change_mechanism_1.gif'
import lineChange2 from 'static/line_change_mechanism_2.gif'

const About = () => (
  <>
    <Layout title="about">
      <div className="flex-col justify-between w-full text-inverse">
        <div className="flex-col border-2 rounded-lg border-primary p-2 mb-6 items-end">
          <p className="text-center text-display text-2xl font-bold mb-4">Overview</p>
          <div className="mb-3">
            <p className="text-left">
              typenvibe is a site where you can practice typing in rythm to your favorite songs.
              The site is currently still under development, so we'd love your feedback!
              Let us know what you think
              <a className="underline px-2" href="https://docs.google.com/forms/d/e/1FAIpQLScSF3rbz6QHUwwMll1AbwFXiBHKaB0aPCQFufgxq_6YNlq2Yg/viewform?usp=sf_link">here</a>
            </p>
          </div>
          <div className="mb-4">
            <span className="inline">If you guys would like to support the development of future projects or simply appreciate what we built, you can donate here:</span>
            <a className="flex justify-center my-3" href="https://www.buymeacoffee.com/typenvibe">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-12" />
            </a>
          </div>
          <div className="mt-4">
            <p className="inline">source code:</p>
            <a className="underline px-2 inline" href="https://github.com/j0hnk1m/typenvibe">github</a>
          </div>
        </div>

        <div className="flex-col border-2 rounded-lg border-primary p-2 items-end">
          <p className="text-center text-display text-2xl font-bold pb-3">User Guide</p>
          <span className="text-left pb-5">The objective of the game is to type the lyrics in rythm to the song. The line that you can type will </span>
          <span className="text-display underline">automatically change</span>
          <span> in accordance to the timing of the song (unless you are in "chill" mode, which you can configure in settings).</span>
          <p className="text-left py-5">If the line changes while you are typing, never fear, you have the option to type either:</p>
          <img src={lineChange1} className="w-3/4 mx-auto" alt="prev word" />
          <p className="text-center pb-10">1) the word you were going to type before</p>

          <img src={lineChange2} className="w-3/4 mx-auto" alt="current word" />
          <p className="text-center pb-5">... or 2) the new word</p>
          <p className="pb-4">Notice above that the accuracy stays at 100% in both cases. In case you still type wrong, something called the Levenshtein distance is computed for both possibilities in order to determine what you were trying to type.</p>

          <span className="text-center">More details can be found on our github</span>
          <a className="underline pl-2 inline" href="https://github.com/j0hnk1m/typenvibe">README</a>
          <span>.</span>
          <p className="pt-4 text-center">Now type n vibe away!</p>
        </div>
      </div>
    </Layout>
  </>
);

export default About;
