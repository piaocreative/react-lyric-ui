import { TrackInformation } from './../../model/TrackInformation';

export const FAKE_DATA: TrackInformation = {
  id: 'test',
  title: "Example",
  description: "Test",
  url: "https://lyric-api.s3.us-east-2.amazonaws.com/example.mp3",
  genres: ["electronicDance"],
  projectedEarnings: {
    amount: "500.00",
    currency: "usd",
    currencySymbol: "$",
  },
  projectedListeners: {
    amount: 449.708,
    historicalChange: 4106,
  },
  score: {
    impactful_attributes: [],
    overall: 81,
    starFactor: 70,
  },
  songCharacteristics: {
    TrackID: "12345",
    key: "bbMinor",
    bpm: 140,
    timeSignature: "4/4",
    elements: ["dark", "ethereal", "sad"],
    tags: ["one", "two", "three"],
    similarSongs: [
      {
        title: "Dudelywah",
        artist: "Keller Williams",
        albumArt: "https://i.scdn.co/image/ab67616d0000b27358eafdc6ec4b4091a74229e3",
        url: "https://open.spotify.com/track/6bVWyBwZf7ej9CkoMRD3Pf",
        uri: "spotify:track:6bVWyBwZf7ej9CkoMRD3Pf",
        previewUrl:
          "https://p.scdn.co/mp3-preview/c47f4c9fc80f778fd03ac977ca01f09e1f82b962?cid=2829383f5f10422a93802a8a41d0e1f9",
      },
      {
        title: "How You Showed Me Everything - Original Mix",
        artist: "Max Essa",
        albumArt: "https://i.scdn.co/image/ab67616d0000b273b211013a35c21226d952b5c7",
        url: "https://open.spotify.com/track/79W0CbnFrUyMA49xLK5Q25",
        uri: "spotify:track:79W0CbnFrUyMA49xLK5Q25",
        previewUrl:
          "https://p.scdn.co/mp3-preview/684fb23116d380e5d4d3757ae4319aa8e7e7ec80?cid=2829383f5f10422a93802a8a41d0e1f9",
      },
      {
        title: "Alone Time",
        artist: "Plastician",
        albumArt: "https://i.scdn.co/image/ab67616d0000b27332a3797839a010ab54a2f84c",
        url: "https://open.spotify.com/track/7zIUIqm88ER8Csnb9T4JId",
        uri: "spotify:track:7zIUIqm88ER8Csnb9T4JId",
        previewUrl:
          "https://p.scdn.co/mp3-preview/b52ac69b4303fae66cc0c1ace6f64003f53b1731?cid=2829383f5f10422a93802a8a41d0e1f9",
      },
    ],
  },
  durationSeconds: 27.252,
};