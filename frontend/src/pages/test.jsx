import React from 'react';
import Layout from 'components/layout/Layout';
import AudioSpectrum from 'react-audio-spectrum'


const test = () => (
    <>
    <Layout>
        <audio id='react-player' src=""></audio>
        <AudioSpectrum
            id="audio-canvas"
            height={200}
            width={300}
            audioId={'random-characters'}
            capColor={'red'}
            capHeight={2}
            meterWidth={2}
            meterCount={512}
            meterColor={[
                { stop: 0, color: '#f00' },
                { stop: 0.5, color: '#0CD7FD' },
                { stop: 1, color: 'red' }
            ]}
            gap={4}
            />
    </Layout>
    
    </>
);

export default test;
